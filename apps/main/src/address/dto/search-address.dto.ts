import { Language } from '@googlemaps/google-maps-services-js';
import { IsEnum, IsString } from 'class-validator';

export class SearchAddressDto {
  @IsString()
  query: string;

  @IsEnum(Language)
  language;
}
