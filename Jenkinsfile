pipeline {
    agent any

    stages {
        stage('Build Backend Docker Image') {
            steps {
                // Zbudowanie obrazu Dockera dla backendu
                script {
                    docker.build("bfw_be:latest", "./BE") // Ścieżka do katalogu backendowego
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                // Zbudowanie obrazu Dockera dla frontendu
                script {
                    docker.build("bfw_fe:latest", "./FE") // Ścieżka do katalogu frontendowego
                }
            }
        }
        stage('Remove containers'){
            steps{
                script{
                    sh "docker stop bfw_be:latest || true"
                    sh "docker rm bfw_be:latest || true"
                    sh "docker stop bfw_fe:latest || true"
                    sh "docker rm bfw_fe:latest || true"
                }
            }
        }
        stage('Deploy Containers') {
            steps {
                // Uruchomienie kontenerów na serwerze
                script {
                    sh 'docker run -d -p 5000:5000 bfw_be:latest'
                     sh 'docker run -d -p 3000:000 bfw_fe:latest'
                }
            }
        }
    }
}
