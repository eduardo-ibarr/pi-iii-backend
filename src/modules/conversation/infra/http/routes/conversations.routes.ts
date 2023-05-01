import { Router } from 'express';
import { ConversationsController } from '../controllers/ConversationsController';

import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const conversationsController = new ConversationsController();

router.get('/', conversationsController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  conversationsController.show
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      agent_id: Joi.string().uuid().required(),
      ticket_id: Joi.string().uuid().required(),
    },
  }),
  conversationsController.store
);

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      agent_id: Joi.string().uuid(),
      ticket_id: Joi.string().uuid(),
    },
  }),
  conversationsController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  conversationsController.delete
);

export { router as conversationsRoutes };
