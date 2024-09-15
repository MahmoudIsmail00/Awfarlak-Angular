import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardBrandsComponent } from './admin-dashboard-brands.component';

describe('AdminDashboardBrandsComponent', () => {
  let component: AdminDashboardBrandsComponent;
  let fixture: ComponentFixture<AdminDashboardBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
