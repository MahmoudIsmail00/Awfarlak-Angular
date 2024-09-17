import { Product } from './../../../Models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/store/products.service';
import { ProductWithSpecs } from '../../../Models/productWithSpecs';
import { forkJoin } from 'rxjs';
import { specs } from '../../../Models/specs';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private productService:ProductsService, private router:Router , private snackBar : MatSnackBar){}
  ngOnInit(): void {
    this.getAllProductsWithSpecs();

  }

  ngOnChanges(): void {
    this.getAllProductsWithSpecs();
  }

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

    });

  }
  DeleteProduct(id: number) {
    const res = confirm('Are you sure you want to delete this product?');
    if (res) {
      this.productService.DeleteProduct(id).subscribe(
        data => {
          this.products = this.products.filter(x => x.id !== id);

          this.snackBar.open('Product has been deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/adminDashboard/admin-products']).then(() => {
            window.location.reload();
          });
        },
        error => {
          this.snackBar.open('Failed to delete product. Please try again.', 'Close', {
            duration: 3000,
          });

        }
      );
    } else {
      this.snackBar.open('Product has not been deleted!', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/adminDashboard/admin-products']).then(() => {
        window.location.reload();
      });
    }
  }
}
