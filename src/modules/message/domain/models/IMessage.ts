export interface IMessage {
  id: string;
  id_conversation: string;
  content: string;
  author: string;
  type_of_author: number;
  created_at: Date;
  status: number;
}
