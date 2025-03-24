# roblox_utils.py
import os
import json
import requests

ACTIVITY_FILE = 'last_game.json'

def get_latest_game_activity(user_id):
    # Replace with the actual Roblox API URL you want to use
    url = f"https://games.roblox.com/v1/users/{user_id}/games"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Example: Use the first game in the list
        if data and data.get('data'):
            return data['data'][0]['name']
    except Exception as e:
        print(f"[Error] Failed to fetch game activity: {e}")
    return None

def load_previous_activity():
    if os.path.exists(ACTIVITY_FILE):
        with open(ACTIVITY_FILE, 'r') as f:
            return json.load(f).get('game')
    return None

def save_current_activity(game_name):
    with open(ACTIVITY_FILE, 'w') as f:
        json.dump({'game': game_name}, f)
