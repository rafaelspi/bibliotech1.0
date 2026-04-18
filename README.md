# 📚 BiblioTech

Gerenciador de biblioteca pessoal — projeto da disciplina de DevOps.

> **Front-end** funcional já está rodando (React + Vite + TypeScript + Tailwind + shadcn/ui), com persistência em **localStorage** (uso 100% gratuito).
> A pasta [`/backend`](./backend) contém o serviço Node.js + Express + Prisma + PostgreSQL para você rodar via Docker localmente.

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| Front-end | React 18, Vite, TypeScript, TailwindCSS, shadcn/ui |
| Back-end | Node.js, Express, Prisma ORM |
| Banco | PostgreSQL 16 |
| Auth | JWT + bcrypt |
| Container | Docker, Docker Compose |
| CI/CD | Jenkins |
| Qualidade | SonarQube |
| Versionamento | Git + GitFlow (GitHub) |

## 🚀 Rodando o front-end

```bash
npm install
npm run dev
```

## 🐳 Rodando tudo com Docker Compose

```bash
docker compose up --build
```

Serviços:
- **frontend** → http://localhost:8080
- **backend**  → http://localhost:3000
- **postgres** → localhost:5432
- **sonarqube** → http://localhost:9000 (admin/admin)

## 🌿 GitFlow

Branches:
- `main` — produção
- `develop` — integração
- `feature/<nome>` — novas funcionalidades
- `release/<versao>` — preparação de release
- `hotfix/<nome>` — correções urgentes

Fluxo padrão:
```bash
git checkout develop
git checkout -b feature/cadastro-livro
# ... commits ...
git checkout develop && git merge --no-ff feature/cadastro-livro
```

## 🔄 Pipeline Jenkins

O [`Jenkinsfile`](./Jenkinsfile) executa:
1. Checkout
2. Install (front + back)
3. Lint + Test
4. SonarQube Scanner
5. Build Docker images
6. Deploy (docker compose up -d)

## 🧪 Análise SonarQube

Configuração em [`sonar-project.properties`](./sonar-project.properties).
Suba o SonarQube (`docker compose up sonarqube`), gere um token em http://localhost:9000 e rode:

```bash
sonar-scanner -Dsonar.login=SEU_TOKEN
```

## 📋 CRUD principal — Livros

| Operação | Front (localStorage) | Back (REST) |
|---|---|---|
| Criar | `useBooks().create` | `POST /api/books` |
| Listar | `useBooks().books` | `GET /api/books` |
| Editar | `useBooks().update` | `PUT /api/books/:id` |
| Remover | `useBooks().remove` | `DELETE /api/books/:id` |
