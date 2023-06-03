import { IResponseTicketDTO } from '../dtos';

export interface IListTicketsService {
  execute(): Promise<IResponseTicketDTO[]>;
}
