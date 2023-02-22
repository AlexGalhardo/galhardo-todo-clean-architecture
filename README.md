# API todo-api-clean-architecture

Essa codebase possui uma API REST usando princípios de arquitetura limpa para ser usado como um boilerplate na construção de uma nova API REST

- <b>Endpoint Produção: #</b>
- <b>Endpoint Staging: # </b>
- <b>URL para checar logs de deploys: #</b>
- O repositório é de responsabilidade da squad #
- Essa API se comunica com os serviços:
   - x
   - y
   - z

## Documentações Gerais
- Colocar links e referências de documentações gerais aqui

## Tecnologias utilizadas
- Essa API utiliza as seguintes tecnologias:
   - [NodeJS](https://nodejs.org/en/) - Verifique se a versão do seu NodeJS é pelo menos 16 ou maior
   - [Vitest](https://vitest.dev/) - Ferramenta para fazer testes
   - [Prisma](https://www.prisma.io/) - ORM para abstrair consultas no banco de dados
   - [PostgreSQL](https://www.postgresql.org/) - Banco de Dados Relacional

## Documentação dessa API
- Existe um arquivo na raíz desse código chamado: `INSOMNIA-todo-api-clean-architecture-http-requests.json`
- Importe esse arquivo no client do Insomnia para ver como a API funciona
- Baixar Insomnia Client: https://insomnia.rest/

## Instalação e Setup Local

1. Clone o repositório
   ```
   git clone https://github.com/AlexGalhardo/todo-api-clean-architecture
   ```
2. Instale as dependências utilizando:
   ```
   npm install
   ```
3. Defina as variáveis de ambiente em um novo arquivo chamado `.env`, conforme o arquivo `.env.example`
   - Peça para seu tech-lead ou colegas de trabalho te mandaram uma cópia do .env deles, para execução local, caso necessário
4. Suba os serviços docker necessários:
   ```
   sudo docker-compose up -d
   ```
5. Pegue o IP address do serviço postgres do docker:
   ```
   docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' todo_postgres
   ```
6. Atualize o servidor da variável de ambiente DATABASE_URL no arquivo `.env`, como no exemplo abaixo:
   - DATABASE_URL="postgresql://postgres:postgres@172.29.0.2:5432/todo_api?schema=public"
7. Gere o client do prisma:
   ```
   npx prisma generate
   ```
8. Rode as migrations do Prisma:
   ```
   npx prisma migrate dev
   ```
9. Suba o servidor localmente:
   ```
   npm run dev
   ```
10. Cheque o Prettier e o ESLint antes de enviar uma PR:
   ```
   npm run precommit
   ```
11. Cheque também se todos os testes continuam passando, antes de enviar uma PR:
   ```
   npm run test
   ```
12. Lembre-se de verificar outros comandos úteis no arquivo `package.json`

## Padrões e Políticas dessa CodeBase
- <b>Breaking Changes</b>
   - Esse código é utilizada por outras aplicações, portanto, esse código não deve quebrar de forma alguma.
   - Para isso, é importante que ao implementar uma nova feature, façacamos de forma que o código continue funcionando para os clientes que já estão utilizando
- <b>Nomes</b>
   - Ao longo da aplicação é esperado que sigamos a convenção camelCase para nomes de variáveis, métodos, arquivos e diretórios
   - Para classes é esperado que sigamos a convenção PascalCase. (nomes de arquivos arquivos que exportam essas classes como default também manter em padrão PascalCase)
- <b>package.json</b>
   - Não remover as informações do package.json: "name", "description", "main", "author", "license", "homepage", "private"
      - Qualquer mudança brusca nessas informações deve ser avisada/debatida com o tech-lead e/ou time antes.
   - Atualizações de pacotes do package.json deve seguir a política:
      - As novas versões dos pacotes NÃO DEVE de forma alguma quebrar o código em produção.
      - É preferível que os pacotes sejam atualizadas somente quando ocorrem bugs no código existente já funcionando ou quando recebem atualizações de segurança importantes
      - Caso queira atualizar para uma versão MAJOR (versão 3.x.x por exemplo), verifique e debata com o tech-lead e/ou time antes se as mudanças serão significativas para esse projeto
      - Sempre verifique e teste o código antes com as novas versões dos pacote, para ver se tudo continua funcionando adequadamente.
- <b>Tipagem</b>
   - Se possível, jamais use `any` como tipagem no typescript, e caso for refatorar uma task que tenha `any`, substitui-lo
   - É bastante aconselhavél que todo novo código seja fortemente tipado, para evitar bugs não previstos
- <b>Acessos Diversos</b>
   - Todas as vezes que você for documentar algum processo ou execução de alguma parte desse código, verifique se o desenvolvedor vai precisar de algum acesso específico. Exemplos:
      - Para executar algum script, o desenvolvedor precisará estar conectado ao MongoDB com VPN ligada -> lembre-se de deixar isso explicíto na nova documentação
- <b>Pull Requests</b>
   - Nomes das PRs precisam ser específicas e auto explicativas para serem facilmente identificadas no GitHub. Também é aconselhável usar o id da task do card no JIRA na PR.
      - Exemplo: FEAT CER-885: Verifica se aluno é maior de idade (possui 18 anos ou mais)
   - É recomendado fazer PRs pequenas e singulares para resolver um problema/task em específico.
      - Exemplo: não é recomendado atualizar dependências ou códigos de outro contexto em uma PR de uma task, para não causar problemas de debug caso seja necessário reverter alguma PR.
- <b>Qualidade de Código</b>
   - É utilizado as extensões do Prettier e ESLint para checar o linter desse código.
   - Importante verificar se os plugins do Prettier e ESLint se encontram habilitados no VSCode, ao menos para esse projeto
   - Também importante configurar o VSCode para que as settings locais, contidas no `.vscode/settings.json` sejam prioritárias em relação a outras configurações
- <b>Deploys</b>
   - Não é recomendável fazer deploys na sexta-feira, exceto em alguns casos específicos como hotfix, ou bugs urgentes que precisam ser arrumados.
- <b>Documentação</b>
   - Caso você perceba que alguma parte dessa ou outra documentação esteja errada, desatualizada ou faltando alguma informação importante, por favor, envie uma PR para atualizá-la.
