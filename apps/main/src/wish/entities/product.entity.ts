import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { IsString, IsUrl, IsUUID } from 'class-validator';

/**
 * Represents the published entity
 */
export class ProductEntity {
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
}

const editableKeys: readonly (keyof ProductEntity)[] = ['name', 'url'];

export class DraftProductEntity extends IntersectionType(
  OmitType(ProductEntity, editableKeys),
  PartialType(PickType(ProductEntity, editableKeys)),
) {}
