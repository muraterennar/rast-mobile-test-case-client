import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkDomain',
  standalone: true,
})
export class LinkDomainPipe implements PipeTransform {
  transform(value: string): string {
    try {
      // Verilen string'i bir URL olarak ayrıştırmaya çalışın
      const parsedUrl = new URL(value);
  
      // URL başarılı bir şekilde ayrıştırıldıysa, hostname kısmını döndürün
      return parsedUrl.hostname;
    } catch (e) {
      return '';
    }
  }
}
