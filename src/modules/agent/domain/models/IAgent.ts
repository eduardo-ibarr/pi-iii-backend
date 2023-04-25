export interface IAgent {
  id: string;
  name: string;
  ticket_history: string[];
  email: string;
  password: string;
  available: boolean;
  created_at: Date;
  updated_at: Date;
}
