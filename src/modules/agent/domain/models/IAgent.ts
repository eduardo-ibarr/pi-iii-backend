export interface IAgent {
  id: string;
  name: string;
  password: string;
  email: string;
  tickets_finished: string[];
  tickets_active: string[];
  created_at: Date;
  updated_at: Date;
}
