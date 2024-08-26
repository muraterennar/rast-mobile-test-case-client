import { Directive, HostListener, Input } from '@angular/core';
import { SocialMediaModel } from '../models/social.model';
import { VisitedService } from '../../services/visited.service';

@Directive({
  selector: '[appLinkRedirect]',
  standalone: true,
})
export class LinkRedirectDirective {
  @Input('appLinkRedirect') socialMediaModel: SocialMediaModel;

  constructor(private visitedService:VisitedService) {}

  // 'click' olayını dinleyen bir host listener tanımlanır
  // Bu, direktifin uygulandığı HTML elementine tıklandığında tetiklenir
  @HostListener('click', ['$event']) onClick(event: Event) {
    // Olayın varsayılan davranışını engeller (örneğin, bir linkin doğal olarak tıklanması)
    event.preventDefault();

    // Eğer 'url' değeri varsa, yeni bir sekmede bu URL'yi açar
    if (this.socialMediaModel) {
      window.open(this.socialMediaModel.SocialMediaLink, '_blank');
    }

    this.visitedService.setVisitedItems(this.socialMediaModel);
  }
}
