import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from './db.js';
import { fileURLToPath } from 'url';

// Conectar ao MongoDB
connectDB();

// Configurar Express
const app = express();

// Middleware para JSON
app.use(express.json());

// __dirname para lidar com ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Pasta Estática
app.use(express.static(path.join(__dirname, 'public')));

// Modelo de Estudantes
const studentSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, // ID sequencial
  name: { type: String, required: true },
  age: { type: Number, required: true },
  study: { type: String, required: true },
});

// Middleware para sincronizar "id" com "_id"
studentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Adiciona a propriedade `id` no JSON de saída
    delete ret._id; // Remove `_id`
    delete ret.__v; // Remove a versão do documento do MongoDB
  },
});

const Student = mongoose.model('Student', studentSchema);

// Modelo para rastrear IDs
const counterSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Nome do contador
  sequence_value: { type: Number, required: true }, // Último valor do ID
});

const Counter = mongoose.model('Counter', counterSchema);

// Função para obter o próximo ID sequencial
const getNextSequence = async (counterId) => {
  const result = await Counter.findOneAndUpdate(
    { id: counterId },
    { $inc: { sequence_value: 1 } }, // Incrementa o valor
    { new: true, upsert: true } // Cria o documento se não existir
  );
  return result.sequence_value;
};

await Student.deleteMany({ _id: { $exists: false } });
console.log('Registros antigos sem IDs foram excluídos.');

// Rotas CRUD

// Obter todos os estudantes
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send('Erro ao buscar estudantes');
  }
});

// Obter um estudante específico pelo ID
app.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      res.status(404).send('Estudante não encontrado');
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(500).send('Erro ao buscar estudante');
  }
});

// Criar novo estudante
app.post('/students', async (req, res) => {
  try {
    const { name, age, study } = req.body;

    // Gera o próximo ID sequencial
    const nextId = await getNextSequence('students');

    const newStudent = new Student({ _id: nextId, name, age, study });
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar estudante');
  }
});

// Atualizar estudante existente
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Atualiza os dados do estudante
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedStudent) {
      res.status(404).send('Estudante não encontrado');
    } else {
      res.json(updatedStudent);
    }
  } catch (error) {
    console.error('Erro ao atualizar estudante:', error);
    res.status(500).send('Erro ao atualizar estudante');
  }
});


// Excluir estudante
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Exclui o estudante com base no _id
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      res.status(404).send('Estudante não encontrado');
    } else {
      res.status(204).send(); // Sem conteúdo
    }
  } catch (error) {
    console.error('Erro ao excluir:', error);
    res.status(500).send('Erro ao excluir estudante');
  }
});




// Página Estática (table.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'table.html'));
});

// Configurar Porta e Iniciar o Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
