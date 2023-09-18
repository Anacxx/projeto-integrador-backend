
# Projeto LabEddit Integrador

![GitHub](https://github.com/Anacxx/projeto-integrador-backend.git)

## Visão Geral

O Projeto LabEddit Integrador é uma aplicação de mídia social que permite aos usuários compartilhar postagens, adicionar comentários, dar likes e dislikes em postagens e muito mais. Esta aplicação é construída em torno de uma API que oferece funcionalidades robustas para interações sociais.

## Pré-requisitos

Antes de começar, verifique se você possui os seguintes pré-requisitos:

- **Node.js:** Instalado na sua máquina.
- **Banco de Dados SQL:** Configurado e acessível (por exemplo, SQLite, MySQL ou PostgreSQL).

## Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Anacxx/projeto-integrador-backend.git

2. **Acesse o diretório do projeto:**
    cd projeto-integrador-backend

3. **Instale as dependências:**
    npm install && npm run build

4. **Configure as variáveis de ambiente:**
    Renomeie o arquivo .env.example para .env.

    Abra o arquivo .env e configure as variáveis de acordo com o seu ambiente, como informações de banco de dados e segredos.

5. **Inicie o servidor:**
    npm run start   

## Uso da API

A API do Projeto LabEddit Integrador oferece endpoints para uma variedade de operações, incluindo:

  * signup
  * login
  * create post
  * GetPostById
  * GetAllPosts
  * LikeDislikePost
  * createComment
  * getCommentsByPostId
  * LikeDislikeComment

## A API utiliza as seguintes tecnologias:

- **Node.js:** Plataforma de desenvolvimento.
- **Typescript:** Linguagem de programação.
- **Express:** Framework web para Node.js.
- **SQL and SQLite:** Banco de dados e sistema de gerenciamento de banco de dados.
- **Knex:** Query builder SQL.
- **POO (Programação Orientada a Objetos):** Paradigma de programação utilizado na estrutura do projeto.
- **UUID (Universal Unique Identifier) generation:** Geração de identificadores únicos.
- **Hashes generation:** Geração de hashes para senhas seguras.
- **Authentication and authorization:** Autenticação e autorização de usuários.
- **Routing:** Roteamento de solicitações.
- **Postman:** Ferramenta para testar e documentar APIs.

Consulte a [documentação da API](https://documenter.getpostman.com/view/27709298/2s9YC8uVzf) para obter detalhes sobre como usar cada endpoint.


