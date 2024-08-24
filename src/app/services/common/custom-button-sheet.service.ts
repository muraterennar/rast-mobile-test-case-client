import { inject, Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CustomButtonSheetService {
  private _bottomSheet = inject(MatBottomSheet);
  _bottomSheetRef: MatBottomSheetRef<any> | null = null;

  openButtonSheet(component: any, data: any): Observable<boolean> {
    this._bottomSheetRef = this._bottomSheet.open(component, { data });
    return this._bottomSheetRef.afterDismissed(); // Dismissed olayından boolean dönüşü al
  }

  closeButtonSheet(): void {
    if (this._bottomSheetRef) {
      this._bottomSheetRef.dismiss(); // Modali kapat
    }
  }
}
