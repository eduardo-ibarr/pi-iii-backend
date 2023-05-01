import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { TicketsController } from '../controllers/TicketsController';

const router = Router();

const ticketsController = new TicketsController();

router.get('/', ticketsController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.show
);

router.post(
  '/',
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
  ticketsController.store
);

router.put(
  '/:id',
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
  ticketsController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ticketsController.delete
);

export { router as ticketsRoutes };
