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
  imports: [NgIf]
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
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id'); // This is a string
      if (this.productId) {
        const idNumber = parseInt(this.productId, 10); // Convert to number
        this.productService.getProductWithSpecs(idNumber).subscribe((data: ProductWithSpecs) => {
          this.product = data;
        });
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, 1); // Ensure addToCart method accepts ProductWithSpecs and quantity as number

      // Show snackbar with button to navigate to cart
      this.snackBar.open('Product added to cart!', 'Go to Cart', {
        duration: 5000, // Duration in milliseconds
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }).onAction().subscribe(() => {
        this.router.navigate(['/cart']); // Adjust route as necessary
      });

      console.log("Product added to cart");
    }
  }
}
