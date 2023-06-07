import AppError from '../../../api/errors/AppError';
import { IResponseAdminDTO } from '../domain/dtos';
import { IAdminsRepository } from '../domain/repositories/IAdminsRepository';

export class ShowAdminService {
  constructor(private adminsRepository: IAdminsRepository) {}

  public async execute(id: string): Promise<IResponseAdminDTO | null> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }

    return admin;
  }
}
