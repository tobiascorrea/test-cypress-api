# Projeto de Testes End-to-End com Cypress

Este projeto contém testes end-to-end usando Cypress para uma API fictícia de livros.

## Instruções para Execução

### 1. Clone o Repositório

```bash
git clone https://github.com/tobiascorrea/test-cypress-api.git
```

### 2. Entre no Diretório do Projeto

```bash
cd nome-do-repositorio
```

### 3. Instale as Dependências

```bash
npm install
```

### 4. Atualize o Token de Acesso (Importante)

🔐 O token de acesso às APIs expira em 7 dias. Certifique-se de substituir o token no arquivo `cypress/fixtures/authToken.json` por um token válido.

### 5. Execute os Testes no Modo Interativo

```bash
npm run test:e2e:interactive
```

### 6. Execute os Testes no Modo Headless

```bash
npm run test:e2e:headless
```

### 7. Execute Todos os Testes

```bash
npm run cypress:run:e2e
```

## Observações

- **Token de Acesso:** Certifique-se de manter o token de acesso atualizado para evitar falhas nos testes.

- **Token Expirado:** Se o token expirar, você precisará gerar um novo. Os tokens podem ser gerados fazendo uma solicitação POST para a rota `/api-clients`.

- **Dados Dinâmicos:** Os testes geram dados dinâmicos para simular diferentes cenários. No entanto, a resposta específica da API pode variar dependendo do estado atual do banco de dados.

- **Requisitos:** Certifique-se de ter o Node.js e o npm instalados no seu sistema antes de executar os testes. 🚀
