import {
  ICreateTicketDTO,
  IResponseTicketDTO,
  IUpdateTicketDTO,
} from '../dtos';

export interface ITicketsRepository {
  findById(id: string): Promise<IResponseTicketDTO | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IResponseTicketDTO[]>;
  create(data: ICreateTicketDTO): Promise<IResponseTicketDTO>;
  update(data: IUpdateTicketDTO): Promise<IResponseTicketDTO>;
}
