import { users } from '../data/data.js';

export class UserRepository {
  findAll() {
    return users;
  }

  create(user) {
    users.push(user);
    return user;
  }

  findByEmail(email) {
    return users.find(user => user.email === email);
  }
}
