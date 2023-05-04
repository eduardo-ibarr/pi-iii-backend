import { Router } from 'express';
import { CategoriesController } from '../controllers/CategoriesController';

import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const categoriesController = new CategoriesController();

router.get('/categories', categoriesController.index, () => {
  // #swagger.tags = ['Categories']
  // #swagger.description = 'Endpoint para obter uma lista de categorias.'
});

router.get(
  '/categories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoriesController.show,
  () => {
    // #swagger.tags = ['Categories']
    // #swagger.description = 'Endpoint para obter uma categoria.'
  }
);

router.post(
  '/categories',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoriesController.store,
  () => {
    // #swagger.tags = ['Categories']
    // #swagger.description = 'Endpoint para criar uma categoria.'
  }
);

router.put(
  '/categories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  categoriesController.update,
  () => {
    // #swagger.tags = ['Categories']
    // #swagger.description = 'Endpoint para atualizar uma categoria.'
  }
);

router.delete(
  '/categories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoriesController.delete,
  () => {
    // #swagger.tags = ['Categories']
    // #swagger.description = 'Endpoint para remover uma categoria.'
  }
);

export { router as categoriesRoutes };
