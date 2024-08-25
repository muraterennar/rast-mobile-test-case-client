import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomLocalService {
  constructor() {}

  // Verileri getime
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  // Verileri setleme
  setItem<T>(key: string, data: T): T {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }

  // Verileri silme
  removeLocalData(key: string): void {
    localStorage.removeItem(key);
  }

  // Tüm verileri silme
  clearLocalData(): void {
    localStorage.clear();
  }

}
