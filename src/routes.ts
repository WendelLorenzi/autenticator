import { Router } from 'express';

const router = Router()

router.post('/users', (request, response) => {
  return createUserController.handle(request, response);
});

export { router }