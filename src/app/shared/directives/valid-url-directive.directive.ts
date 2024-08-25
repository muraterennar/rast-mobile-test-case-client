import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appValidUrlDirective]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidUrlDirectiveDirective, multi: true }]
})
export class ValidUrlDirectiveDirective {
  @Input('appValidUrl') validUrl: boolean;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && !this.isValidUrl(control.value)) {
      return { 'invalidUrl': true };
    }
    return null;
  }

  private isValidUrl(url: string): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  }
}
