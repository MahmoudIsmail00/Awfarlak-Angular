import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductType, SubCategoryWithType } from '../../../../Models/subCategory';
import { ProductsService } from '../../../Services/store/products.service';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard-categories-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgIf],
  templateUrl: './admin-dashboard-categories-edit-form.component.html',
  styleUrl: './admin-dashboard-categories-edit-form.component.css'
})
export class AdminDashboardCategoriesEditFormComponent implements OnInit{
  newCategoryForm!: FormGroup;
  newCategory!:SubCategoryWithType;
  types:ProductType[] = [];
  subCategoryId!:number;
  constructor(
    private fb: FormBuilder,
    private productsService:ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar : MatSnackBar
  ){
    this.newCategoryForm = this.fb.group({
      name: ['', Validators.required],
      typeId: [0, Validators.required]
    });
  }
  loadCategoryData(subCategoryId: number): void {
    this.productsService.getsubcategorybyId(subCategoryId).subscribe((subcategory: SubCategoryWithType) => {
      this.newCategoryForm.patchValue({
        id: subCategoryId,
        name: subcategory.name,
        typeId: subcategory.typeId,
      });
    });
  }
  ngOnInit(): void {
    this.productsService.getAllTypes().subscribe(data => {
      this.types = data;
    });
    this.route.paramMap.subscribe(params => {
      this.subCategoryId = Number(params.get('id'));
    });

    if(this.subCategoryId){
      this.loadCategoryData(this.subCategoryId);
    }

  }
  UpdateCategory() {
    if (this.newCategoryForm.valid) {
      let updatedSub: SubCategoryWithType = {
        id: this.subCategoryId,
        name: this.newCategoryForm.value.name,
        typeId: this.newCategoryForm.value.typeId
      };

      this.productsService.UpdateExistingSubCategory(this.subCategoryId, updatedSub).subscribe(
        data => {
          this.snackBar.open('SubCategory has been updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/adminDashboard/admin-categories']).then(() => {
            window.location.reload();
          });
        },
        error => {
          this.snackBar.open('Failed to update SubCategory. Please try again.', 'Close', {
            duration: 3000,
          });
          console.error('Update failed', error);
        }
      );
    } else {
      this.snackBar.open('Form is invalid. Please check the details and try again.', 'Close', {
        duration: 3000,
      });
    }
  }
}
