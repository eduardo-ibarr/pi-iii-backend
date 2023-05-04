import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { TicketsController } from '../controllers/TicketsController';

const router = Router();

const ticketsController = new TicketsController();

router.get('/tickets', ticketsController.index, () => {
  // #swagger.tags = ['Tickets']
  // #swagger.description = 'Endpoint para obter uma lista de tickets.'
});

router.get(
  '/tickets/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.show,
  () => {
    // #swagger.tags = ['Tickets']
    // #swagger.description = 'Endpoint para obter um ticket.'
  }
);

router.post(
  '/tickets',
  celebrate({
    [Segments.BODY]: {
      agent_id: Joi.string().uuid().required(),
      category_id: Joi.string().uuid().required(),
      content: Joi.string().required(),
      requester_id: Joi.string().uuid().required(),
      sector_id: Joi.string().uuid().required(),
      status: Joi.boolean().required(),
      subject: Joi.string().required(),
      read_status: Joi.boolean().required(),
    },
  }),
  ticketsController.store,
  () => {
    // #swagger.tags = ['Tickets']
    // #swagger.description = 'Endpoint para criar um ticket.'
  }
);

router.put(
  '/tickets/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      agent_id: Joi.string().uuid(),
      category_id: Joi.string().uuid(),
      content: Joi.string(),
      requester_id: Joi.string().uuid(),
      sector_id: Joi.string().uuid(),
      status: Joi.boolean(),
      subject: Joi.string(),
      read_status: Joi.boolean(),
    },
  }),
  ticketsController.update,
  () => {
    // #swagger.tags = ['Tickets']
    // #swagger.description = 'Endpoint para atualizar um ticket.'
  }
);

router.delete(
  '/tickets/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.delete,
  () => {
    // #swagger.tags = ['Tickets']
    // #swagger.description = 'Endpoint para deletar um ticket.'
  }
);

export { router as ticketsRoutes };
