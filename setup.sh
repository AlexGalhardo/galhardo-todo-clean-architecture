#!/bin/bash
bun install
docker stop $(docker ps -q) && docker rm $(docker ps -aq)
docker-compose down
docker-compose up -d
bun prisma migrate dev
bun prisma db seed
bun run dev
