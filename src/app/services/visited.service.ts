import { Injectable } from '@angular/core';
import { CustomLocalService } from './common/custom-local.service';
import { SocialMediaModel } from '../shared/models/social.model';

@Injectable({
  providedIn: 'root',
})
export class VisitedService {
  key: string = 'visitedItems';
  constructor(private customLocal: CustomLocalService) {}

  getVisitedItems(): SocialMediaModel[] {
    return this.customLocal.getItem<SocialMediaModel[]>(this.key);
  }

  setVisitedItems(items: any): SocialMediaModel {
    let visitedItems = this.getVisitedItems();
    if (!visitedItems) {
      visitedItems = [];
    }
    visitedItems.push(items);
    this.customLocal.setItem(this.key, visitedItems);
    return items;
  }

  removeVisitedItems() {
    this.customLocal.removeLocalData(this.key);
  }
}
