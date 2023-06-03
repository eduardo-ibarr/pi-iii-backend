export interface IDeleteConversationService {
  execute(id: string): Promise<void>;
}
