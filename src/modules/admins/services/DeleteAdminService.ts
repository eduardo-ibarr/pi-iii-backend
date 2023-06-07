import AppError from '../../../api/errors/AppError';
import { IAdminsRepository } from '../domain/repositories/IAdminsRepository';
import { IDeleteAdminService } from '../domain/services';

export class DeleteAdminService implements IDeleteAdminService {
  constructor(private adminsRepository: IAdminsRepository) {}

  public async execute(id: string): Promise<void> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }

    await this.adminsRepository.remove(admin.id);
  }
}
