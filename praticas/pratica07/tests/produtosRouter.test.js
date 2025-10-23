const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const url = "/produtos";
let id = null;

describe('Testes do recurso /produtos', () => {
    test('POST / deve retornar 201', async () => {
        const response = await request.post(url).send({ nome: "Laranja", preco: 10.0 });
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe("Laranja");
        expect(response.body.preco).toBe(10);
        id = response.body._id;
    });

    test('POST / deve retornar 422', async () => {
        const response = await request.post(url);
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
    });

    test('GET / deve retornar 200', async () => {
        const response = await request.get(url);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /${id} deve retornar 200', async () => {
        const response = await request.get(`${url}/${id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe("Laranja");
        expect(response.body.preco).toBe(10);
    });

    test('GET /0 deve retornar 400', async () => {
        const response = await request.get(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Parâmetro inválido");
    });

    test('GET /000000000000000000000000 deve retornar 404', async () => {
        const response = await request.get(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Produto não encontrado");
    });

    test('PUT /${id} deve retornar 200', async () => {
        const response = await request.put(`${url}/${id}`).send({ nome: "Laranja Pera", preco: 18.00 });
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe("Laranja Pera");
        expect(response.body.preco).toBe(18.00);
    });

    test('PUT /${id} deve retornar 422', async () => {
        const response = await request.put(`${url}/${id}`);
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
    });

    test('PUT /0 deve retornar 400', async () => {
        const response = await request.put(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Parâmetro inválido");
    });

    test('PUT /000000000000000000000000 deve retornar 404', async () => {
        const response = await request.put(`${url}/000000000000000000000000`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Produto não encontrado");
    });

    test('DELETE /${id} deve retornar 204', async () => {
        const response = await request.delete(`${url}/${id}`);
        expect(response.status).toBe(204);
    });

    test('DELETE /0 deve retornar 400', async () => {
        const response = await request.delete(`${url}/0`);
        expect(response.status).toBe(400);
        expect(response.body.msg).toBe("Parâmetro inválido");
    });

    test('DELETE /${id} deve retornar 404', async () => {
        const response = await request.delete(`${url}/${id}`);
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("Produto não encontrado");
    });
});
