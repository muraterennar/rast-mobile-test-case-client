import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  constructor(private matDialog: MatDialog) {}

  openDialog<T = any>(component: any, config: Partial<ModalConfig>, data?: T): void {
    this.matDialog.open(component, {
      data: {
        title: config.title,
        datas: data ?? null,
      },
      width: config.width,
      height: config.height,
      position: config.position,
      panelClass: config.panelClass,
    });
  }

  closeDialog(): void {
    this.matDialog.closeAll();
  }
}

export enum ModalSize {
  Small = '300px',
  Medium = '500px',
  Large = '800px',
}

export interface ModalConfig {
  title: string;
  width: ModalSize;
  height?: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  panelClass?: string;
}
