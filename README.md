📚 Projeto: BiblioTech

Alunos: Rafael dos Santos Sousa | Vitor Negrão Rocha

Gerenciador de biblioteca pessoal — projeto da disciplina de DevOps.

O front-end já está funcional e roda de forma independente com persistência em localStorage (100% gratuito).
A pasta /backend
 contém o serviço completo para execução local com Docker.

🧱 Arquitetura e Stack
🔹 Front-end
React 18
Vite
TypeScript
TailwindCSS
shadcn/ui
🔹 Back-end
Node.js
Express
Prisma ORM
🔹 Banco de Dados
PostgreSQL 16
🔹 Autenticação
JWT
bcrypt
🔹 DevOps & Qualidade
Docker & Docker Compose
Jenkins (CI/CD)
SonarQube (análise de qualidade)
🔹 Versionamento
Git + GitFlow (GitHub)
🚀 Como executar
▶️ Rodando apenas o Front-end
npm install
npm run dev

A aplicação estará disponível em:
👉 http://localhost:8080

🐳 Rodando o ambiente completo (Docker)
docker compose up --build
Serviços disponíveis:
Serviço	URL / Porta
Front-end	http://localhost:8080

Back-end	http://localhost:3000

PostgreSQL	localhost:5432
SonarQube	http://localhost:9000
 (admin/admin)
🌿 Estratégia de Branch (GitFlow)
📂 Tipos de branches
main → produção
develop → integração contínua
feature/<nome> → novas funcionalidades
release/<versao> → preparação de versões
hotfix/<nome> → correções urgentes
🔁 Fluxo básico
git checkout develop
git checkout -b feature/cadastro-livro

# commits...

git checkout develop
git merge --no-ff feature/cadastro-livro
🔄 Pipeline CI/CD (Jenkins)

O arquivo Jenkinsfile
 executa automaticamente:

Checkout do código
Instalação de dependências (front + back)
Lint + testes
Análise com SonarQube
Build das imagens Docker
Deploy com Docker Compose
🧪 Análise de Qualidade (SonarQube)

Configuração em sonar-project.properties

▶️ Como executar
Suba o serviço:
docker compose up sonarqube
Acesse:
👉 http://localhost:9000
Gere um token e execute:
sonar-scanner -Dsonar.login=SEU_TOKEN
📋 Funcionalidade principal — CRUD de Livros
Operação	Front-end (localStorage)	Back-end (API REST)
Criar	useBooks().create	POST /api/books
Listar	useBooks().books	GET /api/books
Editar	useBooks().update	PUT /api/books/:id
Remover	useBooks().remove	DELETE /api/books/:id
📌 Observações
O front-end funciona independente do back-end
O back-end pode ser utilizado para persistência real com banco de dados
Todo o ambiente pode ser reproduzido com Docker Compose