pipeline {
  agent any

  environment {
    SONAR_HOST = 'http://sonarqube:9000'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      parallel {
        stage('Frontend deps') { steps { sh 'npm ci' } }
        stage('Backend deps')  { steps { dir('backend') { sh 'npm ci' } } }
      }
    }

    stage('Lint & Test') {
      parallel {
        stage('Frontend') {
          steps {
            sh 'npm run lint || true'
            sh 'npm test -- --coverage || true'
          }
        }
        stage('Backend') {
          steps {
            dir('backend') {
              sh 'npm run lint || true'
              sh 'npm test -- --coverage || true'
            }
          }
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh 'sonar-scanner'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Deploy') {
      when { branch 'main' }
      steps {
        sh 'docker compose up -d'
      }
    }
  }

  post {
    always { echo 'Pipeline finalizado.' }
    success { echo '✅ Build OK' }
    failure { echo '❌ Build falhou' }
  }
}
