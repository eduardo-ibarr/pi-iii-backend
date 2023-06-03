export interface ILoginResponseDTO {
  auth: boolean;
  token: string;
  expiresIn: number;
  refreshToken: string;
  userId: string;
}
