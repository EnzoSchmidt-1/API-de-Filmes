## Manual de Instalação - API
--------------------------------
Este guia fornece as instruções necessárias para configurar o ambiente de desenvolvimento e executar a API localmente.

## 📋 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

Node.js: Versão 18.x ou superior. Baixar Node.js

Java Runtime Environment (JRE): Versão 17 ou superior (recomendado para compatibilidade). Baixar Java

Gerenciador de Pacotes: NPM (vem instalado com o Node).

Cliente API: Recomendamos o Postman ou Insomnia para testar os endpoints.

## 🚀 Passo a Passo
1. Clonar o Repositório
Abra o seu terminal e execute:

git clone https://github.com/seu-usuario/nome-do-seu-projeto.git

cd nome-do-seu-projeto

-
2. Instalação das Dependências

Instale os pacotes necessários, incluindo o driver do banco de dados:

npm install

Nota: Este projeto utiliza o better-sqlite3, que é uma biblioteca de alta performance para SQLite.

-
3. Configuração do Banco de Dados

O banco de dados utilizado é o SQLite, o que significa que você não precisa instalar um servidor de banco de dados (como MySQL ou Postgres).

O arquivo do banco (ex: database.db) será criado automaticamente na primeira execução ou ao rodar as migrations.

Certifique-se de que a pasta do projeto tem permissão de escrita.

-
4. Port

Por enquanto A API so roda de forma local, ela esta configurada para a porta 3000 mas pode ser mudada se o usuario desejar

-
5. Executando a Aplicação

Para iniciar o servidor, utilize o comando:

  npm start

Para ambiente de desenvolvimento (com auto-reload):

  npm run dev
