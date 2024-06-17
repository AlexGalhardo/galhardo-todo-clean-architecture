<div align="center">
   <h1 align="center"><a href="https://todo-api-clean-architecture.alexgalhardo.com/" target="_blank">todo-api-clean-architecture.alexgalhardo.com</a></h1>
</div>

## Introduction

- A simple ToDo REST API using Clean Architecture principles I build while reading the book [Arquitetura Limpa Na Prática - Otávio Lemos](https://www.otaviolemos.com.br/)

## Tools & Features
- Bun & Typescript
- Localstack simulating AWS S3, SQS and SNS
- Telegram Logger
- Unit and Integration Tests using native Bun Test suite
- Docker Compose
- PrismaORM
- Binary created by Bun build

## To Do
- [ ] On each ToDo created, send a message and notification to LocalStack AWS SQS and SNS
- [ ] Consume messages/notifications from LocalStack AWS SQS and AWS SNS
- [x] Create Integration tests using Bun Test suite
- [ ] Create Unit tests using mocks from Bun Test suite
- [x] Use TelegramLogger to send logs to Telegram
- [ ] Save JSON Database on LocalStack AWS S3 every time it's updated
- [x] Create binary file with bun build

## Development Setup Local

Prerequisites:
   - Install Bun: <https://bun.sh/docs/installation>
   - Install Localstack: <https://docs.localstack.cloud/getting-started/installation/>

1. Clone repository
```bash
git clone git@github.com:AlexGalhardo/todo-api-clean-architecture.alexgalhardo.com.git
```

2. Enter repository
```bash
cd todo-api-clean-architecture.alexgalhardo.com/
```

3. Create your `.env` file and set up your environment variables
```bash
cp .env.example .env
```
   - How to get your Telegram credentials: [./docs/telegram-logger](./docs/telegram-logger)

4. Run setup.sh
```bash
chmod +x ./setup.sh && ./setup.sh
```

## JSON Databases
- If you wanna use JSON database, set in your `.env` file:
```bash
USE_JSON_DATABASE=true
```
- Default is `false`, will use PostgreSQL from Docker.

## Integration Tests
a. Run tests
```bash
bun test
```

b. Watch tests
```bash
bun --watch test
```

## Building single file binary
1. Creating binary `server` at root directory
```bash
bun run build
```

2. Executing binary
```bash
./server
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
