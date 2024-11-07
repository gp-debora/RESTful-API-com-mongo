import express from 'express';
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const db = new Low(new JSONFile('students.json'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
await db.read();
db.data ||= { students: [] }; // Inicializa se estiver vazio

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'table.html'));
  });
  
  

// Rotas CRUD
app.get('/students', async (req, res) => {
  await db.read();
  res.json(db.data.students);
});

app.get('/students/:id', async (req, res) => {
  await db.read();
  const student = db.data.students.find(s => s.id === parseInt(req.params.id));
  student ? res.json(student) : res.status(404).send('Student not found');
});

app.post('/students', async (req, res) => {
  const newStudent = { id: db.data.students.length + 1, ...req.body };
  db.data.students.push(newStudent);
  await db.write();
  res.status(201).json(newStudent);
});

app.put('/students/:id', async (req, res) => {
    await db.read();
    const student = db.data.students.find(s => s.id === parseInt(req.params.id));
    if (student) {
      Object.assign(student, req.body); // Atualiza as propriedades do estudante
      await db.write();
      res.json(student);
    } else {
      res.status(404).send('Student not found');
    }
  });
  

app.delete('/students/:id', async (req, res) => {
    await db.read();
    const index = db.data.students.findIndex(student => student.id === parseInt(req.params.id));
    if (index !== -1) {
      db.data.students.splice(index, 1);
      await db.write();
      res.status(204).send(); // 204 No Content para sucesso
    } else {
      res.status(404).send('Student not found');
    }
  });
  

// Página estática
app.use(express.static('public'));

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});

