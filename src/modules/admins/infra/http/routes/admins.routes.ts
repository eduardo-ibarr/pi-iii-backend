import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { AdminsController } from '../controllers/AdminsController';
import { AdminServicesFactory } from '../../../factories/AdminServicesFactory';

const router = Router();

const adminServicesFactory = new AdminServicesFactory();
const adminsController = new AdminsController(adminServicesFactory);

router.get('/admins', adminsController.index, () => {
  // #swagger.tags = ['admins']
  // #swagger.description = 'Endpoint para obter uma lista de requisitantes.'
});

router.get(
  '/admins/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  adminsController.show,
  () => {
    // #swagger.tags = ['admins']
    // #swagger.description = 'Endpoint para obter um requisitante.'
  }
);

router.post(
  '/admins',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  adminsController.store,
  () => {
    // #swagger.tags = ['admins']
    // #swagger.description = 'Endpoint para criar um requisitante.'
  }
);

router.put(
  '/admins/:id',
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
  adminsController.update,
  () => {
    // #swagger.tags = ['admins']
    // #swagger.description = 'Endpoint para atualizar um requisitante.'
  }
);

router.put(
  '/admins/:id/password',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      old_password: Joi.string().required(),
      new_password: Joi.string().required(),
    },
  }),
  adminsController.updatePassword
);

router.delete(
  '/admins/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  adminsController.delete,
  () => {
    // #swagger.tags = ['admins']
    // #swagger.description = 'Endpoint para remover um requisitante.'
  }
);

export { router as adminsRoutes };
