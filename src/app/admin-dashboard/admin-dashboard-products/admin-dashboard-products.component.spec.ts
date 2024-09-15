import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardProductsComponent } from './admin-dashboard-products.component';

describe('AdminDashboardProductsComponent', () => {
  let component: AdminDashboardProductsComponent;
  let fixture: ComponentFixture<AdminDashboardProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
