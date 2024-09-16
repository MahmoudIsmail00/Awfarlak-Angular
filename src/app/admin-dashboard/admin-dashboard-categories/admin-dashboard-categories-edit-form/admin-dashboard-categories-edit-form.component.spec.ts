import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCategoriesEditFormComponent } from './admin-dashboard-categories-edit-form.component';

describe('AdminDashboardCategoriesEditFormComponent', () => {
  let component: AdminDashboardCategoriesEditFormComponent;
  let fixture: ComponentFixture<AdminDashboardCategoriesEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCategoriesEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCategoriesEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
