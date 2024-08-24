import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SystemButtonComponent } from '../system-button/system-button.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  addedFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    formBuilder: FormBuilder
  ) {}
  title: string;

  ngOnInit(): void {
    this.title = this.data?.title;
    console.log(this.data);
    this.setForm();
  }

  setForm() {
    this.addedFormGroup = new FormGroup({
      socialMediaLink: new FormControl(this.data.datas.socialMediaLink, Validators.required),
      socialMediaName: new FormControl(this.data.datas.socialMediaName, Validators.required),
      description: new FormControl(this.data.datas.description, Validators.required),
    });

    console.log(this.addedFormGroup);
  }

  onSubmit() {
    console.log(this.addedFormGroup.value);
  }
}
