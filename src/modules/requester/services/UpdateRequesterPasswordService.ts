import AppError from '../../../api/errors/AppError';
import { IUpdateRequesterPasswordDTO } from '../domain/dtos';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';
import { IUpdateRequesterPasswordService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';

export class UpdateRequesterPasswordService
  implements IUpdateRequesterPasswordService
{
  constructor(
    private requestersRepository: IRequestersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    new_password,
    old_password,
  }: IUpdateRequesterPasswordDTO): Promise<void> {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new AppError('Requester not found.', 404);
    }

    const requesterAuthData =
      await this.requestersRepository.findByEmailReturningAuthData(
        requester.email
      );

    const isSamePasswordTyped = await this.hashProvider.compareHash(
      old_password,
      requesterAuthData?.password || ''
    );

    if (!isSamePasswordTyped) {
      throw new AppError(
        'Password received not equals to the existing password.',
        400
      );
    }

    const passwordUpdated = await this.hashProvider.generateHash(new_password);

    await this.requestersRepository.update({
      id,
      password: passwordUpdated,
    });
  }
}
