import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SystemButtonComponent,
  SystemButtonStyle,
} from '../system-button/system-button.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomModalService } from '../../services/common/custom-modal.service';
import { Icons } from '../../shared/models/icons';
import { Router } from '@angular/router';
import { SocialMediaTypeModal } from '../../shared/models/socialMediaType.modal';
import { SocialMediaModel } from '../../shared/models/social.model';
import { SocialService } from '../../services/social.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [
    CustomInputComponent,
    SystemButtonComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css',
})
export class UpdateFormComponent implements OnInit {
  updatedFormGroup: FormGroup;
  closeIcon: Icons = Icons.close;
  pageSize = environment.defaultPageSize;
  page = environment.defaultPage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateFormComponent>,
    private formBuilder: FormBuilder,
    private customModalService: CustomModalService,
    private router: Router,
    private socialService: SocialService
  ) {}
  title: string;

  ngOnInit(): void {
    this.title = this.data?.title;
    this.setForm();
  }

  setForm() {
    this.updatedFormGroup = new FormGroup({
      _id: new FormControl(this.data.datas._id),
      SocialMediaLink: new FormControl(
        this.data.datas.SocialMediaLink,
        Validators.required
      ),
      SocialMediaName: new FormControl(
        this.data.datas.SocialMediaName,
        Validators.required
      ),
      Description: new FormControl(
        this.data.datas.Description,
        Validators.required
      ),
    });
  }

  async onSubmit() {
    let socialMediaModel: SocialMediaModel = this.updatedFormGroup
      .value as SocialMediaModel;

    await this.socialService.updateSocialMedia(socialMediaModel);

    this.dialogRef.close(true);
  }

  onClose() {
    this.customModalService.closeDialog();
    this.dialogRef.close(false);
  }

  setSaveButtonStyle(): SystemButtonStyle {
    let style: SystemButtonStyle = {
      background: 'bg-primary',
      color: 'text-white',
      fontSize: 'text-sm',
      padding: 'py-2 px-4',
      borderRadius: 'rounded-full',
    };

    return style;
  }

  setCloseButtonStyle(): SystemButtonStyle {
    let style: SystemButtonStyle = {
      background: 'bg-secondary-50',
      color: 'text-primary',
      fontSize: 'text-sm',
      padding: 'py-2 px-4',
      borderRadius: 'rounded-full',
    };

    return style;
  }
}
