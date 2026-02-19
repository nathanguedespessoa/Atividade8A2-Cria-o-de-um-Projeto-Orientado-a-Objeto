export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers() {
    const users = this.userRepository.findAll();
    // Map 'idade' to 'age' for API response (Issue001)
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.idade
    }));
  }

  createUser(data) {
    // Basic validation
    if (!data.name || !data.email || !data.age || !data.password || !data.confirmPassword) {
      throw new Error('Todos os campos são obrigatórios (nome, email, idade, senha, confirmação de senha)');
    }

    if (data.password !== data.confirmPassword) {
      throw new Error('As senhas não conferem');
    }

    const existingUser = this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('E-mail já cadastrado');
    }

    const now = new Date().toISOString();
    const newUser = {
      id: Date.now(), // Simple ID generation
      name: data.name,
      email: data.email,
      idade: data.age, // Map 'age' from frontend to 'idade' in data model
      password: data.password, // Plain text password (as per req)
      is_active: true,
      created_at: now,
      updated_at: now
    };

    const createdUser = this.userRepository.create(newUser);

    // Return DTO with 'age'
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      age: createdUser.idade,
      is_active: createdUser.is_active,
      created_at: createdUser.created_at
    };
  }
}
