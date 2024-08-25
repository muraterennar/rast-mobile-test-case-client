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
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { SocialMediaTypeService } from '../../services/social-media-type.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SocialService } from '../../services/social.service';
import { SocialMediaTypeModal } from '../../shared/models/socialMediaType.modal';
import { MatDialogRef } from '@angular/material/dialog';

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

  menuButtonItems: SocialMediaTypeModal[];

  searchControl: FormControl;

  @Output() searchValueChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() filterValueChange: EventEmitter<SocialMediaTypeModal[]> =
    new EventEmitter<SocialMediaTypeModal[]>();
  @Output() click = new EventEmitter<string>();
  @Output() onEnterClick = new EventEmitter<string>();
  @Output() addData = new EventEmitter<string>();

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
    this.menuButtonItems = this.socialMediaTypeService.getSocialMediaTypes();
  }

  // MenuButtonComponent'den gelen checkedItems'i işleyen metot
  handleCheckedItems(checkedItems: SocialMediaTypeModal[]) {
    // Seçilen öğeleri ebeveyne gönder
    this.filterValueChange.emit(checkedItems);
  }

  chageSearchValue() {
    // Form kontrolündeki değişiklikleri dinleyip EventEmitter'a aktarıyoruz
    this.searchControl.valueChanges.subscribe((value: string) => {
      this.searchValueChange.emit(value); // Değeri ebeveyne gönderiyoruz
    });
  }

  openDialog() {
    const dialogRef = this.customDialog.openDialog(AddFormComponent, {
      title: 'Yeni Hesap Ekle',
      width: ModalSize.Medium,
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Kullanıcı "Evet" dedi
        this.handlePositiveResponse();
      } else if (result === false) {
        // Kullanıcı "Hayır" dedi
        this.handleNegativeResponse();
      }
    });
  }

  handlePositiveResponse() {
    // Bu metodda table componentini güncelleyen işlemler yapılır
    // Örneğin, bir event emit edebilir veya service kullanabilirsiniz
    this.addData.emit('positive');
  }

  handleNegativeResponse() {
    // Kullanıcı "Hayır" dediğinde yapılacak işlemler
    this.addData.emit('negative');
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
