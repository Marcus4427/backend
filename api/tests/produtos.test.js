require('dotenv').config();
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');
const Usuario = require('../models/usuariosModel');

const request = supertest(app);

beforeAll(async () => {
  while (mongoose.connection.readyState !== 1) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
});

beforeAll(async () => {
  await Produto.deleteMany({});
  await Usuario.deleteMany({});
});

describe('Produtos', () => {
  let token;

  beforeAll(async () => {
    await request.post('/usuarios').send({ email: "produtos-test@example.com", senha: "123456" });
    const loginRes = await request.post('/usuarios/login').send({ usuario: "produtos-test@example.com", senha: "123456" });
    token = loginRes.body.token;
  });

  it('GET /produtos - listar produtos', async () => {
    const res = await request.get('/produtos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /produtos - criar produto', async () => {
    const res = await request.post('/produtos').set('authorization', token).send({ nome: "Produto Teste", preco: 10.99 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe("Produto Teste");
    expect(res.body.preco).toBe(10.99);
  });

  it('POST /produtos - validação: nome obrigatório', async () => {
    const res = await request.post('/produtos').set('authorization', token).send({ preco: 10.99 });
    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("Nome e Preço são obrigatórios");
  });

  it('POST /produtos - validação: preco obrigatório', async () => {
    const res = await request.post('/produtos').set('authorization', token).send({ nome: "Produto Teste" });
    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("Nome e Preço são obrigatórios");
  });

  it('POST /produtos - sem token', async () => {
    const res = await request.post('/produtos').send({ nome: "Produto Teste", preco: 10.99 });
    expect(res.status).toBe(401);
  });

  it('GET /produtos/:id - buscar produto por ID', async () => {
    const createRes = await request.post('/produtos').set('authorization', token).send({ nome: "Produto Busca", preco: 20.00 });
    const produtoId = createRes.body._id;
    const res = await request.get(`/produtos/${produtoId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(produtoId);
    expect(res.body.nome).toBe("Produto Busca");
  });

  it('GET /produtos/:id - ID inválido', async () => {
    const res = await request.get('/produtos/invalid-id');
    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("ID inválido");
  });

  it('GET /produtos/:id - produto não encontrado', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request.get(`/produtos/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Produto não encontrado");
  });

  it('PUT /produtos/:id - atualizar produto', async () => {
    const createRes = await request.post('/produtos').set('authorization', token).send({ nome: "Produto Atualizar", preco: 15.00 });
    const produtoId = createRes.body._id;
    const res = await request.put(`/produtos/${produtoId}`).set('authorization', token).send({ nome: "Produto Atualizado", preco: 25.00 });
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(produtoId);
    expect(res.body.nome).toBe("Produto Atualizado");
    expect(res.body.preco).toBe(25.00);
  });

  it('PUT /produtos/:id - sem token', async () => {
    const createRes = await request.post('/produtos').set('authorization', token).send({ nome: "Produto Sem Token", preco: 30.00 });
    const produtoId = createRes.body._id;
    const res = await request.put(`/produtos/${produtoId}`).send({ nome: "Tentativa", preco: 40.00 });
    expect(res.status).toBe(401);
  });

  it('PUT /produtos/:id - produto não encontrado', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request.put(`/produtos/${fakeId}`).set('authorization', token).send({ nome: "Não Existe", preco: 50.00 });
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Produto não encontrado");
  });

  it('DELETE /produtos/:id - deletar produto', async () => {
    const createRes = await request.post('/produtos').set('authorization', token).send({ nome: "Produto Deletar", preco: 35.00 });
    const produtoId = createRes.body._id;
    const res = await request.delete(`/produtos/${produtoId}`).set('authorization', token);
    expect(res.status).toBe(204);
  });

  it('DELETE /produtos/:id - sem token', async () => {
    const createRes = await request.post('/produtos').set('authorization', token).send({ nome: "Produto Sem Token Delete", preco: 45.00 });
    const produtoId = createRes.body._id;
    const res = await request.delete(`/produtos/${produtoId}`);
    expect(res.status).toBe(401);
  });

  it('DELETE /produtos/:id - produto não encontrado', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request.delete(`/produtos/${fakeId}`).set('authorization', token);
    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Produto não encontrado");
  });
});
