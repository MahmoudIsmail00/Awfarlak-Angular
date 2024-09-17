import { CompareList } from './../../Models/comparelist';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../Services/cart/cart.service';
import { Router, RouterLink } from '@angular/router';
import { ProductWithSpecs } from '../../Models/productWithSpecs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductWithSpecs; // Define an input property
  quantity = 0;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  increaseQuantity() {
    this.quantity++;
    this.cartService.increaseProductQuantity(this.product.id);
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      this.cartService.decreaseProductQuantity(this.product.id);
    }
  }

  ngOnInit() {
    //this.quantity = this.cartService.getProductQuantity(this.product.id);
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, 1); // Ensure addToCart method accepts Product and quantity as number

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


  addToWishList() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (!user.WishList.data.includes(this.product.id.toString())) {
      user.WishList.data.push(this.product.id.toString());
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
}
