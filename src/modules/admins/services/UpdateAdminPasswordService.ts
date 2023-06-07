import AppError from '../../../api/errors/AppError';
import { IUpdateAdminPasswordDTO } from '../domain/dtos';
import { IAdminsRepository } from '../domain/repositories/IAdminsRepository';
import { IUpdateAdminPasswordService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';

export class UpdateAdminPasswordService implements IUpdateAdminPasswordService {
  constructor(
    private adminsRepository: IAdminsRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    new_password,
    old_password,
  }: IUpdateAdminPasswordDTO): Promise<void> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new AppError('Admin not found.', 404);
    }

    const adminAuthData =
      await this.adminsRepository.findByEmailReturningAuthData(admin.email);

    const isSamePasswordTyped = await this.hashProvider.compareHash(
      old_password,
      adminAuthData?.password || ''
    );

    if (!isSamePasswordTyped) {
      throw new AppError(
        'Password received not equals to the existing password.',
        400
      );
    }

    const passwordUpdated = await this.hashProvider.generateHash(new_password);

    await this.adminsRepository.update({
      id,
      password: passwordUpdated,
    });
  }
}
