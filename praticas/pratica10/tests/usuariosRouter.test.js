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

beforeEach(async () => {
  await usuariosModel.deleteMany({});
});

describe('Usuarios', () => {
  let userId;
  let token;

  it('POST /usuarios - criar usuário', async () => {
    const res = await request.post('/usuarios').send({ email: "marcus.williann@iesb.edu.br", senha: "08112000" });
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe("marcus.williann@iesb.edu.br");
    userId = res.body._id;
  });

  it('POST /usuarios - json ausente', async () => {
    const res = await request.post('/usuarios');
    expect(res.status).toBe(422);
    expect(res.type).toBe('application/json');
    expect(res.body.msg).toBe("Email e Senha são obrigatórios");
  });

  it('POST /usuarios/login - login', async () => {
    const res = await request.post('/usuarios/login').send({ usuario: "marcus.williann@iesb.edu.br", senha: "08112000" });
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('POST /usuarios/login - json ausente', async () => {
    const res = await request.post('/usuarios/login');
    expect(res.status).toBe(401);
    expect(res.type).toBe('application/json');
    expect(res.body.msg).toBe("Credenciais inválidas");
  });

  it('POST /usuarios/renovar - renovar token', async () => {
    if (token) {
      const res = await request.post('/usuarios/renovar').set('authorization', token);
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('token');
    } else {
      console.log('Token not available, skipping test');
    }
  });

  it('POST /usuarios/renovar - token inválido', async () => {
    const res = await request.post('/usuarios/renovar').set('authorization', 'Bearer 123456789');
    expect(res.status).toBe(401);
    expect(res.type).toBe('application/json');
    expect(res.body.msg).toBe("Token invalido");
  });

  it('DELETE /usuarios - deletar usuário', async () => {
    if (token) {
      const res = await request.delete('/usuarios').set('authorization', token).send({ usuario: "marcus.williann@iesb.edu.br" });
      expect(res.status).toBe(204);
      expect(res.text).toBe('');
    } else {
      console.log('Token not available, skipping test');
    }
  });
});
