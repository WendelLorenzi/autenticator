import { registerUseCase } from "@useCases/Register";

describe('userService', () => {
  it('Deve criar um usuário com sucesso', async () => {
    const userData = {
      name: 'Novo Usuário',
      email: 'novousuario@example.com',
      password: 'senha123',
    };

    const createdUser = await registerUseCase.execute(userData);

    expect(createdUser).toHaveProperty('token');
    // expect(createdUser.nome).toBe(userData.name);
    // expect(createdUser.email).toBe(userData.email);
  });

  it('Deve retornar erro ao tentar criar um usuário com dados inválidos', async () => {
    const invalidUserData = {
      name: '', // Nome inválido
      email: 'email-invalido', // Email inválido
      password: 'abc', // Senha inválida
    };

    await expect(registerUseCase.execute(invalidUserData)).rejects.toThrow();
  });
});