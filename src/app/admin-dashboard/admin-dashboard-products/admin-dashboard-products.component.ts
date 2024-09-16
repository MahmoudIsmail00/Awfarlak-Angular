import { Product } from './../../../Models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/store/products.service';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';
import { forkJoin } from 'rxjs';
import { specs } from '../../../Models/specs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard-products',
  standalone: true,
  imports: [NgxPaginationModule,NgFor,RouterLink],
  templateUrl: './admin-dashboard-products.component.html',
  styleUrl: './admin-dashboard-products.component.css'
})
export class AdminDashboardProductsComponent  implements OnInit{
  products:ProductWithSpecs[] = [];
  page: number = 1;

  constructor(private productService:ProductsService, private router:Router){}
  ngOnInit(): void {
    this.getAllProductsWithSpecs();

  }

  ngOnChanges(): void {
    this.getAllProductsWithSpecs();
  }

   // Fetch all products and their specs
   getAllProductsWithSpecs() {
    forkJoin({
      products: this.productService.getAllProducts(),
      specs: this.productService.getAllSpecs(),
    }).subscribe(({ products, specs }) => {
      let combinedProducts = products.map((product: Product) => {
        let productSpec = specs.find(
          (spec: specs) => spec.productId === product.id
        );
        return {
          ...product,
          ...productSpec,
        } as ProductWithSpecs;
      });
      this.products = combinedProducts;
      console.log(this.products);

    });

  }
  DeleteProduct(id:number){
    this.productService.DeleteProduct(id).subscribe(data=>{});
    this.products.filter(x=>x.id != id);
    alert('Product has been deleted successfully!')
    this.router.navigate(['/adminDashboard/admin-products']).then(()=>{
      window.location.reload();
    });;
  }
}
