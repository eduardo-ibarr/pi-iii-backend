import { Router } from 'express';
import { MessagesController } from '../controllers/MessagesController';

import { celebrate, Joi, Segments } from 'celebrate';
import { MessageServicesFactory } from 'src/modules/message/factories/MessageServicesFactory';

const router = Router();

const messagesServicesFactory = new MessageServicesFactory();
const messagesController = new MessagesController(messagesServicesFactory);

router.get('/messages', messagesController.index, () => {
  // #swagger.tags = ['Messages']
  // #swagger.description = 'Endpoint para obter uma lista de mensagens.'
});

router.get(
  '/messages/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  messagesController.show,
  () => {
    // #swagger.tags = ['Messages']
    // #swagger.description = 'Endpoint para obter uma mensagem.'
  }
);

router.post(
  '/messages',
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().required(),
      conversation_id: Joi.string().uuid().required(),
      read_status: Joi.boolean().required(),
      sender: Joi.string().required(),
      ticket_id: Joi.string().uuid().required(),
    },
  }),
  messagesController.store,
  () => {
    // #swagger.tags = ['Messages']
    // #swagger.description = 'Endpoint para criar uma mensagem.'
  }
);

router.put(
  '/messages/:id',
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
  messagesController.update,
  () => {
    // #swagger.tags = ['Messages']
    // #swagger.description = 'Endpoint para atualizar uma mensagem.'
  }
);

router.delete(
  '/messages/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  messagesController.delete,
  () => {
    // #swagger.tags = ['Messages']
    // #swagger.description = 'Endpoint para remover uma mensagem.'
  }
);

export { router as messagesRoutes };
