# API REST - Sistema de Gestão de Eventos

API RESTful desenvolvida em Node.js com Express e PostgreSQL (Supabase) para o gerenciamento de eventos, controle de participantes, categorias e organizadores. O projeto conta com documentação interativa integrada via Swagger UI.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** — Ambiente de execução JavaScript
* **Express** — Framework para rotas e middleware da API
* **PostgreSQL / Supabase** — Banco de dados relacional na nuvem
* **`pg` (node-postgres)** — Driver de conexão com PostgreSQL (Pool)
* **Swagger UI (`swagger-ui-express`)** — Documentação interativa da API
* **dotenv** — Gerenciamento de variáveis de ambiente
* **CORS** — Habilitação de requisições cross-origin

---

## 📁 Estrutura do Projeto

```text
projeto-festas/
├── src/
│   ├── config/
│   │   └── db.js                   # Configuração e pool de conexão do PostgreSQL
│   ├── controllers/                # Regra de negócio das rotas
│   │   ├── attendanceController.js
│   │   ├── categoryController.js
│   │   ├── eventController.js
│   │   ├── maintainEventController.js
│   │   └── userController.js
│   ├── routes/                     # Mapeamento de endpoints da API
│   │   ├── attendanceRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── maintainEventRoutes.js
│   │   └── userRoutes.js
│   ├── index.js                    # Ponto de entrada da aplicação Express
│   └── swagger.json                # Especificação OpenAPI 3.0 da documentação
├── .env.example                    # Modelo de configuração de ambiente
├── schema.sql                      # Script SQL das tabelas e carga inicial
├── package.json
└── README.md

```

---

## 🗄️ Modelo de Dados (Entidades)

A aplicação conta com 5 entidades estruturadas no PostgreSQL:

1. **`User`**: Usuários cadastrados no sistema (organizadores e participantes).
2. **`EventCategory`**: Categorias de classificação dos eventos (Aniversário, Churrasco, Festas Temáticas, etc.).
3. **`Event`**: Detalhes completos do evento (título, descrição, localização, data, capacidade e URL da imagem de capa).
4. **`Attendance`**: Confirmação e controle de presença de usuários nos eventos.
5. **`MaintainEvent`**: Associação entre mantenedores/organizadores e os eventos sob sua gestão.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

* **Node.js** (v18.x ou superior)
* **npm** instalado
* Conta ativa no **Supabase** (ou instância PostgreSQL local)

### Passo a Passo

1. **Clonar o repositório:**
```bash
git clone https://github.com/SEU_USUARIO/projeto-festas.git
cd projeto-festas

```


2. **Instalar as dependências:**
```bash
npm install

```


3. **Configurar as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
```env
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host:5432/bancodedados

```


4. **Preparar o banco de dados:**
Execute o conteúdo do arquivo `schema.sql` no Editor SQL do seu projeto no Supabase para criar a estrutura de tabelas e inserir as rotinas iniciais.
5. **Iniciar a aplicação em modo de desenvolvimento:**
```bash
npm run dev

```


6. **Acessar o servidor:**
* **API base:** `http://localhost:3000`
* **Documentação Swagger:** `http://localhost:3000/docs`



---

## 📖 Documentação da API (Swagger)

A API disponibiliza uma interface interativa via Swagger UI para testes rápidos dos endpoints. Com a aplicação em execução, acesse:

👉 **`http://localhost:3000/docs`**

### Tabela de Endpoints

| Entidade | Método | Endpoint | Descrição |
| --- | --- | --- | --- |
| **User** | `GET` | `/api/users` | Listagem de todos os usuários |
|  | `POST` | `/api/users` | Cadastro de novo usuário |
| **Category** | `GET` | `/api/categories` | Listagem de categorias |
|  | `POST` | `/api/categories` | Cadastro de nova categoria |
| **Event** | `GET` | `/api/events` | Listagem de eventos com dados de categoria e organizador |
|  | `POST` | `/api/events` | Criação de novo evento |
| **Attendance** | `GET` | `/api/attendances` | Listagem das confirmações de presença |
|  | `POST` | `/api/attendances` | Registro de presença em um evento |
| **MaintainEvent** | `GET` | `/api/maintain-events` | Listagem de mantenedores vinculados aos eventos |
|  | `POST` | `/api/maintain-events` | Vinculação de usuário à manutenção de evento |