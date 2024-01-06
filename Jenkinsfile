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
        stage('Build Backend Chat Docker Image') {
            steps {
                // Zbudowanie obrazu Dockera dla backendu
                script {
                    docker.build("bfw_be_chat:latest", "./bwf-chat") // Ścieżka do katalogu backendowego
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
                     def stopAndRemoveContainer = { container ->
                        def containerExists = sh(
                            script: "docker ps -aqf name=${container}",
                            returnStatus: true
                        ) == 0

                        if (containerExists) {
                            sh "docker stop ${container} || true"
                            sh "docker rm ${container} || true"
                        } else {
                            echo "Container ${container} does not exist."
                        }
            }

            stopAndRemoveContainer('bfw_be')
            stopAndRemoveContainer('bfw_be_chat')
            stopAndRemoveContainer('bfw_fe')
                }
            }
        }
        stage('Remove images') {
            steps {
                script {
                    script {
                        def noneImages = sh(script: 'docker images -a | grep "<none>" | awk \'{print $3}\'', returnStdout: true).trim()
                        if (noneImages) {
                            sh "docker rmi ${noneImages}"
                        } else {
                            echo "Brak obrazów do usunięcia"
                        }
                    }
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                // Uruchomienie kontenerów na serwerze
                script {
                    sh 'docker run -d -p 8081:8081 --name bfw_be_chat bfw_be_chat:latest'
                    sh 'sleep 15s'
                    sh 'docker run -d -p 5000:5000 --name bfw_be bfw_be:latest'
                    sh 'docker run -d -p 80:80 --name bfw_fe bfw_fe:latest'
                }
            }
        }
    }
}
