import { Directive, ElementRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appValidUrlDirective]',
  standalone: true,
  // Bu direktifi, Angular'ın yerleşik validator sistemine bağlayorum
  // NG_VALIDATORS sağlayıcısı ile birden fazla validator'ın kullanılmasına izin veriliyor
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidUrlDirectiveDirective,
      multi: true,
    },
  ],
})
export class ValidUrlDirectiveDirective {
  @Input('appValidUrl') validUrl: boolean;

  constructor() {}

  // Form kontrolüne ait validasyon fonksiyonu
  // Bu fonksiyon, kontrolün geçerliliğini kontrol eder
  validate(control: AbstractControl): ValidationErrors | null {
    // Eğer kontrolün bir değeri varsa ve URL geçerli değilse, 'invalidUrl' hatasını döndür
    if (control.value && !this.isValidUrl(control.value)) {
      return { invalidUrl: true };
    }
    // Eğer URL geçerli ise veya kontrol boşsa, null döndür (geçerli)
    return null;
  }

  // URL'nin geçerli olup olmadığını kontrol eden yardımcı fonksiyon
  private isValidUrl(url: string): boolean {
    // URL'yi doğrulamak için kullanılan düzenli ifade (regex)
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url); // Düzenli ifade URL ile eşleşirse true, aksi halde false döner
  }
}
