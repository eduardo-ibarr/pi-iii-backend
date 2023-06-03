export interface IDeleteRequesterService {
  execute(id: string): Promise<void>;
}
