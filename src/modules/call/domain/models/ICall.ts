export interface ICall {
  id: string;
  id_requester: string;
  id_sector: string;
  id_category: string;
  subject: string;
  status: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}
