import { Router } from 'express';
import { AgentTicketHistoriesController } from '../controllers/AgentTicketHistoriesRepository';

import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const agentTicketHistoriesController = new AgentTicketHistoriesController();

router.get(
  '/agent-ticket-histories',
  agentTicketHistoriesController.index,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para obter uma lista um históticos de Agent-Ticket.'
  }
);

router.get(
  '/agent-ticket-histories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.show,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para obter um histótico de Agent-Ticket.'
  }
);

router.post(
  '/agent-ticket-histories',
  celebrate({
    [Segments.BODY]: {
      agent_id: Joi.string().uuid().required(),
      ticket_id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.store,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para criar um histótico de Agent-Ticket.'
  }
);

router.put(
  '/agent-ticket-histories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      agent_id: Joi.string().uuid(),
      ticket_id: Joi.string().uuid(),
    },
  }),
  agentTicketHistoriesController.update,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para atualizar um histótico de Agent-Ticket.'
  }
);

router.delete(
  '/agent-ticket-histories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.delete,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para deletar um histótico de Agent-Ticket.'
  }
);

export { router as agentTicketHistoriesRoutes };
