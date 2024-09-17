import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../Services/store/products.service';
import { Brand } from '../../../../Models/brand';
import { SubCategory } from '../../../../Models/subCategory';
import { ProductWithSpecsCreationDTO } from '../../../../Models/productWithSpecs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard-products-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink , NgIf],
  templateUrl: './admin-dashboard-products-edit-form.component.html',
  styleUrls: ['./admin-dashboard-products-edit-form.component.css']
})
export class AdminDashboardProductsEditFormComponent implements OnInit {
  editProductForm: FormGroup;
  brands: Brand[] = [];
  subcategories: SubCategory[] = [];
  productId: number | null = null;
  existingImageUrl: string = '';
  imageFile?: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute ,
     private snackBar : MatSnackBar
  ) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      pictureUrl: [''],
      imageFile: [null],
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


    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(productId: number): void {
    this.productsService.getProductWithSpecs(productId).subscribe((product) => {
      this.existingImageUrl = product.pictureUrl;
      this.editProductForm.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
        pictureUrl: product.pictureUrl,
        storage: product.storage,
        ram: product.ram,
        cpu: product.cpu,
        gpu: product.gpu,
        screen: product.screen,
        color: product.color,
        keyboard: product.keyboard,
        warranty: product.warranty,
        panel: product.panel,
        touchscreen: product.touchscreen,
        quantity: product.quantity,
        brandId: this.brands.find(b => b.name === product.productBrandName)?.id,
        subCategoryId: this.subcategories.find(s => s.name === product.productSubCategoryName)?.id
      });
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
    } else {
      this.imageFile = null;
    }
  }

  updateProduct() {
    
    if (this.editProductForm.valid && this.productId !== null) {
      const formData = new FormData();
      const controls = this.editProductForm.controls;
      Object.keys(controls).forEach(key => {
        const control = controls[key];
        if (control.value !== null && control.value !== undefined) {
          if (key !== 'imageFile') {
            formData.append(key, control.value.toString());
          }
        }
      });
      if (this.imageFile) {
        formData.append('ImageFile', this.imageFile, this.imageFile.name);
      } else {
        // If no new image is provided, append the existing image URL if needed
        // formData.append('PictureUrl', this.existingImageUrl);
      }

      this.productsService.UpdateExistingProduct(this.productId, formData).subscribe({
        next: () => {
          this.snackBar.open('Product has been updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/adminDashboard/admin-products']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating product:', error);
          this.snackBar.open(`Server returned code ${error.status}, error message: ${JSON.stringify(error.error)}`, 'Close', {
            duration: 3000,
          });
        }
      });
    } else {
      console.log('Form is invalid:', this.editProductForm.errors);
      this.snackBar.open('Form is invalid. Please check all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

}


