import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  constructor(private matDialog: MatDialog) {}

  // Yeni bir dialog açar ve belirli bir bileşeni görüntüler.
  // `T` tipi, dialoga gönderilen verinin türünü belirtir.
  openDialog<T = any>(component: any, config: Partial<ModalConfig>, data?: T) {
    const dialogRef = this.matDialog.open(component, {
      data: {
        title: config.title, // Dialog başlığını ayarlar.
        datas: data ?? null, // Dialoga gönderilen veriyi ayarlar.
      },
      width: config.width, // Dialog genişliğini ayarlar.
      height: config.height, // Dialog yüksekliğini ayarlar.
      position: config.position, // Dialogun ekran üzerindeki pozisyonunu ayarlar.
      panelClass: config.panelClass, // Özel CSS sınıfı ekler.
    });

    return dialogRef; // Açılan dialogun referansını döndürür.
  }

  // Açık olan tüm dialogları kapatır.
  closeDialog(): void {
    this.matDialog.closeAll();
  }
}

// Modal pencereleri için önceden tanımlanmış boyut seçenekleri.
export enum ModalSize {
  Small = '300px',
  Medium = '500px',
  Large = '800px',
}

// Modal yapılandırması için arayüz.
// Bu arayüz, modal başlığı, boyutları, pozisyonu ve özel CSS sınıfları gibi özellikleri tanımlar.
export interface ModalConfig {
  title: string;  // Modal başlığı.
  width: ModalSize;  // Modal genişliği.
  height?: string;  // Modal yüksekliği, isteğe bağlı.
  position?: { top?: string; left?: string; right?: string; bottom?: string };  // Modal pozisyonu, isteğe bağlı.
  panelClass?: string;  // Özel CSS sınıfı, isteğe bağlı.
}
