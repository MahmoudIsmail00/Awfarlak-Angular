import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardBrandsNewFormComponent } from './admin-dashboard-brands-new-form.component';

describe('AdminDashboardBrandsNewFormComponent', () => {
  let component: AdminDashboardBrandsNewFormComponent;
  let fixture: ComponentFixture<AdminDashboardBrandsNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardBrandsNewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardBrandsNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
