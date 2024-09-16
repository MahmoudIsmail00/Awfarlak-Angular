import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardAccessComponent } from './admin-dashboard-access.component';

describe('AdminDashboardAccessComponent', () => {
  let component: AdminDashboardAccessComponent;
  let fixture: ComponentFixture<AdminDashboardAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
