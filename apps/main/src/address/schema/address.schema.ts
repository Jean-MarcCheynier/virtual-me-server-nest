import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  Conversation,
  ConversationSchema,
} from '@main/sapcai/schema/conversation.schema';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: false, unique: true })
  email?: string;

  @Prop({ type: [String], default: [Role.USER], required: true })
  roles: Role[];

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: [ConversationSchema] })
  conversations: Array<Conversation>;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
