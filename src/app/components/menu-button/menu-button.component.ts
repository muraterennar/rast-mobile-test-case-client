import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PascalCasePipe } from '../../shared/pipes/pascal-case.pipe';
import { SocialMediaTypeModal } from '../../shared/models/socialMediaType.modal';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule, PascalCasePipe],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent {
  @Input() menus: SocialMediaTypeModal[] = [];
  @Output() checkedItemsChange = new EventEmitter<SocialMediaTypeModal[]>();

  constructor() {}

  onItemClicked(item: SocialMediaTypeModal) {
    // Eğer seçilen öğe zaten checked durumundaysa, tersine çevir
    if (item.checked) {
      item.checked = false;
    } else {
      // Diğer tüm menü öğelerinin 'checked' durumunu false yap
      this.menus.forEach((i) => {
        i.checked = false;
      });
      // Seçilen öğeyi true yap
      item.checked = true;
    }

    // menus dizisinde seçilen öğeyi güncelle
    this.updateSocialMediaType(item);

    // Güncellenmiş öğelerin listesini emit et
    this.emitCheckedItems();
  }

  // Servis fonksiyonu
  updateSocialMediaType(socialMediaType: SocialMediaTypeModal): void {
    const index = this.menus.findIndex((x) => x.id === socialMediaType.id);
    if (index !== -1) {
      this.menus[index] = socialMediaType;
    }
  }

  private emitCheckedItems() {
    const checkedItems = this.menus.filter((item) => item.checked);
    this.checkedItemsChange.emit(checkedItems);
  }
}
