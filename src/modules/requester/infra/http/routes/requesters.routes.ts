import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { RequestersController } from '../controllers/RequestersController';

const router = Router();

const requestersController = new RequestersController();

router.get('/requesters', requestersController.index, () => {
  // #swagger.tags = ['Requesters']
  // #swagger.description = 'Endpoint para obter uma lista de requisitantes.'
});

router.get(
  '/requesters/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  requestersController.show,
  () => {
    // #swagger.tags = ['Requesters']
    // #swagger.description = 'Endpoint para obter um requisitante.'
  }
);

router.post(
  '/requesters',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  requestersController.store,
  () => {
    // #swagger.tags = ['Requesters']
    // #swagger.description = 'Endpoint para criar um requisitante.'
  }
);

router.put(
  '/requesters/:id',
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
  requestersController.update,
  () => {
    // #swagger.tags = ['Requesters']
    // #swagger.description = 'Endpoint para atualizar um requisitante.'
  }
);

router.delete(
  '/requesters/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  requestersController.delete,
  () => {
    // #swagger.tags = ['Requesters']
    // #swagger.description = 'Endpoint para remover um requisitante.'
  }
);

export { router as requestersRoutes };
