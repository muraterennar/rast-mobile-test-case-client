import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLinkColor]',
  standalone: true,
})
export class LinkColorDirective {

  @Input() appLinkColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor(this.appLinkColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(null); // Varsayılan renk
  }

  private changeColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}