import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
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
import { DraftProductEntity, ProductEntity } from './product.entity';

type EntityState = 'draft' | 'published';
/**
 * Represents the published entity
 */
export class WishEntity<T extends EntityState = 'published'> {
  @IsUUID()
  id: string;

  /**
   * Wish name
   * @example My Whish
   */
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsUrl()
  imageUrl: string;

  product: T extends 'draft' ? DraftProductEntity : ProductEntity;

  @IsNumber()
  price: number;

  @IsEnum(State)
  states: State[];

  @IsString()
  description: string;

  @ValidateNested()
  donations: Donation[];

  @IsEnum(Status)
  private _status: Status;

  get status() {
    return this._status;
  }

  set status(status: Status) {
    const errors = validateSync(this);
    if (status === Status.Published && errors.length !== 0) {
      throw Error(JSON.stringify(errors));
    }
    this._status = status;
  }
}

const editableKeys: readonly (keyof WishEntity)[] = ['url', 'imageUrl'];

export class DraftWishEntity extends IntersectionType(
  OmitType(WishEntity<'draft'>, editableKeys),
  PartialType(PickType(WishEntity<'draft'>, editableKeys)),
) {}

