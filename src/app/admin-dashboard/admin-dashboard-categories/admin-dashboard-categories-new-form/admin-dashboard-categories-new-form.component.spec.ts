import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCategoriesNewFormComponent } from './admin-dashboard-categories-new-form.component';

describe('AdminDashboardCategoriesNewFormComponent', () => {
  let component: AdminDashboardCategoriesNewFormComponent;
  let fixture: ComponentFixture<AdminDashboardCategoriesNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCategoriesNewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCategoriesNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
