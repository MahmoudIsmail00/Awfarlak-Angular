import { Product } from './../../../Models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/store/products.service';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';
import { forkJoin } from 'rxjs';
import { specs } from '../../../Models/specs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard-products',
  standalone: true,
  imports: [NgxPaginationModule,NgFor],
  templateUrl: './admin-dashboard-products.component.html',
  styleUrl: './admin-dashboard-products.component.css'
})
export class AdminDashboardProductsComponent  implements OnInit{
  products:ProductWithSpecs[] = [];
  page: number = 1;

  constructor(private productService:ProductsService){}
  ngOnInit(): void {
    this.getAllProductsWithSpecs();
  }
   // Fetch all products and their specs
   getAllProductsWithSpecs() {
    forkJoin({
      products: this.productService.getAllProducts(),
      specs: this.productService.getAllSpecs(),
    }).subscribe(({ products, specs }) => {
      const combinedProducts = products.map((product: Product) => {
        const productSpec = specs.find(
          (spec: specs) => spec.productId === product.id
        );
        return {
          ...product,
          ...productSpec,
        } as ProductWithSpecs;
      });
      this.products = combinedProducts;
    });
  }
}
