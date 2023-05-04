import { Router } from 'express';
import AuthController from '../controllers/authController';
import { Joi, Segments, celebrate } from 'celebrate';

const router = Router();

const authController = new AuthController();

router.post(
  '/api/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type_of_user: Joi.string().required(),
    },
  }),
  authController.login,
  () => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint para fazer login na API.'
  }
);
router.post('/api/logoff', authController.logoff, () => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Endpoint para fazer logoff na API.'
});

export { router as authRoutes };
