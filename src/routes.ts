import { Router } from 'express';
import { registerController } from './useCases/Register';

const router = Router()

router.post('/register', (request, response) => {
  return registerController.handle(request, response);
});

export { router }