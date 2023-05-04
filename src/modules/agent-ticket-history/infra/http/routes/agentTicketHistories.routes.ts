import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { AgentTicketHistoriesController } from '../controllers/AgentTicketHistoriesRepository';

const router = Router();

const agentTicketHistoriesController = new AgentTicketHistoriesController();

router.get(
  '/agent-ticket-histories',
  agentTicketHistoriesController.index,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para obter uma lista um históticos de Agent-Ticket.'
    /* #swagger.responses[200] = {
        description: 'Históricos obtidos com sucesso.',
        schema: [
          {
            id: '6c7a6bb7-8f08-4df0-b514-e6adaf9e35a7',
            agent_id: '812af9f9-8538-4831-af5e-fcfd65ad45bf',
            ticket_id: 'c22b8ecd-7cd0-49ed-af03-3e0efa447e5f',
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
  }
);

router.get(
  '/agent-ticket-histories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.show,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para obter um histótico de Agent-Ticket.'
    // #swagger.parameters['id'] = { description: 'Id do histórico.', in: 'path', required: true }
    /* #swagger.responses[200] = {
      description: 'Histórico obtido com sucesso.',
      schema: {
            id: '6c7a6bb7-8f08-4df0-b514-e6adaf9e35a7',
            agent_id: '812af9f9-8538-4831-af5e-fcfd65ad45bf',
            ticket_id: 'c22b8ecd-7cd0-49ed-af03-3e0efa447e5f',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    } */
    /* #swagger.responses[404] = {
        description: 'Histórico não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent-Ticket history not found.',
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
  '/agent-ticket-histories',
  celebrate({
    [Segments.BODY]: {
      agent_id: Joi.string().uuid().required(),
      ticket_id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.store,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para criar um histórico de Agent-Ticket.'
    // #swagger.parameters['id'] = { description: 'Id do histórico.', in: 'path', required: true }
    /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Exemplo de body para criar um histórico.',
            required: true,
            schema: { 
              agent_id: '812af9f9-8538-4831-af5e-fcfd65ad45bf',
              ticket_id: 'c22b8ecd-7cd0-49ed-af03-3e0efa447e5f',
            }
    } */
    /* #swagger.responses[201] = {
      description: 'Histórico criado com sucesso.',
      schema: [
        {
            id: '6c7a6bb7-8f08-4df0-b514-e6adaf9e35a7',
            agent_id: '812af9f9-8538-4831-af5e-fcfd65ad45bf',
            ticket_id: 'c22b8ecd-7cd0-49ed-af03-3e0efa447e5f',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
      ]
    } */
    /* #swagger.responses[404.1] = {
        description: 'Histórico não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent-Ticket history not found.',
        }
    } */
    /* #swagger.responses[404.2] = {
        description: 'Agente informado não existe.',
        schema: {
          status: 'error',
          message: 'The agent informed does not exists.',
        }
    } */
    /* #swagger.responses[404.3] = {
        description: 'Ticket informado não existe.',
        schema: {
          status: 'error',
          message: 'The ticket informed does not exists.',
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
  '/agent-ticket-histories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      agent_id: Joi.string().uuid(),
      ticket_id: Joi.string().uuid(),
    },
  }),
  agentTicketHistoriesController.update,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para atualizar um histótico de Agent-Ticket.'
    // #swagger.parameters['id'] = { description: 'Id do histórico.', in: 'path', required: true }
    /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Exemplo de body para atualizar um histórico.',
            required: true,
            schema: { 
              agent_id: '812af9f9-8538-4831-af5e-fcfd65ad45bf',
              ticket_id: '85315bda-3719-490d-b780-1b7e64e027f9',
            }
    } */
    /* #swagger.responses[201] = {
      description: 'Histórico atualizado com sucesso.',
      schema: [
        {
            id: '6c7a6bb7-8f08-4df0-b514-e6adaf9e35a7',
            agent_id: '812af9f9-8538-4831-af5e-fcfd65ad45bf',
            ticket_id: '85315bda-3719-490d-b780-1b7e64e027f9',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
      ]
    } */
    /* #swagger.responses[404.1] = {
        description: 'Histórico não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent-Ticket history not found.',
        }
    } */
    /* #swagger.responses[404.2] = {
        description: 'Agente informado não existe.',
        schema: {
          status: 'error',
          message: 'The agent informed does not exists.',
        }
    } */
    /* #swagger.responses[404.3] = {
        description: 'Ticket informado não existe.',
        schema: {
          status: 'error',
          message: 'The ticket informed does not exists.',
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
  '/agent-ticket-histories/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  agentTicketHistoriesController.delete,
  () => {
    // #swagger.tags = ['Agent-Ticket History']
    // #swagger.description = 'Endpoint para deletar um histótico de Agent-Ticket.'
    // #swagger.parameters['id'] = { description: 'Id do histórico.', in: 'path', required: true }
    /* #swagger.responses[200] = {
      description: 'Histórico deletado com sucesso.',
    } */
    /* #swagger.responses[404] = {
        description: 'Histórico não encontrado.',
        schema: {
          status: 'error',
          message: 'Agent-Ticket history not found.',
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

export { router as agentTicketHistoriesRoutes };
