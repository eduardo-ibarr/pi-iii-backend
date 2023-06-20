export interface ICreateMessageDTO {
  conversation_id: string;
  sender: string;
  content: string;
  read_status: boolean;
}
