#!/bin/bash

# Variables
AWS_REGION="us-east-1"
INSTANCE_IP="your-ec2-instance-ip"
INSTANCE_USER="ec2-user"
KEY_PAIR="your-key-pair.pem"
APP_DIR="/home/ec2-user/to-app-test"

echo "🚀 Deploying Todo App to AWS EC2..."

# SSH into EC2 instance and deploy
ssh -i $KEY_PAIR $INSTANCE_USER@$INSTANCE_IP << 'EOF'
    cd $APP_DIR
    
    # Pull latest code
    git pull origin main
    
    # Stop running container
    docker-compose down
    
    # Pull latest image
    docker pull todo-app:latest
    
    # Start application
    docker-compose up -d
    
    # Check health
    sleep 10
    curl http://localhost:3000/health
    
    echo "✅ Deployment completed!"
EOF
