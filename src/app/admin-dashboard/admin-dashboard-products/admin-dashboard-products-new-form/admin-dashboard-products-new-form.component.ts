import { Product } from './../../../../Models/product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../Services/store/products.service';
import { Brand } from '../../../../Models/brand';
import { SubCategory } from '../../../../Models/subCategory';
import { ProductWithSpecsCreationDTO } from '../../../../Models/productWithSpecs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-products-new-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './admin-dashboard-products-new-form.component.html',
  styleUrl: './admin-dashboard-products-new-form.component.css'
})
export class AdminDashboardProductsNewFormComponent implements OnInit{
  newProductForm: FormGroup;
  brands:Brand[]=[];
  subcategories:SubCategory[] = [];
  newProduct!:ProductWithSpecsCreationDTO;

  constructor(
    private fb: FormBuilder,
    private productsService:ProductsService,
    private router: Router
  ){
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      pictureUrl: ['', Validators.required],
      storage: ['', Validators.required],
      ram: ['', Validators.required],
      cpu: ['', Validators.required],
      gpu: ['', Validators.required],
      screen: ['', Validators.required],
      color: ['', Validators.required],
      keyboard: ['', Validators.required],
      warranty: ['', Validators.required],
      panel: ['', Validators.required],
      touchscreen: [false],
      quantity: [0, Validators.required],
      brandId: [0, Validators.required],
      subCategoryId: [0, Validators.required]
    });
  }
  ngOnInit(): void {
    this.productsService.getAllBrands().subscribe(data=>{this.brands=data});
    this.productsService.getAllSubCategories().subscribe(data=>{this.subcategories=data});
  }
  CreateProduct(){
    if (this.newProductForm.valid) {
      // Map form values to the Product object
      let newprod: ProductWithSpecsCreationDTO = {
        id: 0,
        name: this.newProductForm.value.name,
        description: this.newProductForm.value.description,
        price: this.newProductForm.value.price,
        pictureUrl: this.newProductForm.value.pictureUrl,
        storage: this.newProductForm.value.storage || null,
        ram: this.newProductForm.value.ram || null,
        cpu: this.newProductForm.value.cpu || null,
        gpu: this.newProductForm.value.gpu || null,
        screen: this.newProductForm.value.screen || null,
        color: this.newProductForm.value.color || null,
        keyboard: this.newProductForm.value.keyboard || null,
        warranty: this.newProductForm.value.warranty || null,
        panel: this.newProductForm.value.panel || null,
        touchscreen: false,
        quantity: this.newProductForm.value.quantity,
        subCategoryId: this.newProductForm.value.subCategoryId,
        brandId: this.newProductForm.value.brandId
      };

      // Now you can use this product object to make an API call or further processing
      console.log(newprod);
      // e.g., pass this to a service to create a product
      this.productsService.createNewProduct(newprod).subscribe(data=>{});
      alert('Product Has been added Successfully!')
      this.router.navigate(['/adminDashboard/admin-products']).then(()=>{
        window.location.reload();
      });
    } else {
      alert("Form is invalid");
    }
  }
}
