import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop({ type: String, required: true, unique: true })
  conversationId: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
