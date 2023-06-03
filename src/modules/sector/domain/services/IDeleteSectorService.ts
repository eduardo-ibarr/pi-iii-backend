export interface IDeleteSectorService {
  execute(id: string): Promise<void>;
}
