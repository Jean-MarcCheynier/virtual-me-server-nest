import { HttpStatus } from '@nestjs/common';

export type RequestTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string;
};

export type ISO6391 = string;

export enum MessageType {
  TEXT = 'text',
  ACTION = 'action',
}

export type Message = {
  type: MessageType;
  content: string;
};

export type ClientInfo = {
  description: string;
  id: string;
  name: string;
};

export type Intent = {
  slug: string;
  confidence: string;
};

export type Entity = {
  confidence: number;
};

export enum Sentiment {
  VERY_POSITIVE = 'vpositive',
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
  NAGATIVE = 'negative',
  VERY_NEGATIVE = 'vnegative',
}

export type DialogRequest = {
  client_info?: ClientInfo;
  conversation_id: string;
  message: Message;
  language?: string;
  memory?: any;
};

export type DialogResponse = {
  results: {
    messages: Message[];
    conversation: {
      id: string;
      client_info?: ClientInfo;
      language?: string;
      memory?: any;
      initial_context?: any;
      skill: string;
      skill_occurences: number;
    };
    nlp: {
      uuid: string;
      source: string;
      intents: Intent[];
      sentiment: Sentiment;
      entities: Entity[];
      language: ISO6391;
      processing_language: ISO6391;
      version: string;
      timestamp: string;
      status: HttpStatus;
    };
  };
  message: string;
};
