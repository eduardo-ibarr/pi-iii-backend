import {
  ICreateAdminService,
  IListAdminsService,
  IShowAdminService,
  IDeleteAdminService,
  IUpdateAdminService,
  IUpdateAdminPasswordService,
} from '../services';

export interface IAdminServicesFactory {
  createAdminService(): ICreateAdminService;
  listAdminsService(): IListAdminsService;
  showAdminService(): IShowAdminService;
  deleteAdminService(): IDeleteAdminService;
  updateAdminService(): IUpdateAdminService;
  updateAdminPasswordService(): IUpdateAdminPasswordService;
}
