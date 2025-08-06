#!/bin/bash

# NASCAR ChatBot Frontend Startup Script

echo "🏁 Starting NASCAR ChatBot Frontend..."
echo "================================"

# Check if API is running
echo "Checking API connection..."
if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo "✅ API is running on port 8000"
else
    echo "⚠️  API is not responding on port 8000"
    echo "Please start the backend API first:"
    echo "cd ../api && python app.py"
    echo ""
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the frontend
echo "Starting frontend development server..."
echo "Frontend will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop"
echo ""
npm run dev
