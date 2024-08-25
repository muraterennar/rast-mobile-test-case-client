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

   // Belirli bir bileşeni açar ve veri iletir
  // Dönüş olarak, BottomSheet kapatıldığında sağlanan boolean değerini içeren bir Observable döner
  openButtonSheet(component: any, data: any): Observable<boolean> {
    this._bottomSheetRef = this._bottomSheet.open(component, { data });
    return this._bottomSheetRef.afterDismissed();  // Kapatıldığında boolean dönüş değerini alır
  }

  // Açık olan BottomSheet'i kapatır
  closeButtonSheet(): void {
    if (this._bottomSheetRef) {
      this._bottomSheetRef.dismiss(); // Modali kapat
    }
  }
}
