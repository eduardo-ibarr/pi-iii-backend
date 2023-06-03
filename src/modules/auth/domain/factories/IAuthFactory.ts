import { ILoginService } from '../services/ILoginService';

export interface IAuthServicesFactory {
  login(): ILoginService;
}
