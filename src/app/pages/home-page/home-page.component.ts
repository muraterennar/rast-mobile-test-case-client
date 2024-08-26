import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SystemButtonComponent } from '../../components/system-button/system-button.component';
import { TableComponent } from '../../components/table/table.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VisitedComponent } from '../../components/visited/visited.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    CommonModule,
    SystemButtonComponent,
    TableComponent,
    ToolbarComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    VisitedComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
