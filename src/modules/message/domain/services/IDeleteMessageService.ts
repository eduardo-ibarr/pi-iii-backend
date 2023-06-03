export interface IDeleteMessageService {
  execute(id: string): Promise<void>;
}
