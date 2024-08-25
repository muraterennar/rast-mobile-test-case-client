import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLinkRedirect]',
  standalone: true,
})
export class LinkRedirectDirective {

  @Input('appLinkRedirect') url: string; 

  constructor() { }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    if (this.url) {
      window.open(this.url, '_blank');
    }
  }

}