# roblox_polling.py
import time
import threading
import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from roblox_utils import get_latest_game_activity, load_previous_activity, save_current_activity

# Load .env file to access ROBLOX_USER_ID
load_dotenv()
user_id = os.getenv("ROBLOX_USER_ID")

POLL_INTERVAL = 30  # seconds
latest_activity = load_previous_activity()

app = Flask(__name__)

class RobloxPoller:
    def __init__(self, user_id, on_new_game_callback=None):
        self.user_id = user_id
        self.on_new_game_callback = on_new_game_callback
        self.running = False
        self.previous_game = load_previous_activity()

    def start(self):
        if not self.running:
            self.running = True
            thread = threading.Thread(target=self.poll)
            thread.daemon = True
            thread.start()
            print("[Poller] Polling thread started.")

    def stop(self):
        self.running = False
        print("[Poller] Polling stopped.")

    def poll(self):
        global latest_activity
        print("[Poller] Starting polling loop...")
        while self.running:
            current_game = get_latest_game_activity(self.user_id)
            if current_game and current_game != self.previous_game:
                print(f"[Poller] New game detected: {current_game['game']['name']}")
                latest_activity = current_game
                if self.on_new_game_callback:
                    self.on_new_game_callback(current_game)
                save_current_activity(current_game)
                self.previous_game = current_game
            else:
                print("[Poller] No new game detected.")
            time.sleep(POLL_INTERVAL)

# Flask API Route
@app.route('/api/roblox/latest', methods=['GET'])
def get_latest():
    return jsonify(latest_activity or {"message": "No recent activity found."})

# Optional callback when new game is detected
def handle_new_game(data):
    print("[Callback] Detected new game:", data['game']['name'])

if __name__ == "__main__":
    if not user_id:
        print("[Error] ROBLOX_USER_ID not found in .env")
        exit(1)

    poller = RobloxPoller(user_id=user_id, on_new_game_callback=handle_new_game)
    poller.start()

    app.run(debug=True, port=5000)
