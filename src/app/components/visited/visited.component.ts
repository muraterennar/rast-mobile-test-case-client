import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SocialMediaModel } from '../../shared/models/social.model';
import { CustomLocalService } from '../../services/common/custom-local.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { VisitedService } from '../../services/visited.service';

@Component({
  selector: 'app-visited',
  standalone: true,
  imports: [MatDividerModule, MatListModule, CommonModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './visited.component.html',
  styleUrl: './visited.component.css',
})
export class VisitedComponent implements OnInit {

  constructor(private visitedService:VisitedService) {}
  
  ngOnInit(): void {
    this.visitedItems = this.visitedService.getVisitedItems();
  }

  visitedItems:SocialMediaModel[] = [];

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
