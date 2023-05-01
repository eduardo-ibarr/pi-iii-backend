import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { RequestersController } from '../controllers/RequestersController';

const router = Router();

const requestersController = new RequestersController();

router.get('/', requestersController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  requestersController.show
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  requestersController.store
);

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    },
  }),
  requestersController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  requestersController.delete
);

export { router as requestersRoutes };
