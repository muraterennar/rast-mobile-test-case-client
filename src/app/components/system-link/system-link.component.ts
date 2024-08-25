import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PascalCasePipe } from "../../shared/pipes/pascal-case.pipe";

@Component({
  selector: 'app-system-link',
  standalone: true,
  imports: [RouterModule, PascalCasePipe],
  templateUrl: './system-link.component.html',
  styleUrl: './system-link.component.css',
})
export class SystemLinkComponent {
  @Input() text: string;
  @Input() icon: string;
  @Input() systemLinkStyle: SystemLinkStyle;
  @Input() routerLink?: string;
  @Input() link?:string;

  @Output() linkClicked = new EventEmitter<void>();

  getStyle(): string {
    if (this.systemLinkStyle)
      return `${this.systemLinkStyle.color} ${this.systemLinkStyle.border} ${this.systemLinkStyle.background} ${this.systemLinkStyle.borderRadius} ${this.systemLinkStyle.fontSize} ${this.systemLinkStyle.fontWeight} ${this.systemLinkStyle.padding} ${this.systemLinkStyle.margin}`;
    else
      return 'text-dark font-weight-bold p-2 m-2';
  }

  onClick() {
    this.linkClicked.emit();
  }
}

export interface SystemLinkStyle {
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
