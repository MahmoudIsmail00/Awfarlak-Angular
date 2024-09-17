import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Brand } from '../../../../Models/brand';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../Services/store/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard-brands-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './admin-dashboard-brands-edit-form.component.html',
  styleUrl: './admin-dashboard-brands-edit-form.component.css'
})
export class AdminDashboardBrandsEditFormComponent implements OnInit{
  newBrandForm!: FormGroup;
  newBrand!:Brand;
  brandId!:number;

  constructor(
    private fb: FormBuilder,
    private productsService:ProductsService,
    private router: Router,
    private route: ActivatedRoute ,
    private snackBar :MatSnackBar
  ){
    this.newBrandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.brandId = Number(params.get('id'));
    });

    if(this.brandId){
      this.loadBrandData(this.brandId);
    }
  }
  loadBrandData(brandId: number): void {
    this.productsService.GetBrandById(brandId).subscribe((brand: Brand) => {
      this.newBrandForm.patchValue({
        name: brand.name,
      });
    });
  }
  UpdateBrand() {
    if (this.newBrandForm.valid) {
      let updatedBrand: Brand = {
        id: this.brandId,
        name: this.newBrandForm.value.name
      };
      this.productsService.UpdateExistingBrand(this.brandId, updatedBrand).subscribe(
        data => {
          this.snackBar.open('Brand has been updated', '', {
            duration: 3000,
          });
          this.router.navigate(['/adminDashboard/admin-brands']).then(() => {
            window.location.reload();
          });
        },
        error => {
          this.snackBar.open('Failed to update brand', '', {
            duration: 3000,
          });
        }
      );
    }
  }
}
