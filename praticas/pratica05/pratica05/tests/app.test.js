const request = require('supertest');
const app = require('../app');

const req = request(app);

let tarefaId;

describe('GET /tarefas', () => {
  it('deve retornar status 200 e conteúdo do tipo JSON', async () => {
    const response = await req.get('/tarefas');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('POST /tarefas', () => {
  it('deve criar uma tarefa e retornar status 201 e JSON', async () => {
    const novaTarefa = { nome: 'Estudar Node', concluida: false };
    const response = await req.post('/tarefas').send(novaTarefa);
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    tarefaId = response.body.id;
  });
});

describe('GET /tarefas/:id', () => {
  it('deve retornar a tarefa específica com status 200 e JSON', async () => {
    const response = await req.get(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('GET /tarefas/:id - Not Found', () => {
  it('deve retornar status 404 e JSON para tarefa inexistente', async () => {
    const response = await req.get('/tarefas/1');
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('PUT /tarefas/:id', () => {
  it('deve atualizar uma tarefa e retornar status 200 e JSON', async () => {
    const tarefaAtualizada = { nome: 'Estudar Node e Express', concluida: true };
    const response = await req.put(`/tarefas/${tarefaId}`).send(tarefaAtualizada);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('PUT /tarefas/:id - não encontrado', () => {
  it('deve retornar status 404 e JSON para tarefa inexistente', async () => {
    const response = await req.put('/tarefas/1');
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('DELETE /tarefas/:id', () => {
  it('deve deletar uma tarefa e retornar status 204 sem conteúdo', async () => {
    const response = await req.delete(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(204);
  });
});

describe('DELETE /tarefas/:id - não encontrado', () => {
  it('deve retornar status 404 e JSON para tarefa inexistente', async () => {
    const response = await req.delete('/tarefas/1');
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
