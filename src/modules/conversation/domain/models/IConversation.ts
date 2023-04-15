export interface IConversation {
  id: string;
  id_agent: string;
  id_requester: string;
  messages_amount: number;
  history: string[];
  created_at: Date;
  updated_at: Date;
}
