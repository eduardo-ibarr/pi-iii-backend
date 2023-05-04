const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';

const endpointsFiles = [
  './src/modules/agent/infra/http/routes/agents.routes.ts',
  './src/modules/agent-ticket-history/infra/http/routes/agentTicketHistories.routes.ts',
  './src/modules/auth/infra/http/routes/auth.routes.ts',
  './src/modules/category/infra/http/routes/categories.routes.ts',
  './src/modules/conversation/infra/http/routes/conversations.routes.ts',
  './src/modules/message/infra/http/routes/messages.routes.ts',
  './src/modules/requester/infra/http/routes/requesters.routes.ts',
  './src/modules/sector/infra/http/routes/sectors.routes.ts',
  './src/modules/ticket/infra/http/routes/tickets.routes.ts',
];

const doc = {
  info: {
    version: '1.0.0',
    title: 'Backend PI III',
    description: 'Documentação gerada automaticamente.',
  },
  host: 'localhost:3333',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Agents',
      description: 'Endpoints',
    },
    {
      name: 'Categories',
      description: 'Endpoints',
    },
    {
      name: 'Agent-Ticket History',
      description: 'Endpoints',
    },
    {
      name: 'Auth',
      description: 'Endpoints',
    },
    {
      name: 'Categories',
      description: 'Endpoints',
    },
    {
      name: 'Conversations',
      description: 'Endpoints',
    },
    {
      name: 'Messages',
      description: 'Endpoints',
    },
    {
      name: 'Requesters',
      description: 'Endpoints',
    },
    {
      name: 'Sectors',
      description: 'Endpoints',
    },
    {
      name: 'Tickets',
      description: 'Endpoints',
    },
  ],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'x-access-token',
      in: 'header',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
