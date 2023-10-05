import { ChannelTypeEnum, ICredentials } from '@novu/shared';
import { ViberChatProvider } from '@novu/viber-chat';
import { BaseChatHandler } from './base.handler';

export class ViberChatHandler extends BaseChatHandler {
  constructor() {
    super('viber-chat', ChannelTypeEnum.CHAT);
  }

  buildProvider(credentials: ICredentials) {
    const config: { apiKey: string; senderName: string } = {
      apiKey: credentials.apiKey,
      senderName: credentials.senderName,
    };

    this.provider = new ViberChatProvider(config);
  }
}
