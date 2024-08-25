import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appLinkColor]',
  standalone: true,
})
export class LinkColorDirective {
  @Input() appLinkColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // 'mouseenter' olayını dinleyen bir host listener tanımlanır
  // Bu, fare ile elementin üzerine gelindiğinde tetiklenir
  @HostListener('mouseenter') onMouseEnter() {
    // Fare ile elementin üzerine gelindiğinde, elementin rengini 'appLinkColor' değerine değiştirir
    this.changeColor(this.appLinkColor);
  }

  // 'mouseleave' olayını dinleyen bir host listener tanımlanır
  // Bu, fare elementten ayrıldığında tetiklenir
  @HostListener('mouseleave') onMouseLeave() {
    // Fare elementten ayrıldığında, rengi varsayılan hale getirir (null)
    this.changeColor(null); // Varsayılan renk
  }

  // Rengi değiştiren yardımcı fonksiyon
  private changeColor(color: string | null) {
    // Elementin stiline 'color' özelliğini ekler veya değiştirir
    // 'color' değerini verilen renge ('appLinkColor') veya varsayılan değere (null) ayarlar
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
