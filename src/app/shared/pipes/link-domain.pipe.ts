import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkDomain',
  standalone: true,
})
export class LinkDomainPipe implements PipeTransform {
  transform(value: string): string {
    try {
      const parsedUrl = new URL(value);
      return parsedUrl.hostname;
    } catch (e) {
      // Eğer URL geçerli değilse, boş bir string döndür
      return '';
    }
  }
}
