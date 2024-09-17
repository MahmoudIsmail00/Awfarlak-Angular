import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardUsersEditUserComponent } from './admin-dashboard-users-edit-user.component';

describe('AdminDashboardUsersEditUserComponent', () => {
  let component: AdminDashboardUsersEditUserComponent;
  let fixture: ComponentFixture<AdminDashboardUsersEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardUsersEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardUsersEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
