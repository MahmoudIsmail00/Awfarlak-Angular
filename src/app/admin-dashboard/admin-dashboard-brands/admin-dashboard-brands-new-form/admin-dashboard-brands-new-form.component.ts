import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Brand } from '../../../../Models/brand';
import { ProductsService } from '../../../Services/store/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard-brands-new-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './admin-dashboard-brands-new-form.component.html',
  styleUrl: './admin-dashboard-brands-new-form.component.css'
})
export class AdminDashboardBrandsNewFormComponent implements OnInit{
  newBrandForm!: FormGroup;
  newBrand!:Brand;

  constructor(
    private fb: FormBuilder,
    private productsService:ProductsService,
    private router: Router,
    private snackBar : MatSnackBar
  ){
    this.newBrandForm = this.fb.group({
      name: ['', Validators.required]
    });

  }
  ngOnInit(): void {

  }
  CreateBrand() {
    if (this.newBrandForm.valid) {
      let newBrandItem: Brand = {
        id: 0,
        name: this.newBrandForm.value.name
      };
      console.log(newBrandItem);

      this.productsService.CreateNewBrand(newBrandItem).subscribe(
        data => {
          this.snackBar.open('Brand has been added successfully!', '', {
            duration: 3000,
          });
          this.router.navigate(['/adminDashboard/admin-brands']).then(() => {
            window.location.reload();
          });
        },
        error => {
          this.snackBar.open('Failed to add brand', '', {
            duration: 3000,
          });

        }
      );
    } else {
      this.snackBar.open('Form is invalid', '', {
        duration: 3000,
      });
    }
  }

}
