#!/bin/bash

echo "🏴☠️ Testing Treasure Land Adventure Backend..."

# Test if backend is running
echo "Testing backend health..."
curl -f http://localhost:8000/ || {
    echo "❌ Backend not running. Start with: cd backend && uvicorn main:app --reload"
    exit 1
}

echo "✅ Backend is running!"

# Test game start
echo "Testing game start..."
SESSION_RESPONSE=$(curl -s -X POST http://localhost:8000/api/game/start)
SESSION_ID=$(echo $SESSION_RESPONSE | grep -o '"session_id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$SESSION_ID" ]; then
    echo "❌ Failed to start game"
    exit 1
fi

echo "✅ Game started with session: $SESSION_ID"

# Test making a choice
echo "Testing game choice (left)..."
CHOICE_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"choice":"l"}' \
    http://localhost:8000/api/game/$SESSION_ID/choice)

echo "Choice response: $CHOICE_RESPONSE"

# Test another choice (wait)
echo "Testing game choice (wait)..."
CHOICE_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"choice":"w"}' \
    http://localhost:8000/api/game/$SESSION_ID/choice)

echo "Choice response: $CHOICE_RESPONSE"

# Test winning choice (yellow)
echo "Testing winning choice (yellow)..."
WIN_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"choice":"y"}' \
    http://localhost:8000/api/game/$SESSION_ID/choice)

echo "Win response: $WIN_RESPONSE"

# Test leaderboard
echo "Testing leaderboard..."
LEADERBOARD=$(curl -s http://localhost:8000/api/game/leaderboard)
echo "Leaderboard: $LEADERBOARD"

echo "🎉 All tests passed! The treasure awaits!"