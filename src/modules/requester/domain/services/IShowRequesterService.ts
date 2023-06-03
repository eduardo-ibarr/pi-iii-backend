import { IResponseRequesterDTO } from '../dtos';

export interface IShowRequesterService {
  execute(id: string): Promise<IResponseRequesterDTO | null>;
}
