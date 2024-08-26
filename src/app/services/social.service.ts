import { Injectable } from '@angular/core';
import { SocialMediaModel } from '../shared/models/social.model';
import {
  CustomHttpService,
  RequestParameters,
} from './common/custom-http.service';
import { firstValueFrom } from 'rxjs';
import { PaginateModal } from '../shared/models/paginateModal';
import { CustomLocalService } from './common/custom-local.service';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private readonly LOCAL_STORAGE_KEY = 'socialMediaData';

  constructor(
    private httpService: CustomHttpService,
    private customLocal: CustomLocalService
  ) {}

  // Sosyal medya kayıtlarını sayfalı bir şekilde alır
  async getSocialMedia(
    page: number,
    limit: number,
    successCallBack?: (response?: PaginateModal<SocialMediaModel>) => void,
    errorCallBack?: (error?: any) => void
  ): Promise<void> {
    const cachedData = this.customLocal.getItem<
      PaginateModal<SocialMediaModel>
    >(this.LOCAL_STORAGE_KEY);

    if (cachedData?.page === page && cachedData?.limit === limit) {
      // Cache'den veriyi döndür
      successCallBack?.(cachedData);
      return;
    }

    let requestParameter: RequestParameters = {
      controller: 'socialmedia',
      action: 'api/getall',
      queryString: `page=${page}&limit=${limit}`,
    };

    const service =
      this.httpService.get<PaginateModal<SocialMediaModel>>(requestParameter);
    const promiseData = await firstValueFrom(service);

    if (promiseData) {
      this.customLocal.setItem<PaginateModal<SocialMediaModel>>(
        this.LOCAL_STORAGE_KEY,
        promiseData
      );
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
      // Cache'ı güncelle
      let currentData = this.customLocal.getItem<
        PaginateModal<SocialMediaModel>
      >(this.LOCAL_STORAGE_KEY);
      if (currentData) {
        // Mevcut veri sayısını artır
        currentData.totalDocs += 1;
        currentData.docs.push(promiseData);

        // Sayfa bilgilerini güncelle
        // Sayfa numarası ve limit bilgilerini kullanarak güncelleme yapın
        const totalPages = Math.ceil(currentData.totalDocs / currentData.limit);
        const hasNextPage = currentData.page < totalPages;
        const nextPage = hasNextPage ? currentData.page + 1 : null;

        currentData.totalPages = totalPages;
        currentData.hasNextPage = hasNextPage;
        currentData.nextPage = nextPage;
        currentData.hasPrevPage = currentData.page > 1;
        currentData.prevPage =
          currentData.page > 1 ? currentData.page - 1 : null;
        currentData.pagingCounter =
          (currentData.page - 1) * currentData.limit + currentData.docs.length;

        // Veriyi tekrar localStorage'a kaydet
        this.customLocal.setItem<PaginateModal<SocialMediaModel>>(
          this.LOCAL_STORAGE_KEY,
          currentData
        );
      } else {
        // Eğer cache'de veri yoksa, yeni bir `PaginateModal` oluştur
        const newData: PaginateModal<SocialMediaModel> = {
          docs: [promiseData],
          hasNextPage: false,
          hasPrevPage: false,
          limit: 10, // Varsayılan limit değeri
          nextPage: null,
          page: 1,
          pagingCounter: 1,
          prevPage: null,
          totalDocs: 1,
          totalPages: 1,
        };
        this.customLocal.setItem<PaginateModal<SocialMediaModel>>(
          this.LOCAL_STORAGE_KEY,
          newData
        );
      }

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
      // Cache'ı güncelle
      let currentData = this.customLocal.getItem<
        PaginateModal<SocialMediaModel>
      >(this.LOCAL_STORAGE_KEY);
      if (currentData) {
        // Veriyi `docs` içinde güncelle
        const index = currentData.docs.findIndex(
          (item) => item._id === promiseData._id
        );
        if (index !== -1) {
          currentData.docs[index] = promiseData;

          // Cache'e tekrar kaydet
          this.customLocal.setItem<PaginateModal<SocialMediaModel>>(
            this.LOCAL_STORAGE_KEY,
            currentData
          );
        }
      }

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
      // Cache'ı güncelle
      let currentData = this.customLocal.getItem<
        PaginateModal<SocialMediaModel>
      >(this.LOCAL_STORAGE_KEY);
      if (currentData) {
        // Veriyi sil
        const index = currentData.docs.findIndex(
          (item) => item._id.toString() === id
        );
        if (index !== -1) {
          currentData.docs.splice(index, 1);

          // TotalDocs ve TotalPages hesaplaması
          currentData.totalDocs -= 1;
          const totalPages = Math.ceil(
            currentData.totalDocs / currentData.limit
          );

          // Sayfa numarasını ve sayfalama bilgilerini güncelle
          currentData.totalPages = totalPages;
          currentData.hasNextPage = currentData.page < totalPages;
          currentData.nextPage = currentData.hasNextPage
            ? currentData.page + 1
            : null;
          currentData.hasPrevPage = currentData.page > 1;
          currentData.prevPage = currentData.hasPrevPage
            ? currentData.page - 1
            : null;
          currentData.pagingCounter =
            (currentData.page - 1) * currentData.limit +
            currentData.docs.length;

          // Eğer tüm veriler silindiyse ve şu anki sayfa boşsa, sayfayı bir öncekine çek
          if (currentData.docs.length === 0 && currentData.page > 1) {
            currentData.page -= 1;
            currentData.pagingCounter =
              (currentData.page - 1) * currentData.limit +
              currentData.docs.length;
            currentData.hasPrevPage = currentData.page > 1;
            currentData.prevPage = currentData.hasPrevPage
              ? currentData.page - 1
              : null;
          }

          // Veriyi tekrar localStorage'a kaydet
          this.customLocal.setItem<PaginateModal<SocialMediaModel>>(
            this.LOCAL_STORAGE_KEY,
            currentData
          );
        }

        successCallBack?.(promiseData);
      }
    } else {
      errorCallBack?.('Error');
    }
  }
}
