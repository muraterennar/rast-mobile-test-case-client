import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-system-button',
  standalone: true,
  imports: [],
  templateUrl: './system-button.component.html',
  styleUrl: './system-button.component.css',
})
export class SystemButtonComponent {
  @Input() text: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() type?: 'button' | 'submit' | 'reset' = 'button';
  @Input() systemButtonStyle: Partial<SystemButtonStyle>;
  @Input() menu: any;

  @ViewChild('button') myButton: ElementRef<HTMLButtonElement>;

  @Output() click = new EventEmitter<void>();

  getStyle(): string {
    if (this.systemButtonStyle) {
      const styles = [
        this.systemButtonStyle.color,
        this.systemButtonStyle.border,
        this.systemButtonStyle.background,
        this.systemButtonStyle.borderRadius,
        this.systemButtonStyle.fontSize,
        this.systemButtonStyle.fontWeight,
        this.systemButtonStyle.padding,
        this.systemButtonStyle.margin,
        this.systemButtonStyle.customStyle,
      ];

      // Filtrele ve boşlukları kaldır
      return styles.filter((style) => style).join(' ');
    } else {
      return 'px-6 py-3 bg-primary text-white rounded-lg font-bold max-lg:text-sm';
    }
  }

  handleClick(): void {
    this.click.emit();
  }
}

export interface SystemButtonStyle {
  color?: string;
  border?: string;
  background?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  margin?: string;
  customStyle?: string;
}
