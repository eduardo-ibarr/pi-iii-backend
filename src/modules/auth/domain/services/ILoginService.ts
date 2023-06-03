import { ILoginRequestDTO } from '../dtos/ILoginRequestDTO';
import { ILoginResponseDTO } from '../dtos/ILoginResponseDTO';

export interface ILoginService {
  execute(data: ILoginRequestDTO): Promise<ILoginResponseDTO>;
}
