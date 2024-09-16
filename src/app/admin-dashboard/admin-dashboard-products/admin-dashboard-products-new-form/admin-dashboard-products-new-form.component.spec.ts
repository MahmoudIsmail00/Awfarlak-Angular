import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardProductsNewFormComponent } from './admin-dashboard-products-new-form.component';

describe('AdminDashboardProductsNewFormComponent', () => {
  let component: AdminDashboardProductsNewFormComponent;
  let fixture: ComponentFixture<AdminDashboardProductsNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardProductsNewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardProductsNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
