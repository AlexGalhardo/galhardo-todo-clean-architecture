<div align="center">
 <h1 align="center">ToDo API Clean Architecture</h1>
</div>

## Introduction

* A simple REST API using Clean Architecture principles I build while reading the book [Arquitetura Limpa Na Prática - Otávio Lemos](https://www.otaviolemos.com.br/)

## Technologies

* [Linux Mint XFCE 21.04](https://linuxmint.com/)
* [Git](https://git-scm.com/)
* [NodeJS v20](https://nodejs.org/en)
* [VSCode](https://code.visualstudio.com/)
* [TypeScript](https://www.typescriptlang.org/)

## Development Setup Local

* Clone repository

<!---->

```
git clone https://github.com/AlexGalhardo/todo-api-clean-architecture
```

* Enter repository

<!---->

```
cd todo-api-clean-architecture/
```

* Install dependencies

<!---->

```
npm install
```

* Setup your enviroment variables

<!---->

```
cp .env-example .env
```

* Start Docker, PrismaORM, Migrations and Seeds

<!---->

```
sh setup.sh
```

* To Start Prisma Studio:

<!---->

```
npm run prisma:studio
```

* Start local server

<!---->

```
npm run dev
```

* Go to: <http://localhost:4000/>

## Build for deploy

* To created build to deploy run:

<!---->

```
npm run build
```

* To test build production locally run:

<!---->

```
npm run start
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) August 2023-present, [Alex Galhardo](https://github.com/AlexGalhardo)
