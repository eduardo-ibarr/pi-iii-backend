import {
  ICreateTicketService,
  IListTicketsService,
  IShowTicketService,
  IDeleteTicketService,
  IUpdateTicketService,
} from '../services';

export interface ITicketServicesFactory {
  createTicketService(): ICreateTicketService;
  listTicketsService(): IListTicketsService;
  showTicketService(): IShowTicketService;
  deleteTicketService(): IDeleteTicketService;
  updateTicketService(): IUpdateTicketService;
}
