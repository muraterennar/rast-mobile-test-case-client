import { ResolveFn } from '@angular/router';
import { SocialMediaModel } from '../shared/models/social.model';
import { SocialService } from '../services/social.service';
import { inject } from '@angular/core';

export const socialResolver: ResolveFn<SocialMediaModel> = async (
  route,
  state
) => {
  // `SocialService`'i enjekte eder
  let socialService = inject(SocialService);

  // `SocialMediaModel` türünde bir değişken tanımlar
  let socialMedia: SocialMediaModel;

  // URL parametrelerinden `id`'yi alır
  const id = route.paramMap.get('id');

  // Belirtilen `id`'ye sahip sosyal medyayı alır
  await socialService.getSocialMediaById(id, (response) => {
    socialMedia = response; // Yanıtı `socialMedia` değişkenine atar
  });
  return socialMedia; // `socialMedia` değişkenini döndürür
};
