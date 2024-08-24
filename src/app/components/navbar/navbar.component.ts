import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SystemButtonComponent, SystemButtonStyle } from '../system-button/system-button.component';
import { SystemLinkComponent } from '../system-link/system-link.component';
import { Observable } from 'rxjs';
import { Icons } from '../../shared/models/icons';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, SystemButtonComponent, SystemLinkComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuDiv') menuDiv: ElementRef<HTMLButtonElement>;
  @Input() navbar: NavbarComponent;

  imageUrl: string =
    'https://firebasestorage.googleapis.com/v0/b/file-upload-firebase-d3899.appspot.com/o/test%2Frast_logo.png?alt=media&token=3fafffc2-674c-4e43-958a-11a23ad20d58';

  categories: Observable<Category[]>;
  menuOpen = false;

  youtubeIcon = Icons.youtube;
  instagramIcon = Icons.instagram;
  linkedinIcon = Icons.linkedin;
  behanceIcon = Icons.behance;
  hambergerIcon = Icons.hamberger;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
    if (this.navbar) console.log(this.navbar);
  }

  getCategories() {
    this.categories = this.categoryService.getCategories();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    console.log('Menu state:', this.menuOpen); // Menü durumunu izlemek için
  }

  setSystemButtonStyle(): SystemButtonStyle | any {
    return {
      padding: 'px-1 py-0.5',
      color: 'text-white',
      background: 'bg-primary',
      borderRadius: 'rounded',
      fontSize: 'text-xs',
    };
  }

  setHambergurButtonStyle(): SystemButtonStyle | any {
    return {
      padding: 'px-2.5 py-1',
      color: 'text-white',
      background: 'bg-primary',
      borderRadius: 'rounded',
      fontSize: 'text-lg',
      customStyle: 'lg:hidden',
    };
  }
}