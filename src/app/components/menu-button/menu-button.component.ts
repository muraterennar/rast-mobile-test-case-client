import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PascalCasePipe } from '../../shared/pipes/pascal-case.pipe';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule, PascalCasePipe],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent {
  @Input() menus: MenuButtonItems[] = [];
  @Output() checkedItemsChange = new EventEmitter<MenuButtonItems[]>();

  constructor() {}

  onItemClicked(item: MenuButtonItems) {
    this.menus.forEach((i) => {
      i.checked = false;
    });
    item.checked = true;

    // Emit the updated list of checked items
    this.emitCheckedItems();
  }

  private emitCheckedItems() {
    const checkedItems = this.menus.filter((item) => item.checked);
    this.checkedItemsChange.emit(checkedItems);
  }
}

export interface MenuButtonItems {
  text: string;
  checked: boolean;
}
