import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemButtonComponent } from './system-button.component';

describe('SystemButtonComponent', () => {
  let component: SystemButtonComponent;
  let fixture: ComponentFixture<SystemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
