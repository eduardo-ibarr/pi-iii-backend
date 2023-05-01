import { Router } from 'express';
import { CategoriesController } from '../controllers/CategoriesController';

import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const categoriesController = new CategoriesController();

router.get('/', categoriesController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoriesController.show
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  categoriesController.store
);

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  categoriesController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  categoriesController.delete
);

export { router as categoriesRoutes };
