import { app } from '@app';
import request from 'supertest';

describe('Testando rota de criação de usuário', () => {
  it('Deve criar um usuário com sucesso via rota POST', async () => {
    const user = {
        name: 'Novo Usuário',
        email: 'novousuario@example.com',
        password: 'senha123',
    };

    const response = await request(app)
      .post('/register')
      .send(user)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(user.name);
    expect(response.body.email).toBe(user.email);
  });

  it('Deve retornar erro ao criar um usuário com dados inválidos via rota POST', async () => {
    const invalidUser = {
      nome: '', // Nome inválido
      email: 'email-invalido', // Email inválido
      senha: 'abc', // Senha inválida
    };

    await request(app)
      .post('/register')
      .send(invalidUser)
      .expect(400);
  });
});