export interface ICreateTicketDTO {
  requester_id: string;
  category_id: string;
  sector_id: string;
  status: string;
  subject: string;
  content: string;
}
