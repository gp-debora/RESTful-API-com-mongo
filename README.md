# API de Gestão de Estudantes

## Descrição
Esta é uma API RESTful desenvolvida em Node.js com Express e lowDB para gerir informações de estudantes. Suporta operações CRUD (Create, Read, Update, Delete) e inclui uma interface de usuário para interação.

## Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **lowDB** (base de dados leve em JSON)
- **HTML, CSS e JavaScript** para a interface de usuário

## Funcionalidades
- **GET /students**: Retorna a lista de todos os estudantes.
- **GET /students/:id**: Retorna um estudante específico pelo `id`.
- **POST /students**: Cria um novo estudante.
- **PUT /students/:id**: Atualiza os dados de um estudante específico pelo `id`.
- **DELETE /students/:id**: Remove um estudante específico pelo `id`.

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado na máquina
- Postman ou navegador para testes

### Passos para Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio

2. Instale as dependências:
    npm install

3. Inicie o servidor
    npm start

4. Acesse a aplicação no navegador em:
    http://localhost:3000
    
### Testes da API

### Teste Manual com Postman
1. GET /students: 
    Envie uma requisição GET para http://localhost:3000/students e verifique a lista de estudantes.

2.POST /students:
     * Escolha o método POST e use o seguinte corpo JSON:
        {
            "name": "Novo Estudante",
            "age": 21,
            "study": "Curso de Exemplo"
        }
    * Envie a requisição para http://localhost:3000/students.

3. PUT /students/:
    Envie uma requisição PUT para http://localhost:3000/students/1 com um corpo JSON para atualizar o estudante com id 1:
        {
            "name": "Estudante Atualizado"
        }

4. DELETE /students/:
    Envie uma requisição DELETE para http://localhost:3000/students/1 para remover o estudante com id 1.

### Autoria
Desenvolvido por Débora Gonçalves durante a unidade curricular de SIR. Este projeto foi criado para fins educativos e demonstra as práticas de desenvolvimento de APIs RESTful com Node.js e lowDB.

