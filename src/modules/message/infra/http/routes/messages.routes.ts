import { Router } from 'express';
import { MessagesController } from '../controllers/MessagesController';

import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const messagesController = new MessagesController();
router.get('/', messagesController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  messagesController.show
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().required(),
      conversation_id: Joi.string().uuid().required(),
      read_status: Joi.boolean().required(),
      sender: Joi.string().required(),
      ticket_id: Joi.string().uuid().required(),
    },
  }),
  messagesController.store
);

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      content: Joi.string(),
      conversation_id: Joi.string().uuid(),
      read_status: Joi.boolean(),
      sender: Joi.string(),
      ticket_id: Joi.string().uuid(),
    },
  }),
  messagesController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  messagesController.delete
);

export { router as messagesRoutes };
