import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialService } from '../../services/social.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SystemLinkComponent } from '../system-link/system-link.component';
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
import { PaginateModal } from '../../shared/models/paginateModal';
import { MatDialogRef } from '@angular/material/dialog';
import { SocialMediaTypeModal } from '../../shared/models/socialMediaType.modal';
import { LinkDomainPipe } from "../../shared/pipes/link-domain.pipe";
import { LinkColorDirective } from '../../shared/directives/link-color.directive';
import { LinkRedirectDirective } from '../../shared/directives/link-redirect.directive';

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
    LinkDomainPipe,
    LinkColorDirective,
    LinkRedirectDirective
],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  deleteIcon: string = Icons.delete;
  updateIcon: string = Icons.update;
  socialData: SocialMediaModel;

  socailMediaDatas: SocialMediaModel[] = [];
  private currentModalId: string | null;
  
  pageInfo: PaginateModal<SocialMediaModel>;

  sortDirection: 'asc' | 'desc' = 'asc'; // Default sıralama değerleri
  sortColumn: keyof SocialMediaModel = 'SocialMediaLink'; // Default sıralama kolonu

  tableHeads: TableHeader[] = [
    { key: 'SocialMediaLink', label: 'Sosyal Medya Linki' },
    { key: 'SocialMediaName', label: 'Sosyal Medya Adı' },
    { key: 'Description', label: 'Açıklama' },
  ];

  searchValue: string = ''; // Arama işlemleri için kullanılacak
  filterValues: SocialMediaTypeModal[]; // Filtreleme işlemleri için kullanılacak

  constructor(
    private socialService: SocialService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customDialog: CustomModalService,
    private customButtonSheet: CustomButtonSheetService
  ) {}

  ngOnInit(): void {
    this.getSocialMedia();

    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.openUpdateDialog(id); // ID varsa güncelleme diyalogunu aç
      }
    });
  }

  async getSocialMedia(page: number = 1, limit: number = 9): Promise<void> {
    await this.socialService.getSocialMedia(page, limit, (response) => {
      const paginateData: PaginateModal<SocialMediaModel> = response;

      this.socailMediaDatas = paginateData.docs;
      this.pageInfo = paginateData;

      console.log(this.pageInfo);
    });
  }

  async getSocialMediarSearch(searchText: string) {
    await this.socialService.getSocialMediaBySearch(searchText, (response) => {
      this.socailMediaDatas = response.docs;
      this.pageInfo = response;
    });
  }

  // Verileri belirtilen sütuna göre sıralar
  sortData(column: keyof SocialMediaModel): void {
    const newDirection =
      this.sortColumn === column
        ? this.sortDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';

    this.socailMediaDatas = this.socailMediaDatas.sort((a, b) => {
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
  }

  // Sayfa numarasını değiştirmek için kullanılır
  changePage(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // event.target'ı HTMLInputElement olarak tip dönüşümü yapıyoruz
    const value = Number(inputElement.value);

    if (value > 0 && value <= this.pageInfo.totalPages) {
      this.getSocialMedia(value);
    } else {
      inputElement.value = this.pageInfo.page.toString(); // Geçersiz sayfa numarasını geri al
    }
  }

  // Sayfa limitini değiştirmek için kullanılır
  chanceLimit(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = Number(inputElement.value);

    if (value > 0 && value <= this.pageInfo.totalDocs) {
      this.pageInfo.limit = value;
      this.getSocialMedia(1, value); // Yeni limit ile verileri al
    } else {
      inputElement.value = this.pageInfo.limit.toString(); // Geçersiz limit değerini geri al
    }
  }

  nextPage(): void {
    if (this.pageInfo.hasNextPage) {
      console.log(this.pageInfo);
      this.getSocialMedia(this.pageInfo.nextPage);
    }
    else
    console.log("pageInfoYok");
  }

  prevPage(): void {
    if (this.pageInfo.hasPrevPage) {
      this.getSocialMedia(this.pageInfo.prevPage);
    }
  }

   // URL'yi günceller ve ardından güncelleme diyalogunu açar
  handleNavigation(id: number): void {
    this.router
      .navigate(['home', id.toString()], { queryParamsHandling: 'merge' })
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

    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      this.socialData = data['socialData'];
      if (this.socialData) {
        const dialogRef = this.customDialog.openDialog<SocialMediaModel>(
          UpdateFormComponent,
          {
            title: 'Hesap Güncelle',
            width: ModalSize.Medium,
            height: 'auto',
          },
          this.socialData
        );

        // Dialog kapatıldığında
        dialogRef.afterClosed().subscribe((result) => {
          if (result === true) {
            this.getSocialMedia(); // Verileri güncelle
            this.router.navigate(['home']); // URL'yi güncelle
          }
        });
      }
    });

    this.currentModalId = id;
  }

  openDeleteSheet(item: SocialMediaModel): void {
    this.customButtonSheet
      .openButtonSheet(DeleteButtonComponent, { item })
      .subscribe(async (result) => {
        if (result) {
          // ---------------- Silme işlemi
          await this.socialService.getSocialMediaById(
            item._id.toString(),
            async (response) => {
              await this.socialService.deleteSocialMedia(
                `${response._id}`,
                (response) => {}
              );
              this.getSocialMedia(); // Verileri güncelle
            }
          );
        }
      });
  }

  handleSearchItems(searchItem: string): void {
    this.searchValue = searchItem.toLowerCase(); // Arama değerini küçük harfe çeviriyoruz.

    console.log(this.searchValue);

    if (this.searchValue !== '') {
      this.getSocialMediarSearch(this.searchValue);
    } else {
      this.getSocialMedia();
    }
  }

  handleFilterItems(filterItems: SocialMediaTypeModal[]) {
    this.filterValues = filterItems;

    // Eğer filtreler temizlendiğinde tüm verileri yüklemek gerekiyorsa:
    if (
      filterItems.length === 0 ||
      filterItems.every((filter) => !filter.checked)
    ) {
      this.getSocialMedia();
    } else {
      let filterValue = this.filterValues[0].name;

      // Filtreleme işlemleri
      this.getSocialMediarSearch(filterValue);
    }
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

  // TableComponent'te yanıtları işlemek için metodlar ekleyin
  updateTableBasedOnResponse(response: string) {
    if (response === 'positive') {
      // Tabloyu güncelle
      this.getSocialMedia();
    }
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
