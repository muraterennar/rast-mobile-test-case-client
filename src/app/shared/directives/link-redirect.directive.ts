import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLinkRedirect]',
  standalone: true,
})
export class LinkRedirectDirective {
  @Input('appLinkRedirect') url: string;

  constructor() {}

  // 'click' olayını dinleyen bir host listener tanımlanır
  // Bu, direktifin uygulandığı HTML elementine tıklandığında tetiklenir
  @HostListener('click', ['$event']) onClick(event: Event) {
    // Olayın varsayılan davranışını engeller (örneğin, bir linkin doğal olarak tıklanması)
    event.preventDefault();

    // Eğer 'url' değeri varsa, yeni bir sekmede bu URL'yi açar
    if (this.url) {
      window.open(this.url, '_blank');
    }
  }
}
