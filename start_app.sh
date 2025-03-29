#!/bin/bash

# Navigate to backend and start Flask server
echo "Starting Flask backend..."
cd backend
source ../venv/bin/activate
flask run &

# Navigate to frontend and start Vite server
echo "Starting React frontend..."
cd ../frontend
npm run dev
