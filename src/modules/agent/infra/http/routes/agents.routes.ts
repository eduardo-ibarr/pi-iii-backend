import { Router } from 'express';
import { AgentsController } from '../controllers/AgentsController';

import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const agentsController = new AgentsController();

router.get('/', agentsController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentsController.show
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      available: Joi.boolean().required(),
    },
  }),
  agentsController.store
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
      available: Joi.boolean(),
    },
  }),
  agentsController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentsController.delete
);

export { router as agentRoutes };
