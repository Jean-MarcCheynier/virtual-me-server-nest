import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from '@main/user/schema/user.schema';

export type DonationDocument = Donation & Document;

@Schema()
export class Donation {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  donator: User | Types.ObjectId | string;

  @Prop({ type: Number, required: false })
  amount: string;

  @Prop({ type: Boolean, required: false })
  paid: boolean;

  @Prop({ type: String, required: false })
  note: string;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
