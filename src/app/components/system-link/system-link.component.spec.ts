import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLinkComponent } from './system-link.component';

describe('SystemLinkComponent', () => {
  let component: SystemLinkComponent;
  let fixture: ComponentFixture<SystemLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
