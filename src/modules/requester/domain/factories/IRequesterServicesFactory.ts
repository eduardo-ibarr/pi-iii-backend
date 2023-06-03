import {
  ICreateRequesterService,
  IListRequestersService,
  IShowRequesterService,
  IDeleteRequesterService,
  IUpdateRequesterService,
} from '../services';

export interface IRequesterServicesFactory {
  createRequesterService(): ICreateRequesterService;
  listRequestersService(): IListRequestersService;
  showRequesterService(): IShowRequesterService;
  deleteRequesterService(): IDeleteRequesterService;
  updateRequesterService(): IUpdateRequesterService;
}
