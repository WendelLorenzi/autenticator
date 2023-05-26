import { Router } from 'express';
import { registerController } from './useCases/Register';
import { loginController } from './useCases/Login';
import { logoutController } from './useCases/Logout';
import { getuserController } from './useCases/getUser';
import { authController } from './useCases/middleware/Auth';

const router = Router();

router.get('/', (request, response) => {
    return response.status(200).json({ message: 'Server ON' });
});

router.post('/register', (request, response) => {
  return registerController.handle(request, response);
});

router.post('/login', (request, response) => {
  return loginController.handle(request, response);
});

router.post('/logout', (request, response) => {
  return logoutController.handle(request, response);
});

router.get('/getUser', (request, response) => {
    return getuserController.handle(request, response);
});

router.post('/autenticator', (request, response) => {
    return authController.handle(request, response);
});


export { router }