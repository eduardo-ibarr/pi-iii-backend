import { Router } from 'express';
import { AgentTicketHistoriesController } from '../controllers/AgentTicketHistoriesRepository';

import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const agentTicketHistoriesController = new AgentTicketHistoriesController();

router.get('/', agentTicketHistoriesController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.show
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      agent_id: Joi.string().uuid().required(),
      ticket_id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.store
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
  agentTicketHistoriesController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.delete
);

export { router as agentTicketHistoriesRoutes };
