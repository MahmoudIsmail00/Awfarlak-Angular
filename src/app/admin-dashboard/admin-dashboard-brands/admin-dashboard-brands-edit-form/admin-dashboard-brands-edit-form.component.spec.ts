import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardBrandsEditFormComponent } from './admin-dashboard-brands-edit-form.component';

describe('AdminDashboardBrandsEditFormComponent', () => {
  let component: AdminDashboardBrandsEditFormComponent;
  let fixture: ComponentFixture<AdminDashboardBrandsEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardBrandsEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardBrandsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
