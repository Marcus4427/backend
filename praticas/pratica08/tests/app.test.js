const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Testes de autenticação e produtos', () => {
  let token;

  test('GET /produtos sem token deve retornar 401 e msg "Não autorizado"', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('msg', 'Não autorizado');
  });

  test('GET /produtos com token inválido deve retornar 401 e msg "Token inválido"', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', 'Bearer 123456789');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  test('POST /usuarios/login com credenciais válidas deve retornar 200 e token', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({ usuario: 'marcus.williann@iesb.edu.br', senha: '08112000' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  test('GET /produtos com token válido deve retornar 200 e JSON', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /usuarios/renovar com token válido deve retornar 200 e novo token', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  test('GET /produtos com novo token deve retornar 200 e JSON', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
