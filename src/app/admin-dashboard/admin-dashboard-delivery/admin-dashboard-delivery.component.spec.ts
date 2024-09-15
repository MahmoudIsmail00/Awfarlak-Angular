import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardDeliveryComponent } from './admin-dashboard-delivery.component';

describe('AdminDashboardDeliveryComponent', () => {
  let component: AdminDashboardDeliveryComponent;
  let fixture: ComponentFixture<AdminDashboardDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
