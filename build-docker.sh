#!/bin/bash

echo "🐳 Building Docker image for Todo App..."

docker build -t todo-app:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    docker images | grep todo-app
else
    echo "❌ Docker build failed!"
    exit 1
fi
