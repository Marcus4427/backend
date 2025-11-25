require('dotenv').config();
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const usuariosModel = require('../models/usuariosModel');

const request = supertest(app);

beforeAll(async () => {
  while (mongoose.connection.readyState !== 1) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
});

beforeAll(async () => {
  await usuariosModel.deleteMany({});
});

describe('Usuarios', () => {
  let userId;
  let token;
  let userId2;
  let token2;

  it('POST /usuarios - criar usuário', async () => {
    const res = await request.post('/usuarios').send({ email: "marcus.williann@iesb.edu.br", senha: "08112000" });
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe("marcus.williann@iesb.edu.br");
    userId = res.body._id;
  });

  it('POST /usuarios - validação: email inválido', async () => {
    const res = await request.post('/usuarios').send({ email: "invalid-email", senha: "123456" });
    expect(res.status).toBe(422);
    expect(res.body.msg).toContain('"email" deve ser um email válido');
  });

  it('POST /usuarios - validação: senha curta', async () => {
    const res = await request.post('/usuarios').send({ email: "test@example.com", senha: "123" });
    expect(res.status).toBe(422);
    expect(res.body.msg).toContain('"senha" deve ter pelo menos 6 caracteres');
  });

  it('POST /usuarios - email duplicado', async () => {
    await request.post('/usuarios').send({ email: "duplicate@example.com", senha: "123456" });
    const res = await request.post('/usuarios').send({ email: "duplicate@example.com", senha: "123456" });
    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("Email já cadastrado");
  });

  it('POST /usuarios/login - login', async () => {
    const res = await request.post('/usuarios/login').send({ usuario: "marcus.williann@iesb.edu.br", senha: "08112000" });
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('POST /usuarios/login - validação: email inválido', async () => {
    const res = await request.post('/usuarios/login').send({ usuario: "invalid-email", senha: "123456" });
    expect(res.status).toBe(422);
    expect(res.body.msg).toContain('"usuario" deve ser um email válido');
  });

  it('POST /usuarios/login - credenciais inválidas', async () => {
    const res = await request.post('/usuarios/login').send({ usuario: "marcus.williann@iesb.edu.br", senha: "wrongpassword" });
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Credenciais inválidas");
  });

  it('GET /usuarios - listar usuários', async () => {
    const res = await request.get('/usuarios').set('authorization', token);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).not.toHaveProperty('senha');
  });

  it('GET /usuarios - sem token', async () => {
    const res = await request.get('/usuarios');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Token inválido");
  });

  it('GET /usuarios/:id - buscar usuário por ID', async () => {
    const res = await request.get(`/usuarios/${userId}`).set('authorization', token);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(userId);
    expect(res.body.email).toBe("marcus.williann@iesb.edu.br");
    expect(res.body).not.toHaveProperty('senha');
  });

  it('GET /usuarios/:id - ID inválido', async () => {
    const res = await request.get('/usuarios/invalid-id').set('authorization', token);
    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("ID inválido");
  });

  it('GET /usuarios/:id - usuário não encontrado', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request.get(`/usuarios/${fakeId}`).set('authorization', token);
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Usuário não encontrado");
  });

  it('PUT /usuarios/:id - atualizar usuário', async () => {
    const res = await request.put(`/usuarios/${userId}`).set('authorization', token).send({ email: "updated@example.com" });
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(userId);
    expect(res.body.email).toBe("updated@example.com");
  });

  it('PUT /usuarios/:id - acesso negado (usuário diferente)', async () => {
  
    const res2 = await request.post('/usuarios').send({ email: "user2@example.com", senha: "123456" });
    userId2 = res2.body._id;
    const loginRes = await request.post('/usuarios/login').send({ usuario: "user2@example.com", senha: "123456" });
    token2 = loginRes.body.token;

    const res = await request.put(`/usuarios/${userId}`).set('authorization', token2).send({ email: "hack@example.com" });
    expect(res.status).toBe(403);
    expect(res.body.msg).toBe("Acesso negado");
  });

  it('PUT /usuarios/:id - validação: email inválido', async () => {
    const res = await request.put(`/usuarios/${userId}`).set('authorization', token).send({ email: "invalid-email" });
    expect(res.status).toBe(422);
    expect(res.body.msg).toContain('"email" deve ser um email válido');
  });

  it('PUT /usuarios/:id - usuário não encontrado', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request.put(`/usuarios/${fakeId}`).set('authorization', token).send({ email: "test@example.com" });
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Usuário não encontrado");
  });

  it('POST /usuarios/renovar - renovar token', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', token);
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('token');
  });

  it('POST /usuarios/renovar - token inválido', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', 'Bearer 123456789');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Token inválido");
  });

  it('DELETE /usuarios/:id - deletar usuário', async () => {
    const res = await request.delete(`/usuarios/${userId}`).set('authorization', token);
    expect(res.status).toBe(204);
    expect(res.text).toBe('');
  });

  it('DELETE /usuarios/:id - acesso negado', async () => {

    const res3 = await request.post('/usuarios').send({ email: "user3@example.com", senha: "123456" });
    const userId3 = res3.body._id;
    const loginRes3 = await request.post('/usuarios/login').send({ usuario: "user3@example.com", senha: "123456" });
    const token3 = loginRes3.body.token;

    const res = await request.delete(`/usuarios/${userId3}`).set('authorization', token2);
    expect(res.status).toBe(403);
    expect(res.body.msg).toBe("Acesso negado");
  });

  it('DELETE /usuarios/:id - usuário não encontrado', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request.delete(`/usuarios/${fakeId}`).set('authorization', token);
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Usuário não encontrado");
  });
});
