import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop({ type: String })
  conversationId?: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
