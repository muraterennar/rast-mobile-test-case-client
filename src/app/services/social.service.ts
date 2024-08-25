import { Injectable } from '@angular/core';
import { SocialMediaModel } from '../shared/models/social.model';
import {
  CustomHttpService,
  RequestParameters,
} from './common/custom-http.service';
import { firstValueFrom } from 'rxjs';
import { PaginateModal } from '../shared/models/paginateModal';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private httpService: CustomHttpService) {}

  async getSocialMedia(
    page: number,
    limit: number,
    successCallBack?: (response?: PaginateModal<SocialMediaModel>) => void,
    errorCallBack?: (error?: any) => void
  ): Promise<void> {
    let requestParameter: RequestParameters = {
      controller: 'socialmedia',
      action: 'api/getall',
      queryString: `page=${page}&limit=${limit}`,
    };

    const service =
      this.httpService.get<PaginateModal<SocialMediaModel>>(requestParameter);
    const promiseData = await firstValueFrom(service);

    if (promiseData) {
      successCallBack?.(promiseData);
    } else {
      errorCallBack?.('Error');
    }
  }

  async getSocialMediaById(
    id: string,
    successCallBack?: (response?: SocialMediaModel) => void,
    errorCallBack?: (error?: any) => void
  ): Promise<void> {
    let requestParameter: RequestParameters = {
      controller: 'socialmedia',
      action: `api/get/${id}`,
    };

    const service = this.httpService.get<SocialMediaModel>(requestParameter);
    const promiseData = await firstValueFrom(service);

    if (promiseData) {
      successCallBack?.(promiseData);
    } else {
      errorCallBack?.('Error');
    }
  }

  async getSocialMediaBySearch(
    query: string,
    succesCallBack?: (response?: PaginateModal<SocialMediaModel>) => void,
    errorCallBack?: (error?: any) => void
  ) {
    let RequestParameters: RequestParameters = {
      controller: 'socialmedia',
      action: 'api/search',
      queryString: `query=${query}`,
    };

    const service =
      this.httpService.get<PaginateModal<SocialMediaModel>>(RequestParameters);
    const promiseData = await firstValueFrom(service);

    if (promiseData) succesCallBack?.(promiseData);
    else errorCallBack?.('Error');
  }

  async createSocialMedia(
    socialMedia: SocialMediaModel,
    successCallBack?: (response?: SocialMediaModel) => void,
    errorCallBack?: (error?: any) => void
  ): Promise<void> {
    let requestParameter: RequestParameters = {
      controller: 'socialmedia',
      action: 'api/add',
    };

    const service = this.httpService.post<SocialMediaModel>(
      requestParameter,
      socialMedia
    );
    const promiseData = await firstValueFrom(service);

    if (promiseData) {
      successCallBack?.(promiseData);
    } else {
      errorCallBack?.('Error');
    }
  }

  async updateSocialMedia(
    socialMedia: SocialMediaModel,
    successCallBack?: (response?: SocialMediaModel) => void,
    errorCallBack?: (error?: any) => void
  ): Promise<void> {
    let requestParameter: RequestParameters = {
      controller: 'socialmedia',
      action: `api/update/${socialMedia._id}`,
    };

    const service = this.httpService.put<SocialMediaModel>(
      requestParameter,
      socialMedia
    );
    const promiseData = await firstValueFrom(service);

    if (promiseData) {
      successCallBack?.(promiseData);
    } else {
      errorCallBack?.('Error');
    }
  }

  async deleteSocialMedia(
    id: string,
    successCallBack?: (response?: SocialMediaModel) => void,
    errorCallBack?: (error?: any) => void
  ): Promise<void> {
    let requestParameter: RequestParameters = {
      controller: 'socialmedia',
      action: `api/delete/${id}`,
    };

    const service = this.httpService.delete<SocialMediaModel>(requestParameter);
    const promiseData = await firstValueFrom(service);

    if (promiseData) {
      successCallBack?.(promiseData);
      console.log('Data:', promiseData);
    } else {
      errorCallBack?.('Error');
    }
  }
}
