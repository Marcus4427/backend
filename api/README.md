# API RESTful de Produtos e Usuários com Autenticação JWT

**Desenvolvido por: Marcus Williann Neres Dos Santos 2224290017**

Esta é uma API RESTful desenvolvida com Express.js para gerenciamento de produtos e usuários, incluindo autenticação JWT obrigatória para operações de escrita.

## Funcionalidades

- **CRUD de Produtos**: Criar, listar, buscar, atualizar e remover produtos.
- **CRUD de Usuários**: Criar, listar, buscar, atualizar, remover usuários e login.
- **Autenticação JWT**: Protege rotas de escrita (criar, atualizar, deletar produtos e usuários).
- **Validações**: Dados obrigatórios, tipos e regras de negócio.
- **Banco de Dados**: MongoDB.
- **Documentação**: Swagger/OpenAPI.
- **Testes**: Unitários com Jest e Supertest.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Banco**: MongoDB (Mongoose)
- **Autenticação**: JWT (jsonwebtoken), bcryptjs
- **Testes**: Jest, Supertest
- **Documentação**: Swagger UI Express, YAML
- **Outros**: Morgan (logs), Cookie Parser, Dotenv

## Configuração

1. **Clone o repositório**:
   ```
   git clone <url-do-repositorio>
   cd api
   ```

2. **Instale as dependências**:
   ```
   npm install
   ```

3. **Configure o ambiente**:
   - Crie um arquivo `.env` na raiz com as variáveis:
     ```
     MONGODB_USER=seu_usuario_mongodb
     MONGODB_PASSWORD=sua_senha_mongodb
     MONGODB_HOST=seu_host_mongodb
     MONGODB_DATABASE=seu_banco_mongodb
     JWT_SECRET=sua_chave_secreta_jwt
     JWT_EXPIRES=3600 # tempo de expiração do token em segundos (opcional, default 3600)
    
     ```

4. **Inicie o MongoDB** (local ou Atlas).

## Execução

- **Desenvolvimento**:
  ```
  npm run dev
  ```
  - Servidor roda em `http://localhost:3000`
  - Documentação Swagger em `http://localhost:3000/api-docs`

- **Produção**:
  ```
  npm start
  ```

## Como Rodar os Testes

```
npm test
```

Os testes cobrem:
- Rotas de produtos (CRUD, validações, autenticação)
- Rotas de usuários (CRUD, validações, autenticação)
- Controladores
- Modelos

## Exemplos de Uso

### 1. Criar Usuário (para obter token)
```
POST /usuarios
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "123456"
}
```

### 2. Login (obter token)
```
POST /usuarios/login
Content-Type: application/json

{
  "usuario": "usuario@example.com",
  "senha": "123456"
}
```
Resposta: `{ "token": "jwt_token_aqui" }`

Observação: o token deve ser enviado nas rotas protegidas no header `Authorization` usando o esquema Bearer, por exemplo:

Authorization: Bearer jwt_token_aqui

### 3. Criar Produto (requer token)
```
POST /produtos
Authorization: Bearer jwt_token_aqui
Content-Type: application/json

{
  "nome": "Produto Exemplo",
  "preco": 29.99
}
```

### 4. Listar Produtos
```
GET /produtos
```

### 5. Buscar Produto por ID
```
GET /produtos/{id}
```

### 6. Atualizar Produto (requer token)
```
PUT /produtos/{id}
Authorization: Bearer jwt_token_aqui
Content-Type: application/json

{
  "nome": "Produto Atualizado",
  "preco": 39.99
}
```

### 7. Deletar Produto (requer token)
```
DELETE /produtos/{id}
Authorization: Bearer jwt_token_aqui
```

### 8. Renovar Token
```
POST /usuarios/renovar
Authorization: Bearer jwt_token_aqui
```
Retorna um novo token JWT válido pelo tempo configurado em `JWT_EXPIRES`.

## Integrantes do Grupo

- **Marcus Williann Neres Dos Santos 2224290017** - Desenvolvimento completo da API, incluindo autenticação, validações, testes e documentação.

## Divisão de Tarefas

- **Planejamento e Design**: Definição da arquitetura REST, entidades (usuários e produtos), autenticação JWT.
- **Implementação**:
  - Modelos e controladores para usuários e produtos.
  - Rotas com proteção JWT.
  - Validações e middlewares.
  - Documentação Swagger.
- **Testes**: Desenvolvimento de testes unitários para todas as funcionalidades.
- **Documentação**: README e Swagger.

## Estrutura do Projeto

```
api/
├── bin/
│   └── www                   # script de inicialização (cria server a partir de app.js)
├── controllers/
│   ├── produtosController.js # handlers/ lógica dos endpoints de produtos
│   └── usuariosController.js  # handlers/ lógica dos endpoints de usuários e auth
├── middlewares/
│   └── authMiddleware.js     # middleware JWT + utilitários (gerar token, hash de senha)
├── models/
│   ├── produtosModel.js      # schema Mongoose para Produto
│   └── usuariosModel.js      # schema Mongoose para Usuario
├── routes/
│   ├── apidocs.js            # serve o Swagger UI (/api-docs)
│   ├── produtosRouter.js     # definição das rotas /produtos
│   └── usuariosRouter.js     # definição das rotas /usuarios
├── tests/
│   ├── produtosRouter.test.js  # testes com Jest + Supertest (produtos)
│   └── usuariosRouter.test.js  # testes com Jest + Supertest (usuários)
├── app.js                    # instancia Express, configura middlewares e monta rotas
├── package.json              # scripts e dependências
├── swagger.yaml              # documentação OpenAPI usada pelo Swagger UI
└── README.md                 # documentação da API
```

## Notas

- As rotas de leitura de produtos (GET) são públicas.
- Operações de escrita (POST, PUT, DELETE) requerem token JWT válido.
- Use o Swagger para testar interativamente os endpoints.
