import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../Services/store/products.service';
import { Brand } from '../../../../Models/brand';
import { SubCategory } from '../../../../Models/subCategory';
import { ProductWithSpecsCreationDTO } from '../../../../Models/productWithSpecs';
import { HttpErrorResponse } from '@angular/common/http';
import { validate } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard-products-new-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-dashboard-products-new-form.component.html',
  styleUrls: ['./admin-dashboard-products-new-form.component.css']
})
export class AdminDashboardProductsNewFormComponent implements OnInit {
  newProductForm: FormGroup;
  brands: Brand[] = [];
  subcategories: SubCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router ,
    private snackBar : MatSnackBar
  ) {
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      pictureURl:['noContent', Validators.required],
      imageFile: [null, Validators.required],
      storage: [null],
      ram: [null],
      cpu: [null],
      gpu: [null],
      screen: [null],
      color: [null],
      keyboard: [null],
      warranty: [null],
      panel: [null],
      touchscreen: [false],
      quantity: [0, [Validators.required, Validators.min(0)]],
      brandId: [null, Validators.required],
      subCategoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.productsService.getAllBrands().subscribe(data => this.brands = data);
    this.productsService.getAllSubCategories().subscribe(data => this.subcategories = data);
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.newProductForm.patchValue({
      imageFile: file
    });
  }

  createProduct() {
    if (this.newProductForm.valid) {
      const formData = new FormData();
      const controls = this.newProductForm.controls;
      const imageFile = controls['imageFile'].value;
      if (imageFile) {
        formData.append('imageFile', imageFile, imageFile.name);
      }
      Object.keys(controls).forEach(key => {
        const control = controls[key];
        if (control.value !== null && control.value !== undefined) {
          if (key !== 'imageFile') {
            formData.append(key, control.value.toString());
          }
        }
      });
      if (parseInt(formData.get('quantity') as string, 10) < 1) {
        this.snackBar.open('Quantity must be at least 1', 'Close', {
          duration: 3000,
        });
        return;
      }

      formData.forEach((value, key) => {
        // console.log(key, value);
      });

      this.productsService.createNewProduct(formData).subscribe({
        next: (response) => {
          // console.log('Product created successfully:', response);
          this.snackBar.open('Product has been added successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          this.router.navigate(['/adminDashboard/admin-products']);
        },
        error: (error: HttpErrorResponse) => {
          // console.error('Error creating product:', error);
          if (error.error instanceof ErrorEvent) {
            this.snackBar.open(`An error occurred: ${error.error.message}`, 'Close', {
              duration: 3000,
            });
          } else {
            this.snackBar.open(`Server returned code ${error.status}, error message: ${JSON.stringify(error.error)}`, 'Close', {
              duration: 3000,
            });
          }
        }
      });
    } else {
      // console.log('Form is invalid:', this.newProductForm.errors);
      this.snackBar.open('Form is invalid. Please check all required fields.', 'Close', {
        duration: 3000,
      });
      Object.keys(this.newProductForm.controls).forEach(key => {
        const control = this.newProductForm.get(key);
        if (control?.invalid) {
          // console.log(`${key} is invalid:`, control.errors);
        }
      });
    }
  }

}
