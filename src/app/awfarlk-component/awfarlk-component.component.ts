import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/store/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductWithSpecs } from '../../Models/productWithSpecs';
import { CartService } from '../Services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-awfarlk-component',
  templateUrl: './awfarlk-component.component.html',
  styleUrls: ['./awfarlk-component.component.css'],
  standalone: true,
  imports: [NgIf, FormsModule]
})
export class AwfarlkComponentComponent implements OnInit {
  productId: string | null = null;
  product!: ProductWithSpecs;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id'); // Fetch productId from the route
      if (this.productId) {
        const idNumber = parseInt(this.productId, 10); // Convert to number
        this.productService.getProductWithSpecs(idNumber).subscribe(
          (data: ProductWithSpecs) => {
            this.product = data;
            // console.log('Product fetched:', this.product); // Log the product data
          },
        );
      }
    });
  }

  addToWishList() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (user && user.WishList) {
      user.WishList.data.push(this.productId!);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.snackBar.open('Item has been added to wishlist successfully!', 'View Wishlist', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'],
      }).onAction().subscribe(() => {
        this.router.navigate(['/wishlist']);
      });
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
      this.cartService.addToCart(this.product, 1);
      this.snackBar
        .open(`${this.product.name} added to cart!`, 'View Cart', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar'],
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate(['/cart']);
        });

      // console.log('Product added to cart:', this.product.name);
      // console.log('Product ID:', this.product.id);
    }
  }
}
