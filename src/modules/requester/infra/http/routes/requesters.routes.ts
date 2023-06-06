import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { RequestersController } from '../controllers/RequestersController';
import { RequesterServicesFactory } from '../../../factories/RequesterServicesFactory';

const router = Router();

const requesterServicesFactory = new RequesterServicesFactory();
const requestersController = new RequestersController(requesterServicesFactory);

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

router.put(
  '/requesters/:id/password',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      new_password: Joi.string().required(),
    },
  }),
  requestersController.updatePassword
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
