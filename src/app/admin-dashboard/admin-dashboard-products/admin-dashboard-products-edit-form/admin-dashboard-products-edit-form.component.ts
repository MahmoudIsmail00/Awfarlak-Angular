import { ProductWithSpecs } from './../../../../Models/productWithSpecs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Brand } from '../../../../Models/brand';
import { SubCategory } from '../../../../Models/subCategory';
import { ProductWithSpecsCreationDTO } from '../../../../Models/productWithSpecs';
import { ProductsService } from '../../../Services/store/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-products-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './admin-dashboard-products-edit-form.component.html',
  styleUrl: './admin-dashboard-products-edit-form.component.css'
})
export class AdminDashboardProductsEditFormComponent implements OnInit {

  oldProductForm: FormGroup;
  brands: Brand[] = [];
  subcategories: SubCategory[] = [];
  oldProduct!: ProductWithSpecsCreationDTO;
  productId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.oldProductForm = this.fb.group({
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
  loadProductData(productId: number): void {
    this.productsService.getProductWithSpecs(productId).subscribe((product: ProductWithSpecs) => {
      this.oldProductForm.patchValue({
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
        brandId: this.brands.find(x=>x.name == product.productBrandName)?.id,
        subCategoryId: this.subcategories.find(x=>x.name == product.productSubCategoryName)?.id
      });
      console.log(this.oldProductForm.value);

    });
  }
  ngOnInit(): void {
    this.productsService.getAllBrands().subscribe(data => {
      this.brands = data;
    });
    this.productsService.getAllSubCategories().subscribe(data => {
      this.subcategories = data;
    });

    // Get the product ID from the route and fetch the product if editing
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id')); // Assuming the product ID is passed in the route

      console.log(this.productId);

      if (this.productId) {
        this.loadProductData(this.productId);
      }
    });

  }
  UpdateProduct(){
    if (this.oldProductForm.valid) {
      // Map form values to the Product object
      let updatedprod: ProductWithSpecsCreationDTO = {
        id: 0,
        name: this.oldProductForm.value.name,
        description: this.oldProductForm.value.description,
        price: this.oldProductForm.value.price,
        pictureUrl: this.oldProductForm.value.pictureUrl,
        storage: this.oldProductForm.value.storage || null,
        ram: this.oldProductForm.value.ram || null,
        cpu: this.oldProductForm.value.cpu || null,
        gpu: this.oldProductForm.value.gpu || null,
        screen: this.oldProductForm.value.screen || null,
        color: this.oldProductForm.value.color || null,
        keyboard: this.oldProductForm.value.keyboard || null,
        warranty: this.oldProductForm.value.warranty || null,
        panel: this.oldProductForm.value.panel || null,
        touchscreen: false,
        quantity: this.oldProductForm.value.quantity,
        subCategoryId: this.oldProductForm.value.subCategoryId,
        brandId: this.oldProductForm.value.brandId
      };

    this.productsService.UpdateExistingProduct(this.productId,updatedprod).subscribe(data=>{});
    alert('Product has been updated');
    this.router.navigate(['/adminDashboard/admin-products']).then(()=>{
      window.location.reload();
    });
  }
  }
}
