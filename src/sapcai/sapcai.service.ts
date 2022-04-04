import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DialogRequest } from '@virtual-me/virtual-me-ts-core';
import { AxiosResponse } from 'axios';
import * as qs from 'qs';
import { concatAll, map, Observable, tap } from 'rxjs';
import { DialogResponse, RequestTokenResponse } from './sapcai.types';

@Injectable()
export class SapcaiService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  private static tokenDetails?: RequestTokenResponse;

  requestToken(): Observable<RequestTokenResponse> {
    const AUTH_URL = this.config.get('sap_cai.auth_url');
    console.log('GETTING');
    const client_secret = this.config.get('sap_cai.client_secret');
    const client_id = this.config.get('sap_cai.client_id');
    const grant_type = 'client_credentials';

    const data = {
      grant_type,
      client_id,
      client_secret,
    };

    return this.httpService
      .post(AUTH_URL, qs.stringify(data))
      .pipe(map((r) => r.data));
  }

  dialog(
    dialogRequest: DialogRequest,
    accessToken: string,
    tokenType: string,
  ): Observable<AxiosResponse<any>> {
    const DIALOG_URL = this.config.get('sap_cai.dialog_url');
    return this.httpService.post(DIALOG_URL, dialogRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-token': this.config.get('sap_cai.xtoken'),
      },
    });
  }

  dialogWithRefresh(
    dialogRequest: DialogRequest,
  ): Observable<AxiosResponse<DialogResponse>> {
    if (SapcaiService.tokenDetails) {
      const { access_token, token_type } = SapcaiService.tokenDetails;
      return this.dialog(dialogRequest, access_token, token_type);
    } else {
      return this.requestToken().pipe(
        map(({ token_type, access_token }) =>
          this.dialog(dialogRequest, access_token, token_type),
        ),
        concatAll(),
      );
    }
  }
}
