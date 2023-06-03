import { IResponseTicketDTO, ICreateTicketDTO } from '../dtos';

export interface ICreateTicketService {
  execute(data: ICreateTicketDTO): Promise<IResponseTicketDTO>;
}
