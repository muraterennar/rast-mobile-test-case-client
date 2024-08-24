import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { SystemButtonComponent } from '../system-button/system-button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SocialMediaModel } from '../../shared/models/social.model';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    formBuilder: FormBuilder
  ) {}
  title: string;

  ngOnInit(): void {
    this.title = this.data?.title;
    this.setForm();
  }

  setForm() {
    this.addedFormGroup = new FormGroup({
      socialMediaLink: new FormControl('', Validators.required),
      socialMediaName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    console.log(this.addedFormGroup);
  }

  onSubmit() {
    console.log(this.addedFormGroup.value);
  }
}
