import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductType, SubCategoryWithType } from '../../../../Models/subCategory';
import { ProductsService } from '../../../Services/store/products.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-categories-new-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './admin-dashboard-categories-new-form.component.html',
  styleUrl: './admin-dashboard-categories-new-form.component.css'
})
export class AdminDashboardCategoriesNewFormComponent implements OnInit{
  newCategoryForm!: FormGroup;
  newCategory!:SubCategoryWithType;
  types:ProductType[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService:ProductsService,
    private router: Router
  ){
    this.newCategoryForm = this.fb.group({
      name: ['', Validators.required],
      typeId: [0, Validators.required]
    });

  }

  ngOnInit(): void {
    this.productsService.getAllTypes().subscribe(data=>{this.types = data})
  }
  CreateCategory(){
    if (this.newCategoryForm.valid) {
      let newCategory: SubCategoryWithType = {
        id: 0,
        name: this.newCategoryForm.value.name,
        typeId: this.newCategoryForm.value.typeId
      };
      console.log(newCategory);

      this.productsService.createNewSubCategory(newCategory).subscribe(data=>{});
      alert('SubCategory Has been added Successfully!');
      this.router.navigate(['/adminDashboard/admin-categories']).then(()=>{
        window.location.reload();
      });
    } else {
      alert("Form is invalid");
    }
  }
}
