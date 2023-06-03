export interface IDeleteTicketService {
  execute(id: string): Promise<void>;
}
