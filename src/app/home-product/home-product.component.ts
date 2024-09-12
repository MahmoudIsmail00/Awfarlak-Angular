import { Product } from '../../Models/product';
import { SubCategory } from '../../Models/subCategory';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../Services/store/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../Services/cart/cart.service';
import { ProductWithSpecs } from '../../Models/productWithSpecs';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css'],
  standalone: true,
  imports: [RouterLink, RouterOutlet],
})
export class HomeProductComponent implements OnInit {
  @Input() subCategory!: SubCategory;
  product!: ProductWithSpecs;
  products: Product[] = [];

  constructor(
    private ProductsService: ProductsService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  addToWishList() {
    console.log('clicked');
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    user.WishList.data.push(this.product.id);

    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  ngOnInit() {
    this.ProductsService.getProductsbySubCategoryId(
      this.subCategory.id
    ).subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, 1); // Ensure addToCart method accepts ProductWithSpecs and quantity as number

      // Show snackbar with button to navigate to cart
      this.snackBar
        .open('Product added to cart!', 'Go to Cart', {
          duration: 5000, // Duration in milliseconds
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate(['/cart']); // Adjust route as necessary
        });

      console.log('Product added to cart');
    }
  }
}
