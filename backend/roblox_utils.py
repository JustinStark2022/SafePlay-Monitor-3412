import os
import json
import requests
from dotenv import load_dotenv

# Load .env for environment variables (e.g., ROBLOX_USER_ID)
load_dotenv()

# Get from .env or fallback
ROBLOX_USER_ID = os.getenv("ROBLOX_USER_ID", "8202819889")

# File to store last game data
LAST_GAME_FILE = os.path.join(os.path.dirname(__file__), "last_game.json")


def get_latest_game_activity(user_id=ROBLOX_USER_ID):
    """
    Uses Roblox's presence API to fetch the latest game info.
    """
    try:
        url = "https://presence.roblox.com/v1/presence/users"
        headers = {"Content-Type": "application/json"}
        payload = {"userIds": [str(user_id)]}

        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

        user_data = data.get("userPresences", [])[0]
        game_name = user_data.get("lastLocation", "Unknown Game")
        place_id = user_data.get("placeId", None)
        last_online = user_data.get("lastOnline", "Just now")

        return {
            "userId": user_id,
            "game": {
                "name": game_name,
                "placeId": place_id,
                "risk": "MODERATE",
                "summary": "Auto-detected via Roblox Presence API.",
                "concerns": [
                    "Verify this game manually for safety.",
                    "This is a live session detection and may change often."
                ]
            },
            "timestamp": last_online,
            "type": "new_game",
            "status": "pending"
        }

    except Exception as e:
        print(f"[Roblox API Error] Failed to fetch presence data: {e}")
        return None


def load_previous_activity():
    if os.path.exists(LAST_GAME_FILE):
        try:
            with open(LAST_GAME_FILE, "r") as f:
                return json.load(f)
        except Exception as e:
            print(f"[Load Error] Could not read {LAST_GAME_FILE}: {e}")
    return None


def save_current_activity(game_data):
    try:
        with open(LAST_GAME_FILE, "w") as f:
            json.dump(game_data, f, indent=2)
    except Exception as e:
        print(f"[Save Error] Could not write to {LAST_GAME_FILE}: {e}")
