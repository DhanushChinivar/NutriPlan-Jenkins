pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    environment {
        DOCKER_IMAGE = "nutriplan-app"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing project dependencies..."
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Jest tests..."
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo "Running ESLint for code quality..."
                sh 'npx eslint . || true'
            }
        }

        stage('Security Scan') {
            steps {
                echo "Running npm audit for security..."
                sh 'npm audit --audit-level=moderate || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t $DOCKER_IMAGE ."
            }
        }

        stage('Run Container') {
            steps {
                echo "Running Docker container..."
                sh "docker run -d -p 3000:3000 --name nutriplan-container $DOCKER_IMAGE || true"
            }
        }

        stage('Release Tag') {
            steps {
                echo "Tagging release version..."
                sh 'git tag v1.0.0 || true'
                sh 'git push origin --tags || true'
            }
        }

        stage('Monitoring') {
            steps {
                echo "Simulating monitoring stage using uptime..."
                sh 'uptime'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
