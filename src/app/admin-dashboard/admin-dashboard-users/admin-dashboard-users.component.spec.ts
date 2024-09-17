import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardUsersComponent } from './admin-dashboard-users.component';

describe('AdminDashboardUsersComponent', () => {
  let component: AdminDashboardUsersComponent;
  let fixture: ComponentFixture<AdminDashboardUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
