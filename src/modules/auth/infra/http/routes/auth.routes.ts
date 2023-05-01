import { Router } from 'express';
import AuthController from '../controllers/authController';
import { Joi, Segments, celebrate } from 'celebrate';

const router = Router();

const authController = new AuthController();

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type_of_user: Joi.string().required(),
    },
  }),
  authController.login
);
router.post('/logoff', authController.logoff);

export { router as authRoutes };
