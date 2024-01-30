#!/bin/bash
docker-compose down
docker-compose rm -rf postgres_todo_api
docker volume rm postgres_todo_api
docker-compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run prisma:push
npm run prisma:seed
