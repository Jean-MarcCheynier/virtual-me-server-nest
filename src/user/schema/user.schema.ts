import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Conversation } from 'src/sapcai/schema/conversation.schema';
import { ConversationSchema } from '../../sapcai/schema/conversation.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: false })
  email?: string;

  @Prop({ type: [String], default: [Role.USER], required: true })
  roles: Role[];

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: [ConversationSchema] })
  conversations: Array<Conversation>;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const cryptPwd = function (next: any) {
  if (this.isModified('password') || (this.isNew && this.password)) {
    bcrypt.genSalt(10, (err: any, salt: any) => {
      if (err) {
        return next(err);
      }
      const password: string = this.password || '';
      bcrypt.hash(password, salt, (err: any, hash: any) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
};
