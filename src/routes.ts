import { Router } from 'express';
import { registerController } from './useCases/Register';
import { loginController } from './useCases/Login';
import { logoutController } from './useCases/Logout';

const router = Router()

router.post('/register', (request, response) => {
  return registerController.handle(request, response);
});

router.post('/login', (request, response) => {
  return loginController.handle(request, response);
});

router.post('/logout', (request, response) => {
  return logoutController.handle(request, response);
});


export { router }