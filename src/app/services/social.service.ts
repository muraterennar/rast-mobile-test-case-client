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

    // Sosyal medya kayıtlarını sayfalı bir şekilde alır
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

    // Belirli bir ID'ye sahip sosyal medya kaydını alır
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

   // Arama sorgusuna göre sosyal medya kayıtlarını alır
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

    // Yeni bir sosyal medya kaydı oluşturur
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

    // Var olan bir sosyal medya kaydını günceller
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

   // Belirli bir ID'ye sahip sosyal medya kaydını siler
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