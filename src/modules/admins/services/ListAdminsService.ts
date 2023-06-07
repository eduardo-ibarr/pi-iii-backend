import { IResponseAdminDTO } from '../domain/dtos';
import { IAdminsRepository } from '../domain/repositories/IAdminsRepository';
import { IListAdminsService } from '../domain/services';

export class ListAdminsService implements IListAdminsService {
  constructor(private adminsRepository: IAdminsRepository) {}

  public async execute(): Promise<IResponseAdminDTO[]> {
    const admins = await this.adminsRepository.findAll();
    return admins;
  }
}
