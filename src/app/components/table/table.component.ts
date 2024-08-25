import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialService } from '../../services/social.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  SystemLinkComponent,
  SystemLinkStyle,
} from '../system-link/system-link.component';
import { Icons } from '../../shared/models/icons';
import {
  SystemButtonComponent,
  SystemButtonStyle,
} from '../system-button/system-button.component';
import { UpdateFormComponent } from '../update-form/update-form.component';
import {
  CustomModalService,
  ModalSize,
} from '../../services/common/custom-modal.service';
import { take } from 'rxjs';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { CustomButtonSheetService } from '../../services/common/custom-button-sheet.service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SocialMediaModel } from '../../shared/models/social.model';
import { PascalCasePipe } from '../../shared/pipes/pascal-case.pipe';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MenuButtonItems } from '../menu-button/menu-button.component';

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
    PascalCasePipe,
    ToolbarComponent,
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

  tableHeads: TableHeader[] = [
    { key: 'socialMediaLink', label: 'Sosyal Medya Linki' },
    { key: 'socialMediaName', label: 'Sosyal Medya Adı' },
    { key: 'description', label: 'Açıklama' },
  ];

  searchValue: string = ''; // Arama işlemleri için kullanılacak
  filterValues: MenuButtonItems[]; // Filtreleme işlemleri için kullanılacak

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

  filterData(): SocialMediaModel[] {
    let filteredData = this.data;
  
    console.log('Before Filtering:', this.data);
  
    // Arama işlemi varsa filtrele
    if (this.searchValue) {
      filteredData = filteredData.filter((item) =>
        item.socialMediaName.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      console.log('After Search Filtering:', filteredData);
    }
  
    // Filtreleme işlemi varsa filtrele
    if (this.filterValues && this.filterValues.length > 0) {
      filteredData = filteredData.filter((item) =>
        this.filterValues.some(
          (filter) =>
            item.socialMediaName.toLowerCase() === filter.text.toLowerCase() &&
            filter.checked
        )
      );
      console.log('After Filter Values Filtering:', filteredData);
    } else {
      // Filtreler temizlenmişse, tüm verileri döndür
      filteredData = this.data;
    }
  
    // Verileri sıralama
    if (this.sortColumn) {
      filteredData = filteredData.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];
  
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
    }
  
    console.log('After Sorting:', filteredData);
    return filteredData;
  }

  updatePage(page: number = this.paginationInfo.currentPage) {
    this.paginationInfo.currentPage = page;
  
    // Filtrelenmiş ve sıralanmış veri setini al
    const filteredData = this.filterData();
  
    console.log('Filtered Data for Pagination:', filteredData);
  
    // Toplam sayfa sayısını güncelle
    this.paginationInfo.totalItems = filteredData.length;
    this.totalPages = Math.ceil(this.paginationInfo.totalItems / this.paginationInfo.itemsPerPage);
  
    // Sayfa başına 9 öğe olmasını sağlamak için verileri paginate et
    const startIndex: number = (page - 1) * this.paginationInfo.itemsPerPage;
    const endIndex: number = startIndex + this.paginationInfo.itemsPerPage;
  
    // Sayfayı al
    const paginatedData = filteredData.slice(startIndex, endIndex);
  
    console.log('Paginated Data:', paginatedData);
  
    // Eksik veri varsa boş öğelerle dolgu yap
    const missingItemsCount: number = this.paginationInfo.itemsPerPage - paginatedData.length;
    if (missingItemsCount > 0) {
      const dummyItems: (SocialMediaModel | null)[] = Array(missingItemsCount).fill(null);
      this.currentPageData = [...paginatedData, ...dummyItems];
    } else {
      this.currentPageData = paginatedData;
    }
  }

  getPaginatedData(
    currentPage: number,
    itemsPerPage: number
  ): SocialMediaModel[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.data.slice(startIndex, endIndex); // `socialMedia` doğru şekilde tanımlandığından emin olun
  }

  updateItemsPerPage(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let newItemsPerPage = parseInt(inputElement.value, 10);

    // Dinamik olarak hesaplanan maksimum değer
    const maxItemsPerPage = this.getMaxItemsPerPage();

    // Eğer yeni girilen değer maksimum değerden büyükse, maksimum değere sınırla
    if (newItemsPerPage > maxItemsPerPage) {
      newItemsPerPage = maxItemsPerPage;
    }

    // Eğer yeni girilen değer minimum değerden küçükse, minimum değere sınırla
    if (newItemsPerPage < 1) {
      newItemsPerPage = 1;
    }

    this.paginationInfo.itemsPerPage = newItemsPerPage;
    this.paginationInfo.currentPage = 1; // Sayfa 1'e döndür

    // Pagination bilgilerini yeniden hesapla ve sayfayı güncelle
    this.paginationInfo.totalItems = this.socialService.getTotalItems();
    this.totalPages = Math.ceil(
      this.paginationInfo.totalItems / this.paginationInfo.itemsPerPage
    );
    this.updatePage();

    // Input alanındaki değeri güncellenmiş değere göre ayarla
    inputElement.value = this.paginationInfo.itemsPerPage.toString();
  }

  getMaxItemsPerPage(): number {
    // Filtrelenmiş veri sayısını al
    const filteredDataCount = this.filterData().length;

    // Eğer filtreleme veya arama yapılmışsa filtrelenmiş veri sayısını döndür
    if (
      this.searchValue ||
      (this.filterValues && this.filterValues.length > 0)
    ) {
      return filteredDataCount;
    }

    // Eğer filtreleme veya arama yapılmamışsa toplam öğe sayısını döndür
    return this.getTotalItems();
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
    this.data = this.socialService.getSocialMedia(); // Verileri güncelle
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
          this.data = this.socialService.getSocialMedia(); // Verileri güncelle
          this.paginationInfo.totalItems = this.socialService.getTotalItems();
          this.totalPages = Math.ceil(
            this.paginationInfo.totalItems / this.paginationInfo.itemsPerPage
          );
          this.updatePage();
        }
      });
  }

  getTotalItems(): number {
    return this.socialService.getTotalItems();
  }

  handleSearchItems(searchItem: string) {
    this.searchValue = searchItem;
    console.log(searchItem);
    this.updatePage(); // Filtreleme sonrası sayfa güncellemesi
  }

  handleFilterItems(filterItems: MenuButtonItems[]) {
    this.filterValues = filterItems;
  
    // Eğer filtreler temizlendiğinde tüm verileri yüklemek gerekiyorsa:
    if (filterItems.length === 0 || filterItems.every(filter => !filter.checked)) {
      this.data = this.socialService.getSocialMedia(); // Tüm verileri tekrar yükle
    }
  
    // Filtrelerin yeniden uygulandığından emin olun
    const filteredData = this.filterData();
    this.paginationInfo.totalItems = filteredData.length;
    this.totalPages = Math.ceil(this.paginationInfo.totalItems / this.paginationInfo.itemsPerPage);
    this.updatePage(); // Sayfayı güncelle
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

export interface TableHeader {
  key: keyof SocialMediaModel;
  label: string;
}
