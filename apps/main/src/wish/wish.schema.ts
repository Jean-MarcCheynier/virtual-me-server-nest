import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { State } from './interfaces/state.enum';
import { Donation, DonationSchema } from './donation.schema';
import { Status } from './interfaces/status.enum';

export type WishDocument = Wish & Document;

@Schema()
export class Wish {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  url?: string;

  @Prop({ type: String, required: false })
  imageUrl?: string;

  @Prop({ type: Number, required: false })
  price?: number;

  @Prop({ type: [String], default: [], required: true })
  states: State[] = [];

  @Prop({ type: [String], default: Status.Draft, required: true })
  status = Status.Draft;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [DonationSchema], default: [] })
  donations: Donation[] = [];
}

export const WishSchema = SchemaFactory.createForClass(Wish);
