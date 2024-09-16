import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardProductsEditFormComponent } from './admin-dashboard-products-edit-form.component';

describe('AdminDashboardProductsEditFormComponent', () => {
  let component: AdminDashboardProductsEditFormComponent;
  let fixture: ComponentFixture<AdminDashboardProductsEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardProductsEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardProductsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
