import { Injectable } from '@angular/core';
import { SocialMediaModel } from '../shared/models/social.model';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  data: SocialMediaModel[] = [
    {
      id: 1,
      socialMediaLink: 'johnexample.com',
      socialMediaName: 'John Doe',
      description: 'Admin',
    },
    {
      id: 2,
      socialMediaLink: 'janeexample.com',
      socialMediaName: 'Facebook',
      description: 'Editor',
    },
    {
      id: 3,
      socialMediaLink: 'emilyexample.com',
      socialMediaName: 'Emily Davis',
      description: 'Contributor',
    },
  ];

  // data: SocialMediaModel[];

  constructor() {
    // Initialize with some example data
    // this.data = Array.from({ length: 12 }, (_, index) => ({
    //   id: index + 1,
    //   socialMediaLink: `https://example.com/link${index + 1}`,
    //   socialMediaName: `Social Media ${index + 1}`,
    //   description: `Description for Social Media ${index + 1}`
    // }));
  }

  getSocialMedia(): SocialMediaModel[] {
    return this.data;
  }

  getSocialMediaById(id: number): SocialMediaModel {
    return this.data.find((social) => social.id === id);
  }

  addSocialMedia(social: SocialMediaModel): void {
    this.data.push(social);
  }

  updateSocialMedia(social: SocialMediaModel): void {
    const index = this.data.findIndex((s) => s.id === social.id);
    this.data[index] = social;
  }

  deleteSocialMedia(id: number): void {
    this.data = this.data.filter((social) => social.id !== id);
  }

  getPaginatedData(currentPage: number, itemsPerPage: number): SocialMediaModel[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = this.data.slice(startIndex, endIndex);

    // Fill remaining slots with empty data if needed
    while (paginatedData.length < itemsPerPage) {
      paginatedData.push({
        id: 0,
        socialMediaLink: '',
        socialMediaName: '',
        description: ''
      });
    }

    return paginatedData;
  }

  getTotalItems(): number {
    return this.data.length;
  }

  addData(newData: SocialMediaModel[]) {
    this.data = [...this.data, ...newData];
  }
}
