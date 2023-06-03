import { IResponseTicketDTO, IUpdateTicketDTO } from '../dtos';

export interface IUpdateTicketService {
  execute(data: IUpdateTicketDTO): Promise<IResponseTicketDTO>;
}
