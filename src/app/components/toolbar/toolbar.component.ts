import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  SystemButtonComponent,
  SystemButtonStyle,
} from '../system-button/system-button.component';
import { Icons } from '../../shared/models/icons';
import { AddFormComponent } from '../add-form/add-form.component';
import {
  CustomModalService,
  ModalSize,
} from '../../services/common/custom-modal.service';
import { SocialMediaModel } from '../../shared/models/social.model';
import {
  MenuButtonComponent,
  MenuButtonItems,
} from '../menu-button/menu-button.component';
import { SocialMediaTypeService } from '../../services/social-media-type.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [SystemButtonComponent, MenuButtonComponent, ReactiveFormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  addButtonText: string = 'Yeni Hesap Ekle';
  plusIcon: string = Icons.plus;
  searchIcon: string = Icons.search;
  filterIcon: string = Icons.filter;
  socialData: SocialMediaModel;

  menuButtonItems: MenuButtonItems[];

  searchControl: FormControl;

  @Output() searchValueChange: EventEmitter<string> =
    new EventEmitter<string>();
  filterItems: MenuButtonItems[];
  @Output() filterValueChange: EventEmitter<MenuButtonItems[]> =
    new EventEmitter<MenuButtonItems[]>();
  @Output() click = new EventEmitter<string>();
  @Output() onEnterClick = new EventEmitter<string>();

  constructor(
    private customDialog: CustomModalService,
    private socialMediaTypeService: SocialMediaTypeService
  ) {}

  ngOnInit(): void {
    this.getSocialMediaTypes();
    this.searchControl = new FormControl('');
    // Form kontrolündeki değişiklikleri dinleyip Dışarı aktarıyoruz
    this.chageSearchValue();
  }

  onEnter() {
    this.onEnterClick.emit(this.searchControl.value);
  }

  getSocialMediaTypes() {
    this.menuButtonItems = this.socialMediaTypeService
      .getSocialMediaTypeNames()
      .map((x) => {
        return { text: x, checked: false };
      });
  }

  // MenuButtonComponent'den gelen checkedItems'i işleyen metot
  handleCheckedItems(checkedItems: MenuButtonItems[]) {
    // filterItems'ın tanımlı olup olmadığını kontrol edin ve tanımlı değilse boş bir dizi olarak inisiyalize edin
    if (!this.filterItems) {
      this.filterItems = [];
    }
  
    // checkedItems listesini döngüye alarak mevcut durumu tersine çevir
    checkedItems.forEach((item) => {
      // filterItems içinde eşleşen öğeyi bul
      const existingItem = this.filterItems.find((filterItem) => filterItem.text === item.text);
  
      if (existingItem) {
        // Mevcut öğenin checked durumunu tersine çevir
        existingItem.checked = !existingItem.checked;
      } else {
        // Eğer öğe bulunamazsa, onu filtreye ekleyin
        this.filterItems.push({ ...item, checked: true });
      }
    });
  
    // Güncellenmiş filtreleri ebeveyne gönder
    this.filterValueChange.emit(this.filterItems);
  }

  chageSearchValue() {
    // Form kontrolündeki değişiklikleri dinleyip EventEmitter'a aktarıyoruz
    this.searchControl.valueChanges.subscribe((value: string) => {
      this.searchValueChange.emit(value); // Değeri ebeveyne gönderiyoruz
    });
  }

  openDialog() {
    this.customDialog.openDialog(AddFormComponent, {
      title: 'Yeni Hesap Ekle',
      width: ModalSize.Medium,
      height: 'auto',
    });
  }

  searchButtonStyle(): SystemButtonStyle {
    let style: SystemButtonStyle = {
      padding: 'px-4 py-2',
      background: 'bg-primary',
      color: 'text-white',
      fontWeight: 'font-bold',
      borderRadius: 'rounded-r-full',
    };

    return style;
  }

  filterButtonStyle(): SystemButtonStyle {
    let style: SystemButtonStyle = {
      padding: 'px-4 py-2',
      background: 'bg-white',
      color: 'text-primary',
      fontWeight: 'font-bold',
      borderRadius: 'rounded-full',
    };

    return style;
  }
}
