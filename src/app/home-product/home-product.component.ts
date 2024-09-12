import { Product } from '../../Models/product';
import { SubCategory } from '../../Models/subCategory';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../Services/store/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../Services/cart/cart.service';
import { ProductWithSpecs } from '../../Models/productWithSpecs';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css'],
  standalone: true,
  imports: [RouterLink, RouterOutlet, ProductComponent],
})
export class HomeProductComponent implements OnInit {
  @Input() subCategory!: SubCategory;
  product!: ProductWithSpecs;
  products: ProductWithSpecs[] = [];

  constructor(
    private ProductsService: ProductsService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit() {
    this.ProductsService.getProductsWithSpecsBySubCategoryId(
      this.subCategory.id
    ).subscribe((data: ProductWithSpecs[]) => {
      this.products = data;
    });
  }


  

  addToWishList() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (user && user.WishList) {
      user.WishList.data.push(this.product.id);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.snackBar.open('Item has been added to wishlist successfully!', 'View Wishlist', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'],
      }).onAction().subscribe(() => {
        this.router.navigate(['/wishlist']);
      });
    } else {
      console.error('User or Wishlist data is missing');
    }
  }

  addToCompareList() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (!user.CompareList.data.includes(this.product.id.toString())) {
      if (user.CompareList.data.length < 4) {
        user.CompareList.data.push(this.product.id.toString());
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.snackBar.open('Item has been added to compare list successfully!', 'View Compare List', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar'],
        }).onAction().subscribe(() => {
          this.router.navigate(['/compare']);
        });
      } else {
        this.snackBar.open('Maximum 4 items in the compare list', '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar'],
        });
      }
    }
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
