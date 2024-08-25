import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import {
  SystemButtonComponent,
  SystemButtonStyle,
} from '../system-button/system-button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SocialMediaModel } from '../../shared/models/social.model';
import { Icons } from '../../shared/models/icons';
import { CustomModalService } from '../../services/common/custom-modal.service';
import { Router } from '@angular/router';
import { SocialService } from '../../services/social.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [
    CustomInputComponent,
    SystemButtonComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent implements OnInit {
  addedFormGroup: FormGroup;
  closeIcon: Icons = Icons.close;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddFormComponent>,
    private customModalService: CustomModalService,
    private socialService: SocialService
  ) {}
  title: string;

  ngOnInit(): void {
    this.title = this.data?.title;
    this.setForm();
  }

  setForm() {
    this.addedFormGroup = new FormGroup({
      SocialMediaLink: new FormControl('', Validators.required),
      SocialMediaName: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
    });

    console.log(this.addedFormGroup);
  }

  confirm() {
    let socialMedia: SocialMediaModel = this.addedFormGroup
      .value as SocialMediaModel;

    this.socialService.createSocialMedia(socialMedia);

    this.socialService.getSocialMedia(
      environment.defaultPage,
      environment.defaultPageSize
    );

    this.dialogRef.close(true);
    // this.customModalService.closeDialog();
  }

  cancel(): void {
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
