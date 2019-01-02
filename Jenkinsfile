pipeline {
    agent any
    tools {nodejs 'my_js'}
    stages {
    stage('Create DB if not exist') {
            steps {
                script{
                    try {
                            sh "createdb var_db"
                        }
                         catch (exc) {
                            echo 'is already exist'
                            currentBuild.result = "SUCCESS"
                        }
                }
            }
        }
        stage('Test') {
            steps {
                sh "cd server && ./gradlew clean testApi"
                script{
                        try {
                            sh "cd ${workspace}/client && yarn install"
                            sh "cd ${workspace}/client && yarn run build-test"
                            sh "curl 'http://localhost:var_test_port/actuator/shutdown' -i -X POST"
                        }
                         catch (exc) {
                            echo 'Something failed!'
                            currentBuild.result = "SUCCESS"
                        }
                }
                sh "cd server && ./gradlew copyFrontBuildToPublic integrationTest"
            }
        post {
            always {
                allure([
                            includeProperties: false,
                            jdk: '',
                            properties: [],
                            reportBuildPolicy: 'ALWAYS',
                            results: [[path: 'server/build/allure-results']]
                    ])
                }
            }
        }
        stage('Build Front') {
            steps {
                sh "cd ${workspace}/client && yarn build"
            }
        }
        stage('Deploy') {
            steps {
            script{
                        try {
                            sh "curl 'http://localhost:var_port/actuator/shutdown' -i -X POST"
                        }
                         catch (exc) {
                            echo 'Something failed!'
                            currentBuild.result = "SUCCESS"
                        }
                    }
                sh "cd server && chmod +x gradlew"
                sh "cd server && ./gradlew clean copyFrontBuildToPublic build -x test"
                sh "cd server/build/libs/ && JENKINS_NODE_COOKIE=dontKillMe nohup java -jar -Dspring.profiles.active=firstStart backend-0.0.1-SNAPSHOT.jar >/dev/null 2>&1 &"
            }
        }
    }
}
