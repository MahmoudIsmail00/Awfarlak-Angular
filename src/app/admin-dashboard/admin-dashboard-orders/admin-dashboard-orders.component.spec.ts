import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardOrdersComponent } from './admin-dashboard-orders.component';

describe('AdminDashboardOrdersComponent', () => {
  let component: AdminDashboardOrdersComponent;
  let fixture: ComponentFixture<AdminDashboardOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
