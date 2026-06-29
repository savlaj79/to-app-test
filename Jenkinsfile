pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE_NAME = 'todo-app'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = credentials('aws-account-id')
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📦 Checking out source code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📚 Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test -- --coverage'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} .
                        docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                echo '📤 Pushing image to ECR...'
                script {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                        docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ${ECR_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                        docker tag ${DOCKER_IMAGE_NAME}:latest ${ECR_REGISTRY}/${DOCKER_IMAGE_NAME}:latest
                        docker push ${ECR_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}
                        docker push ${ECR_REGISTRY}/${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }
        
        stage('Deploy to AWS') {
            steps {
                echo '🚀 Deploying to AWS...'
                script {
                    sh """
                        aws ecs update-service \
                            --cluster todo-app-cluster \
                            --service todo-app-service \
                            --force-new-deployment \
                            --region ${AWS_REGION}
                    """
                }
            }
        }
    }
    
    post {
        always {
            echo '🧹 Cleaning up Docker images...'
            sh 'docker rmi ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} || true'
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
