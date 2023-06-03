export interface ILoginRequestDTO {
  type_of_user: 'requester' | 'agent';
  email: string;
  password: string;
}
