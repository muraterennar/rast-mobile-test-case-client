import { ResolveFn } from '@angular/router';
import { SocialMediaModel } from '../shared/models/social.model';
import { SocialService } from '../services/social.service';
import { inject } from '@angular/core';

export const socialResolver: ResolveFn<SocialMediaModel> = (route, state) => {
  let socialService = inject(SocialService);

  const id = route.paramMap.get('id');
  return socialService.getSocialMediaById(Number(id));
};
