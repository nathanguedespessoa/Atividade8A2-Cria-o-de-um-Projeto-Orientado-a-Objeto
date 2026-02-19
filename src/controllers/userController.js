import { BaseController } from './BaseController.js';

export class UserController extends BaseController {
  constructor(userService) {
    super();
    this.userService = userService;
  }

  getAllUsers(req, res) {
    try {
      const users = this.userService.getAllUsers();
      this.handleSuccess(res, users);
    } catch (error) {
      this.handleError(res, error, 'getAllUsers');
    }
  }

  createUser(req, res) {
    try {
      const newUser = this.userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: newUser
      });
    } catch (error) {
      if (error.message.includes('obrigatórios') ||
        error.message.includes('senhas não conferem') ||
        error.message.includes('já cadastrado')) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else {
        this.handleError(res, error, 'createUser');
      }
    }
  }
}
