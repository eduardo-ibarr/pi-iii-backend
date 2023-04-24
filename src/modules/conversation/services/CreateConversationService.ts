import { ICreateConversation } from '../domain/models';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class CreateConversationService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute({ ticket_id, agent_id }: ICreateConversation) {
    const conversation = await this.conversationsRepository.create({
      ticket_id,
      agent_id,
    });

    return conversation;
  }
}
