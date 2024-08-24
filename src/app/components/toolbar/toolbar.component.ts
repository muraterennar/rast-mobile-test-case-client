import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { SocialMediaModel } from '../../shared/models/social.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [SystemButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  addButtonText: string = 'Yeni Hesap Ekle';
  plusIcon: string = Icons.plus;
  searchIcon: string = Icons.search;
  filterIcon: string = Icons.filter;
  socialData: SocialMediaModel;

  constructor(
    private customDialog: CustomModalService
  ) {}

  ngOnInit(): void {}

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
