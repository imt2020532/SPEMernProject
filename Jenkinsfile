pipeline {
    environment {
        backend = 'backimage' // Specify your backend Docker image name/tag
        frontend = 'frontimage' // Specify your frontend Docker image name/tag
        mongoImage = 'mongo:latest' // Specify the Mongo Docker image
        mongoContainerName = 'mydatabase' // Specify the name for your mongo container
        MONGO_PORT = '27017'
        docker_image = ''
    }

    agent any

    stages {
        
        stage('Stage 0: Pull Mongo Docker Image') {
            steps {
                echo 'Pulling Mongo Docker image from DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        docker.image("${mongoImage}").pull()
                    }
                }
            }
        }
        
        stage('Stage 1: Git Clone') {
            steps {
                echo 'Cloning the Git repository'
                git branch: 'master', url: 'https://github.com/imt2020532/SPEMernProject.git'
            }
        }
        
        stage('Stage 2: Build backend Docker Image') {
            steps {
                echo 'Building backend Docker image'
                dir('backend') {
                    sh "docker build -t anwit/${backend} ."
                }
            }
        }

        stage('Stage 3: Build frontend Docker image') {
            steps {
                echo 'Building frontend Docker image'
                dir('frontend') {
                    sh "docker build -t anwit/${frontend} ."
                }
            }
        }

        stage('Stage 4: Push backend Docker image to DockerHub') {
            steps {
                echo 'Pushing backend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh "docker push anwit/${backend}"
                    }
                }
            }
        }
        
        stage('Stage 5: Push frontend Docker image to DockerHub') {
            steps {
                echo 'Pushing frontend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh "docker push anwit/${frontend}"
                    }
                }
            }
        }

        stage('Stage 6: Clean docker images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        
        stage('Stage 7: Ansible Deployment') {
            steps{
                ansiblePlaybook becomeUser: null,
                colorized: true,
                credentialsId: 'localhost',
                disableHostKeyChecking: true,
                installation: 'Ansible',
                inventory: 'deployment/inventory',
                playbook: 'deployment/deploy.yml',
                sudoUser: null
            }
        }

    }
}

