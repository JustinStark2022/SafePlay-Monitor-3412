# roblox_polling.py
import time
import threading
import requests
from roblox_utils import get_latest_game_activity, load_previous_activity, save_current_activity

POLL_INTERVAL = 30  # seconds

class RobloxPoller:
    def __init__(self, user_id, on_new_game_callback):
        self.user_id = user_id
        self.on_new_game_callback = on_new_game_callback
        self.running = False

    def start(self):
        self.running = True
        thread = threading.Thread(target=self.poll)
        thread.daemon = True
        thread.start()

    def stop(self):
        self.running = False

    def poll(self):
        print("[Poller] Starting polling loop...")
        previous_game = load_previous_activity()
        while self.running:
            current_game = get_latest_game_activity(self.user_id)
            if current_game and current_game != previous_game:
                print(f"[Poller] New game detected: {current_game}")
                self.on_new_game_callback(current_game)
                save_current_activity(current_game)
                previous_game = current_game
            time.sleep(POLL_INTERVAL)