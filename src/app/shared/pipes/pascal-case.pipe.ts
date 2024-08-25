import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalCase',
  standalone: true,
})
export class PascalCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    
    // Eğer value null veya undefined ise, boş bir string döndürün
    if (value === null || value === undefined) {
      return '';
    }

    // Gelen değeri bir string'e dönüştürün
    const str = value.toString();

    // Stringi boşluklar veya alt çizgiler ile bölerek kelimelere ayırın
    const words = str.split(/[\s_]+/);

    // Her kelimenin ilk harfini büyük harf yapıp, geri kalanını küçük harfe çevirin ve kelimeleri birleştirin
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
