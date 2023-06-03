import { IResponseTicketDTO } from '../dtos';

export interface IShowTicketService {
  execute(id: string): Promise<IResponseTicketDTO | null>;
}
