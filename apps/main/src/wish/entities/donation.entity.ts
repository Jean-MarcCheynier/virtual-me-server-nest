import { User } from '@main/user/schema/user.schema';
import { Types } from 'mongoose';
import { Donation as MongoDonation } from '../donation.schema';
import { State } from '../interfaces/state.enum';
import { Status } from '../interfaces/status.enum';
import { Wish as MongoWish } from '../wish.schema';

export class Donation<S extends Status> implements MongoDonation {
  donator: string | User | Types.ObjectId;
  amount: string;
  paid: boolean;
  note: string;
}
