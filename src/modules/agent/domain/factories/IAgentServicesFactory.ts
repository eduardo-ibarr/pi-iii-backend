import {
  ICreateAgentService,
  IListAgentsService,
  IShowAgentService,
  IDeleteAgentService,
  IUpdateAgentService,
} from '../services';

export interface IAgentServicesFactory {
  createAgentService(): ICreateAgentService;
  listAgentsService(): IListAgentsService;
  showAgentService(): IShowAgentService;
  deleteAgentService(): IDeleteAgentService;
  updateAgentService(): IUpdateAgentService;
}
