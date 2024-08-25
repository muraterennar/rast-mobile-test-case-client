import { ResolveFn } from '@angular/router';
import { SocialMediaModel } from '../shared/models/social.model';
import { SocialService } from '../services/social.service';
import { inject } from '@angular/core';

export const socialResolver: ResolveFn<SocialMediaModel> = async (route, state) => {
  let socialService = inject(SocialService);
  let socialMedia: SocialMediaModel;
  const id = route.paramMap.get('id');
  await socialService.getSocialMediaById(id, (response) => {
    console.log(response);
    
    socialMedia = response;

    return socialMedia;
  });

  console.log(socialMedia)
  return socialMedia;
};
