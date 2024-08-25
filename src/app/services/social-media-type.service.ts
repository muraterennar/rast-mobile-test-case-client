import { Injectable } from '@angular/core';
import { SocialMediaTypeModal } from '../shared/models/socialMediaType.modal';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaTypeService {
  data: SocialMediaTypeModal[] = [
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Twitter' },
    { id: 3, name: 'Instagram' },
    { id: 4, name: 'LinkedIn' },
    { id: 5, name: 'YouTube' },
    { id: 6, name: 'Pinterest' },
    { id: 7, name: 'Snapchat' },
  ];

  constructor() {}

  getSocialMediaTypes(): SocialMediaTypeModal[] {
    return this.data;
  }
  
  getSocialMediaTypeNames(): string[] {
    return this.data.map((x) => x.name);
  }

  getSocialMediaTypeById(id: number): SocialMediaTypeModal {
    return this.data.find((x) => x.id === id);
  }

  getSocialMediaTypeByName(name: string): SocialMediaTypeModal {
    return this.data.find((x) => x.name === name);
  }

  getSocialMediaTypeIdByName(name: string): number {
    return this.data.find((x) => x.name === name).id;
  }

  getSocialMediaTypeNameById(id: number): string {
    return this.data.find((x) => x.id === id).name;
  }

  addSocialMediaType(socialMediaType: SocialMediaTypeModal): void {
    this.data.push(socialMediaType);
  }

  updateSocialMediaType(socialMediaType: SocialMediaTypeModal): void {
    const index = this.data.findIndex((x) => x.id === socialMediaType.id);
    this.data[index] = socialMediaType;
  }

  deleteSocialMediaType(id: number): void {
    const index = this.data.findIndex((x) => x.id === id);
    this.data.splice(index, 1);
  }

}
