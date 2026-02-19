import express from 'express';
import { UserController } from '../controllers/userController.js';
import { UserService } from '../services/userService.js';
import { UserRepository } from '../repositories/userRepository.js';

const router = express.Router();

// Dependency Injection
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Bind the method to the controller instance to preserve 'this' context
router.get('/', (req, res) => userController.getAllUsers(req, res));
router.post('/', (req, res) => userController.createUser(req, res));

export default router;
