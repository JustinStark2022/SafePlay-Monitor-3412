# === Flask Backend ===
from flask import Flask, request, jsonify
import requests
import time

app = Flask(__name__)

# Simulated local storage (use a database in production)
notifications = []
approved_games = set()
blocked_games = set()

# Your Roblox session cookie (NEVER expose to frontend)
ROBLOSECURITY = "_YOUR_SECURE_COOKIE_"
ROBLOX_HEADERS = {
    "Content-Type": "application/json",
    "Cookie": f".ROBLOSECURITY={ROBLOSECURITY}"
}

# Endpoint: Get all notifications
@app.route("/api/notifications", methods=["GET"])
def get_notifications():
    return jsonify(notifications)

# Endpoint: Post a new notification
@app.route("/api/notifications", methods=["POST"])
def post_notification():
    data = request.json
    notifications.append(data)
    return jsonify({"success": True, "msg": "Notification added."})

# Endpoint: Approve or block a game
@app.route("/api/game-decision", methods=["POST"])
def game_decision():
    data = request.json
    game_id = data.get("gameId")
    action = data.get("action")  # "approve" or "block"

    if action == "approve":
        approved_games.add(game_id)
        blocked_games.discard(game_id)
    elif action == "block":
        blocked_games.add(game_id)
        approved_games.discard(game_id)

    return jsonify({"success": True, "approved": list(approved_games), "blocked": list(blocked_games)})

# Endpoint: Get current approval state
@app.route("/api/game-status", methods=["GET"])
def game_status():
    return jsonify({"approved": list(approved_games), "blocked": list(blocked_games)})

# === Example background polling task (use a real scheduler in production) ===
import threading

def poll_presence():
    while True:
        try:
            user_id = 123456789  # Replace with your child's Roblox user ID
            url = "https://presence.roblox.com/v1/presence/users"
            res = requests.post(url, headers=ROBLOX_HEADERS, json={"userIds": [user_id]})
            presence = res.json()["userPresences"][0]

            if presence["userPresenceType"] == 2:
                game_id = presence.get("placeId")
                if game_id not in approved_games and game_id not in blocked_games:
                    notifications.append({
                        "id": int(time.time()),
                        "type": "new_game",
                        "timestamp": time.strftime("%H:%M:%S"),
                        "content": f"Child started playing {presence.get('lastLocation')}",
                        "status": "pending",
                        "game": {
                            "name": presence.get("lastLocation"),
                            "summary": "Game info TBD",
                            "risk": "UNKNOWN"
                        }
                    })
        except Exception as e:
            print("Polling error:", e)

        time.sleep(15)  # Poll every 15 seconds

# Start polling in background thread
threading.Thread(target=poll_presence, daemon=True).start()

# Start Flask app
if __name__ == '__main__':
    app.run(debug=True)
