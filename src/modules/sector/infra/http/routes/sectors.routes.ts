import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { SectorsController } from '../controllers/SectorsController';

const router = Router();

const sectorsController = new SectorsController();

router.get('/sectors', sectorsController.index, () => {
  // #swagger.tags = ['Sectors']
  // #swagger.description = 'Endpoint para obter uma lista de setores.'
});

router.get(
  '/sectors/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sectorsController.show,
  () => {
    // #swagger.tags = ['Sectors']
    // #swagger.description = 'Endpoint para obter um setor.'
  }
);

router.post(
  '/sectors',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  sectorsController.store,
  () => {
    // #swagger.tags = ['Sectors']
    // #swagger.description = 'Endpoint para criar um setor.'
  }
);

router.put(
  '/sectors/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  sectorsController.update,
  () => {
    // #swagger.tags = ['Sectors']
    // #swagger.description = 'Endpoint para atualizar um setor.'
  }
);

router.delete(
  '/sectors/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  sectorsController.delete,
  () => {
    // #swagger.tags = ['Sectors']
    // #swagger.description = 'Endpoint para remover um setor.'
  }
);

export { router as sectorsRoutes };
