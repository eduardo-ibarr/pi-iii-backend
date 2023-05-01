import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { SectorsController } from '../controllers/SectorsController';

const router = Router();

const sectorsController = new SectorsController();

router.get('/', sectorsController.index);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sectorsController.show
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  sectorsController.store
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
  sectorsController.update
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sectorsController.delete
);

export { router as sectorsRoutes };
