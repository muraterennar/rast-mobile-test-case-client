import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialService } from '../../services/social.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SystemLinkComponent, SystemLinkStyle } from '../system-link/system-link.component';
import { Icons } from '../../shared/models/icons';
import { SystemButtonComponent, SystemButtonStyle } from '../system-button/system-button.component';
import { UpdateFormComponent } from '../update-form/update-form.component';
import { CustomModalService, ModalSize } from '../../services/common/custom-modal.service';
import { take } from 'rxjs';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { CustomButtonSheetService } from '../../services/common/custom-button-sheet.service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SocialMediaModel } from '../../shared/models/social.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SystemLinkComponent,
    SystemButtonComponent,
    DeleteButtonComponent,
    MatBottomSheetModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'], // Fix the typo from styleUrl to styleUrls
})
export class TableComponent implements OnInit {
  deleteIcon: string = Icons.delete;
  updateIcon: string = Icons.update;
  socialData: SocialMediaModel;

  data: SocialMediaModel[] = [];
  private currentModalId: string | null;

  currentPageData: SocialMediaModel[] = [];
  paginationInfo = {
    currentPage: 1,
    itemsPerPage: 9,
    totalItems: 0,
  };
  totalPages: number = 0;

  constructor(
    private socialService: SocialService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customDialog: CustomModalService,
    private customButtonSheet: CustomButtonSheetService
  ) {}

  ngOnInit(): void {
    this.data = this.socialService.getSocialMedia();
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.openUpdateDialog(id);
      }
    });

    this.paginationInfo.totalItems = this.socialService.getTotalItems();
    this.totalPages = Math.ceil(
      this.paginationInfo.totalItems / this.paginationInfo.itemsPerPage
    );
    this.updatePage();
  }

  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction
  sortColumn: keyof SocialMediaModel = 'socialMediaLink'; // Default sort column

  sortData(column: keyof SocialMediaModel): void {
    const newDirection =
      this.sortColumn === column
        ? this.sortDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';

    this.data = this.data.sort((a, b) => {
      if (typeof a[column] === 'string' && typeof b[column] === 'string') {
        return newDirection === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      } else if (
        typeof a[column] === 'number' &&
        typeof b[column] === 'number'
      ) {
        return newDirection === 'asc'
          ? a[column] - b[column]
          : b[column] - a[column];
      }
      return 0;
    });

    this.sortDirection = newDirection;
    this.sortColumn = column;

    // Güncellenmiş sıralı verilerle mevcut sayfayı yeniden ayarla
    this.updatePage(this.paginationInfo.currentPage);
  }

  handleNavigation(id: number): void {
    // URL'yi güncelle ve ardından modalı aç
    this.router
      .navigate(['home', id], { queryParamsHandling: 'merge' })
      .then(() => {
        this.openUpdateDialog(id.toString());
      });
  }

  openUpdateDialog(id: string): void {
    // Önce açık olan modal varsa kapat
    if (this.currentModalId) {
      this.customDialog.closeDialog();
      this.currentModalId = null; // Modal kapandıktan sonra ID'yi sıfırla
    }

    // Modalı aç
    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      this.socialData = data['socialData'];
      if (this.socialData) {
        this.customDialog.openDialog<SocialMediaModel>(
          UpdateFormComponent,
          {
            title: 'Hesap Güncelle',
            width: ModalSize.Medium,
            height: 'auto',
          },
          this.socialData
        );
        this.currentModalId = id; // Açık olan modal ID'sini güncelle
      }
    });
  }

  updatePage(page: number = this.paginationInfo.currentPage) {
    this.paginationInfo.currentPage = page;
  
    // Bu verileri socialService'den almak gerekebilir
    const paginatedData = this.socialService.getPaginatedData(
      this.paginationInfo.currentPage,
      this.paginationInfo.itemsPerPage
    );
  
    // `currentPageData`yı sınırla
    this.currentPageData = paginatedData;
  }

  getPaginatedData(currentPage: number, itemsPerPage: number): SocialMediaModel[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.data.slice(startIndex, endIndex); // `socialMedia` doğru şekilde tanımlandığından emin olun
  }

  updateItemsPerPage(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newItemsPerPage = parseInt(inputElement.value, 10);
    
    // Servisten alınan maksimum değer
    const maxItemsPerPage = this.socialService.getTotalItems();
  
    if (newItemsPerPage > 0  && newItemsPerPage <= maxItemsPerPage) {
      // Kullanıcının girdiği değeri maksimum değerle sınırla
      this.paginationInfo.itemsPerPage = Math.min(newItemsPerPage, maxItemsPerPage);
      this.paginationInfo.currentPage = 1; // Sayfa 1'e döndür
  
      // Pagination bilgilerini yeniden hesapla ve sayfayı güncelle
      this.paginationInfo.totalItems = this.socialService.getTotalItems();
      this.totalPages = Math.ceil(
        this.paginationInfo.totalItems / this.paginationInfo.itemsPerPage
      );
      this.updatePage();
    }
  
    // Input alanındaki değeri maksimum değere göre güncelle
    inputElement.value = this.paginationInfo.itemsPerPage.toString();
  }

  onPageChange(event: Event | number) {
    let pageNumber: number;

    if (typeof event === 'number') {
      pageNumber = event;
    } else {
      const inputElement = event.target as HTMLInputElement;
      pageNumber = parseInt(inputElement.value, 10);
    }

    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.paginationInfo.currentPage = pageNumber;
      this.updatePage(pageNumber);
    }
  }
  
  addMoreData(newData: SocialMediaModel[]) {
    this.socialService.addData(newData);
    this.paginationInfo.totalItems = this.socialService.getTotalItems();
    this.totalPages = Math.ceil(
      this.paginationInfo.totalItems / this.paginationInfo.itemsPerPage
    );
    this.updatePage();
  }

  openDeleteSheet(item: SocialMediaModel): void {
    this.customButtonSheet
      .openButtonSheet(DeleteButtonComponent, { item })
      .subscribe((result) => {
        if (result) {
          // Silme işlemi
          this.socialService.deleteSocialMedia(item.id);
        }
      });
  }

  getTotalItems():number{
    return this.socialService.getTotalItems();
  }

  setDeleteSystemButtonStyle(): SystemButtonStyle {
    return {
      padding: 'px-1 py-0.5',
      color: 'text-white',
      background: 'bg-primary',
      borderRadius: 'rounded',
      fontSize: 'text-sm',
    };
  }

  setUpdateSystemLinkStyle(): SystemButtonStyle {
    return {
      padding: 'px-1 py-0.5',
      color: 'text-primary',
      background: 'bg-white',
      borderRadius: 'rounded',
      fontSize: 'text-sm',
    };
  }
}