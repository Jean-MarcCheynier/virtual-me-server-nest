import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { State } from './state';
import { Donation, DonationSchema } from './donation.schema';

export type WishDocument = Wish & Document;

@Schema()
export class Wish {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  url: string;

  @Prop({ type: String, required: false })
  imageUrl: string;

  @Prop({ type: Number, required: false })
  price: number;

  @Prop({ type: [String], default: [], required: true })
  states: State[];

  @Prop({ type: String })
  description: string;

  @Prop({ type: [DonationSchema], default: [] })
  donation: Donation[];
}

export const WishSchema = SchemaFactory.createForClass(Wish);
