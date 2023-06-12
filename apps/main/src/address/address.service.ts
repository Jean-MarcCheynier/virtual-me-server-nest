import { Client, Language } from '@googlemaps/google-maps-services-js';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private logger: Logger,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    return 'This action adds a new address';
  }

  async search(query: string, language: Language) {
    const TEXT_SEARCH_API_URL =
      'https://maps.googleapis.com/maps/api/place/textsearch/json';

    const { data, request } = await firstValueFrom(
      this.httpService.get(TEXT_SEARCH_API_URL, {
        params: {
          query,
          inputtype: 'textquery',
          key: this.configService.get<string>('google.map_api_key'),
        },
      }),
    );

    return data.results;
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
