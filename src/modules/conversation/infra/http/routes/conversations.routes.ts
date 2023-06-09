import { Router } from 'express';
import { ConversationsController } from '../controllers/ConversationsController';

import { celebrate, Joi, Segments } from 'celebrate';
import { ConversationServicesFactory } from '../../../factories/ConversationServicesFactory';

const router = Router();

const conversationServicesFactory = new ConversationServicesFactory();
const conversationsController = new ConversationsController(
  conversationServicesFactory
);

router.get('/conversations', conversationsController.index, () => {
  // #swagger.tags = ['Conversations']
  // #swagger.description = 'Endpoint para obter uma lista de conversas.'
});

router.get(
  '/conversations/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  conversationsController.show,
  () => {
    // #swagger.tags = ['Conversations']
    // #swagger.description = 'Endpoint para obter um conversa.'
  }
);

router.post(
  '/conversations',
  celebrate({
    [Segments.BODY]: {
      ticket_id: Joi.string().uuid().required(),
    },
  }),
  conversationsController.store,
  () => {
    // #swagger.tags = ['Conversations']
    // #swagger.description = 'Endpoint para criar um conversa.'
  }
);

router.put(
  '/conversations/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      ticket_id: Joi.string().uuid(),
    },
  }),
  conversationsController.update,
  () => {
    // #swagger.tags = ['Conversations']
    // #swagger.description = 'Endpoint para atualizar uma conversa.'
  }
);

router.delete(
  '/conversations/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  conversationsController.delete,
  () => {
    // #swagger.tags = ['Conversations']
    // #swagger.description = 'Endpoint para remover um conversa.'
  }
);

export { router as conversationsRoutes };
