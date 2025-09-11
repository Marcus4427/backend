import express from 'express';
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

const tarefasRouter = express.Router();

tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});

tarefasRouter.post('/', (req, res) => {
  const novaTarefa = req.body;
  novaTarefa.id = tarefas.length + 1;
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

tarefasRouter.get('/:tarefaId', (req, res) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);
  if (tarefa) {
    res.json(tarefa);
  } else {
    throw new Error('Tarefa não localizada');
  }
});

tarefasRouter.put('/:tarefaId', (req, res) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
  if (tarefaIndex !== -1) {
    tarefas[tarefaIndex] = { ...tarefas[tarefaIndex], ...req.body };
    res.json(tarefas[tarefaIndex]);
  } else {
    throw new Error('Tarefa não localizada');
  }
});

tarefasRouter.delete('/:tarefaId', (req, res) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
  if (tarefaIndex !== -1) {
    tarefas.splice(tarefaIndex, 1);
    res.status(204).send();
  } else {
    throw new Error('Tarefa não localizada');
  }
});

app.use('/tarefas', tarefasRouter);

app.use((err, req, res, next) => {
  res.status(400).json({ message: err.message });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

export default app;
