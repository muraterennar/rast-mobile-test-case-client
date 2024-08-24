import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Category } from '../shared/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categiries: Category[] = [
,
  ];
  // Kategori listesi için BehaviorSubject kullanıyoruz
  private categoriesSubject = new BehaviorSubject<Category[]>([
    {
      id: 1,
      name: 'Hakkımızda',
      link: 'https://www.rastmobile.com/tr/hakkimizda',
    },
    {
      id: 2,
      name: 'Jüri - Yarışma Yazılımı',
      link: 'https://www.rastmobile.com/tr/urunler/juri-yarisma-yazilimi',
    },
    {
      id: 3,
      name: 'Word Ninja',
      link: 'https://www.rastmobile.com/tr/urunler/word-ninja',
    },
    {
      id: 4,
      name: 'Word Pyramids',
      link: 'https://www.rastmobile.com/tr/urunler/word-pyramids',
    }
  ]);
  categories: Observable<Category[]> = this.categoriesSubject.asObservable();

  getCategories(): Observable<Category[]> {
    return this.categories;
  }

  getCategoryById(id: number): Observable<Category> {
    return this.categories.pipe(
      map((categories) => categories.find((category) => category.id === id))
    );
  }

  getCategoryByLink(link: string): Observable<Category> {
    return this.categories.pipe(
      map((categories) => categories.find((category) => category.link === link))
    );
  }

  addCategory(category: Category): void {
    const categories = this.categoriesSubject.getValue();
    this.categoriesSubject.next([...categories, category]);
  }

  updateCategory(category: Category): void {
    const categories = this.categoriesSubject.getValue();
    const index = categories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      categories[index] = category;
      this.categoriesSubject.next([...categories]);
    }
  }

  deleteCategory(id: number): void {
    const categories = this.categoriesSubject.getValue();
    const updatedCategories = categories.filter((category) => category.id !== id);
    this.categoriesSubject.next(updatedCategories);
  }
}