<div align="center">
   <h1 align="center"><a href="https://todo-api-clean-architecture.alexgalhardo.com/" target="_blank">todo-api-clean-architecture.alexgalhardo.com</a></h1>
</div>

## Introduction

- A simple ToDo REST API using Clean Architecture principles I build while reading the book [Arquitetura Limpa Na Prática - Otávio Lemos](https://www.otaviolemos.com.br/)
- Tools & Features:
   - Bun & Typescript
   - Localstack simulating AWS S3, SQS and SNS
   - Telegram Logger
   - Unit and Integration Tests using native Bun Test suite
   - Docker Compose
   - PrismaORM
   - Binary created by bun build


## Development Setup Local

Prerequisites:
   - Install Bun: <https://bun.sh/docs/installation>
   - Install Localstack: <https://docs.localstack.cloud/getting-started/installation/>

1. Clone repository
```
git clone https://github.com/AlexGalhardo/todo-api-clean-architecture.alexgalhardo.com
```

2. Enter repository
```
cd todo-api-clean-architecture.alexgalhardo.com/
```

3. Run setup.sh
```
chmod +x ./setup.sh && ./setup.sh
```

## JSON Databases
- If you wanna use JSON database, set in your `.env` file:
```
USE_JSON_DATABASE=true
```
- If false, default database is PostgreSQL

## Integration Tests
a. Run tests
```
bun test
```

b. Watch tests
```
bun --watch test
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
