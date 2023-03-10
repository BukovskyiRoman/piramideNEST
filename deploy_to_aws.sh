#!/bin/sh

echo 'Starting to Deploy...'
ssh ubuntu@54.82.1.40 " sudo docker image prune -f
        cd app/piramideNEST
        sudo docker-compose down
        git fetch origin
        git reset --hard origin/develop  &&  echo 'You are doing well'
        sudo docker-compose build && sudo docker-compose up -d
        "
echo 'Deployment completed successfully'
