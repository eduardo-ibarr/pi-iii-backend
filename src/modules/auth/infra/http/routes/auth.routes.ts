import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import { AuthController } from '../controllers/authController';
import { AuthServicesFactory } from '../../../factories/AuthServicesFactory';

const router = Router();

const authServicesFactory = new AuthServicesFactory();
const authController = new AuthController(authServicesFactory);

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
router.post(
  '/api/logoff',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    },
  }),
  authController.logoff,
  () => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint para fazer logoff na API.'
  }
);

export { router as authRoutes };
