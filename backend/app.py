# app.py
import os
import time
import threading
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from roblox_utils import get_latest_game_activity, load_previous_activity, save_current_activity
from models import db, RobloxActivity

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for frontend at localhost:5173
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///roblox.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev")
db.init_app(app)

# In-memory notification storage
notifications = []
approved_games = set()
blocked_games = set()

# Routes
@app.route("/notifications", methods=["GET"])
def get_notifications():
    return jsonify({"notifications": notifications})


@app.route("/notifications", methods=["POST"])
def add_notification():
    data = request.get_json()
    if not data or "type" not in data or "content" not in data:
        return jsonify({"error": "Invalid data"}), 400
    notifications.append(data)
    return jsonify({"message": "Notification added"}), 201


@app.route("/notifications/<int:notif_id>/action", methods=["POST"])
def handle_action(notif_id):
    data = request.get_json()
    action = data.get("action")
    for notif in notifications:
        if notif.get("id") == notif_id:
            notif["status"] = action
            if notif.get("game") and action == "approved":
                approved_games.add(notif["game"]["name"])
                blocked_games.discard(notif["game"]["name"])
            elif notif.get("game") and action == "blocked":
                blocked_games.add(notif["game"]["name"])
                approved_games.discard(notif["game"]["name"])
            return jsonify({"message": f"Notification {action}"}), 200
    return jsonify({"error": "Notification not found"}), 404


@app.route("/api/games/status", methods=["GET"])
def get_game_status():
    return jsonify({
        "approved": list(approved_games),
        "blocked": list(blocked_games)
    })


# Roblox polling logic
def poll_roblox():
    user_id = os.getenv("ROBLOX_USER_ID")
    if not user_id:
        print("[ERROR] ROBLOX_USER_ID is missing in .env")
        return

    previous_game = load_previous_activity()
    print("[Poller] Starting Roblox polling...")

    while True:
        latest_game = get_latest_game_activity(user_id)
        if latest_game and latest_game != previous_game:
            new_notification = {
                "id": int(time.time()),
                "type": latest_game.get("type", "new_game"),
                "timestamp": time.strftime("%I:%M %p"),
                "content": f"Started playing '{latest_game['game']['name']}'",
                "status": "pending",
                "game": latest_game["game"]
            }

            print("[Poller] New game detected:", new_notification["game"]["name"])

            # Prevent duplicates
            if all(n["game"]["name"] != new_notification["game"]["name"] for n in notifications):
                notifications.insert(0, new_notification)

            save_current_activity(latest_game)
            previous_game = latest_game

        time.sleep(10)  # Poll interval


# Main entry point
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    threading.Thread(target=poll_roblox, daemon=True).start()
    app.run(debug=True)

