import {
  ICreateAgentService,
  IListAgentsService,
  IShowAgentService,
  IDeleteAgentService,
  IUpdateAgentService,
  IUpdateAgentPasswordService,
} from '../services';

export interface IAgentServicesFactory {
  createAgentService(): ICreateAgentService;
  listAgentsService(): IListAgentsService;
  showAgentService(): IShowAgentService;
  deleteAgentService(): IDeleteAgentService;
  updateAgentService(): IUpdateAgentService;
  updateAgentPasswordService(): IUpdateAgentPasswordService;
}
