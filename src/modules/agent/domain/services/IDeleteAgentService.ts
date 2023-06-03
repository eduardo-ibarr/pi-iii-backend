export interface IDeleteAgentService {
  execute(id: string): Promise<void>;
}
