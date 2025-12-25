#!/bin/bash

echo "🏴☠️ Starting Treasure Land Adventure..."

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Please run this script from the Treasure-Land root directory"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    fi
    return 0
}

# Check ports
check_port 8000 || echo "Backend might already be running on port 8000"
check_port 5173 || echo "Frontend might already be running on port 5173"

echo "🚀 Starting backend server..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📦 Installing backend dependencies..."
pip install -r requirements.txt

# Start backend in background
echo "🔧 Starting FastAPI backend..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ! curl -f http://localhost:8000/ >/dev/null 2>&1; then
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "✅ Backend running at http://localhost:8000"

# Start frontend
cd ../frontend

echo "📦 Installing frontend dependencies..."
npm install

echo "🎨 Starting React frontend..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 5

echo ""
echo "🎉 Treasure Land Adventure is ready!"
echo ""
echo "🎮 Play the game: http://localhost:5173"
echo "🔧 API docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "👋 Goodbye, treasure hunter!"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup INT TERM

# Wait for user to stop
wait