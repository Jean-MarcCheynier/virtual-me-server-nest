import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
  validateSync,
} from 'class-validator';
import { Donation } from '../donation.schema';
import { State } from '../interfaces/state.enum';
import { Status } from '../interfaces/status.enum';

type Ediatable<S extends Status | unknown, T> = S extends Status.Published
  ? T
  : T | undefined;

export class WishEntity<S extends Status | unknown = unknown> {
  @IsUUID()
  id: string;

  /**
   * Wish name
   * @example My Whish
   */
  @IsString()
  name: Ediatable<S, string>;
  @IsUrl()
  url: Ediatable<S, string>;
  @IsUrl()
  imageUrl: Ediatable<S, string>;
  @IsNumber()
  price: Ediatable<S, number>;
  @IsEnum(State)
  states: Ediatable<S, State[]>;
  @IsString()
  description: Ediatable<S, string>;
  @ValidateNested()
  donations: Ediatable<S, Donation[]>;

  @IsEnum(Status)
  private _status: Ediatable<S, Status>;

  get status() {
    return this._status;
  }

  set status(status: Ediatable<S, Status>) {
    const errors = validateSync(this);
    if (status === Status.Published && errors.length !== 0) {
      throw Error(JSON.stringify(errors));
    }
    this._status = status;
  }
}

export class DraftWishEntity extends PartialType(WishEntity) {}
export class PublishedEntity extends WishEntity<Status.Published> {}
