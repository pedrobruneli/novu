import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  IChatProvider,
  IChatOptions,
} from '@novu/stateless';
import axios, { AxiosInstance } from 'axios';

export class ViberChatProvider implements IChatProvider {
  id = 'viber-chat';
  channelType = ChannelTypeEnum.CHAT as ChannelTypeEnum.CHAT;
  private axiosInstance: AxiosInstance;

  constructor(
    private config: {
      apiKey: string;
      senderName: string;
    }
  ) {
    this.axiosInstance = axios.create({
      headers: {
        'X-Viber-Auth-Token': config.apiKey,
      },
    });
  }

  async sendMessage(
    options: IChatOptions
  ): Promise<ISendMessageSuccessResponse> {
    const response = await this.axiosInstance.post(
      'https://chatapi.viber.com/pa/send_message',
      {
        receiver: options.to,
        type: 'text',
        text: options.content,
        sender: {
          name: this.config.senderName,
        },
      }
    );

    return {
      id: response.data.message_token,
      date: new Date().toISOString(),
    };
  }
}
