import { Router } from 'express';
import { AgentsController } from '../controllers/AgentsController';

import { celebrate, Joi, Segments } from 'celebrate';
import { AgentServicesFactory } from '../../../factories/AgentServicesFactory';

const router = Router();

const agentServicesFactory = new AgentServicesFactory();
const agentsController = new AgentsController(agentServicesFactory);

router.get('/agents', agentsController.index, () => {
  // #swagger.tags = ['Agents']
  // #swagger.description = 'Endpoint para obter uma lista de agentes.'
  /* #swagger.responses[200] = {
      description: 'Agentes obtidos com sucesso.',
      schema: [
        {
          id: 'b3a6b105-5ced-40c0-abc5-900d344bf805',
          name: 'Jhon Doe',
          email: 'jhondoe@example.com',
          available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
  } */
  /* #swagger.responses[500] = {
      description: 'Algum erro de servidor.',
      schema: {
        status: 'error',
        message: 'Internal server error',
      }
  } */
});

router.get(
  '/agents/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentsController.show,
  () => {
    // #swagger.tags = ['Agents']
    // #swagger.description = 'Endpoint para obter um agente.'
    // #swagger.parameters['id'] = { description: 'Id do agente.', in: 'path', required: true }
    /* #swagger.responses[200] = {
      description: 'Agente obtido com sucesso.',
      schema: {
          id: 'b3a6b105-5ced-40c0-abc5-900d344bf805',
          name: 'Jhon Doe',
          email: 'jhondoe@example.com',
          available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
    } */
    /* #swagger.responses[404] = {
        description: 'Agente não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent not found.',
        }
    } */
    /* #swagger.responses[500] = {
        description: 'Algum erro de servidor.',
        schema: {
          status: 'error',
          message: 'Internal server error.',
        }
    } */
  }
);

router.post(
  '/agents',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      available: Joi.boolean().required(),
    },
  }),
  agentsController.store,
  () => {
    // #swagger.tags = ['Agents']
    // #swagger.description = 'Endpoint para criar um agente.'
    // #swagger.parameters['id'] = { description: 'Id do agente.', in: 'path', required: true }
    /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Exemplo de body para criar um agente.',
            required: true,
            schema: { 
              name: 'Jhon Doe',
              email: 'jhondoe@example.com',
              password: 'something123',
              available: true,
            }
    } */
    /* #swagger.responses[201] = {
      description: 'Agente criado com sucesso.',
      schema: [
        {
          id: 'b3a6b105-5ced-40c0-abc5-900d344bf805',
          name: 'Jhon Doe',
          email: 'jhondoe@example.com',
          available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
    } */
    /* #swagger.responses[404] = {
        description: 'Agente não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent not found.',
        }
    } */
    /* #swagger.responses[409] = {
        description: 'Email em uso em outro agente.',
        schema: {
          status: 'error',
          message: 'Email already in use.',
        }
    } */
    /* #swagger.responses[500] = {
        description: 'Algum erro de servidor.',
        schema: {
          status: 'error',
          message: 'Internal server error.',
        }
    } */
  }
);

router.put(
  '/agents/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      available: Joi.boolean(),
    },
  }),
  agentsController.update,
  () => {
    // #swagger.tags = ['Agents']
    // #swagger.description = 'Endpoint para atualizar um agente.'
    // #swagger.parameters['id'] = { description: 'Id do agente.', in: 'path', required: true }
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Exemplo de body para atualizar um agente.',
        required: true,
        schema: { 
          name: 'Jhon Doe Clark',
          available: true,
        }
    } */
    /* #swagger.responses[200] = {
      description: 'Agente atualizado com sucesso.',
      schema: [
        {
          id: 'b3a6b105-5ced-40c0-abc5-900d344bf805',
          name: 'Jhon Doe Clark',
          email: 'jhondoe@example.com',
          available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]
    } */
    /* #swagger.responses[404] = {
        description: 'Agente não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent not found.',
        }
    } */
    /* #swagger.responses[409] = {
        description: 'Email em uso em outro agente.',
        schema: {
          status: 'error',
          message: 'Email already in use.',
        }
    } */
    /* #swagger.responses[500] = {
        description: 'Algum erro de servidor.',
        schema: {
          status: 'error',
          message: 'Internal server error.',
        }
    } */
  }
);

router.delete(
  '/agents/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentsController.delete,
  () => {
    // #swagger.tags = ['Agents']
    // #swagger.description = 'Endpoint para remover um agente.'
    // #swagger.parameters['id'] = { description: 'Id do agente.', in: 'path', required: true }
    /* #swagger.responses[200] = {
      description: 'Agente deletado com sucesso.',
    } */
    /* #swagger.responses[404] = {
        description: 'Agente não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent not found.',
        }
    } */
    /* #swagger.responses[500] = {
        description: 'Algum erro de servidor.',
        schema: {
          status: 'error',
          message: 'Internal server error.',
        }
    } */
  }
);

export { router as agentsRoutes };
