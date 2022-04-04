import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: false })
  email?: string;

  @Prop({ type: [String], default: [Role.USER], required: true })
  role: Role[];

  @Prop({ type: String, required: true, select: false })
  password: string;
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
