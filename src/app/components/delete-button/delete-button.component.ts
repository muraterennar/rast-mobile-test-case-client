import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { SocialMediaModel } from '../../shared/models/social.model';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css',
  imports: [MatListModule],
})
export class DeleteButtonComponent implements OnInit {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<DeleteButtonComponent>>(MatBottomSheetRef);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { item: SocialMediaModel }
  ) {}

  ngOnInit(): void {
  
  }

  onConfirm(): void {
    this._bottomSheetRef.dismiss(true);
  }

  onCancel(): void {
    this._bottomSheetRef.dismiss(false);
  }
}
