import { TestBed } from '@angular/core/testing';

import { CustomButtonSheetService } from './custom-button-sheet.service';

describe('CustomButtonSheetService', () => {
  let service: CustomButtonSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomButtonSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
