<div align="center">
   <h1 align="center"><a href="https://todo-api-clean-architecture.alexgalhardo.com/" target="_blank">todo-api-clean-architecture.alexgalhardo.com</a></h1>
</div>

## Introduction

* A simple REST API made with Bun, PrismaORM, PostgreSQL and Fastify, using Clean Architecture principles I build while reading the book [Arquitetura Limpa Na Prática - Otávio Lemos](https://www.otaviolemos.com.br/)


## Development Setup Local

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
- If you wanna JSON database, set in your `.env` file:
```
USE_JSON_DATABASE=true
```
- If false, default database is PostgreSQL

## Integration Tests
1. Run tests
```
bun test
```

1. Watch tests
```
bun --watch test
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
