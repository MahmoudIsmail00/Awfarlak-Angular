import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCategoriesComponent } from './admin-dashboard-categories.component';

describe('AdminDashboardCategoriesComponent', () => {
  let component: AdminDashboardCategoriesComponent;
  let fixture: ComponentFixture<AdminDashboardCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
