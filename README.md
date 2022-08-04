# desafio-backend-coding-sans

Projeto desenvolvido com base no seguinte desafio : https://gitlab.com/codingsans/public/codingsans-backend-test

## Funcionalidades 

- Autenticação com token JWT
- Criação de usuários
- Listagem de cervejarias , consumindo a API : https://api.openbrewerydb.org , documentação : https://www.openbrewerydb.org/documentation


## Requisitos 
- nodejs instalado em sua máquina.


## Como rodar o projeto 
- Clone o projeto;
- Na raiz do projeto rode o comando 'npm i' ou 'yarn' para instalar todas as dependências necessárias;
- Na raiz do projeto altere o arquivo de nome .env.example para .env ; e devem estar devidamente preenchidas duas variaveis : 'DATABASE_URL' e 'SECRET' que seria a secret para gerar o token JWT;
- Rode o comando 'yarn prisma migrate dev' ou 'npx prisma migrate dev' para executar as migrations e criar um banco local no diretório src/database;
- Por fim rode o comando 'yarn start' ou 'npm start' para iniciar o projeto.
