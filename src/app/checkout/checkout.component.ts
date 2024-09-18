import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../Services/cart/cart.service';
import { OrderService } from '../Services/order/order.service';
import { BasketItemDto } from '../../Models/customerBasket';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddressDto, OrderDto, OrderItemDto } from '../../Models/order';
import { AuthService } from '../Services/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink , RouterOutlet , RouterLinkActive ]
})
export class CheckoutComponent implements OnInit {
  usercartItems: BasketItemDto[] = [];
  discount: number = 0;
  couponCode: string = '';
  validCoupons: { [key: string]: number } = { 'SAVE10': 10, 'SAVE20': 20 };
  subtotal: number = 0;
  taxes: number = 1.99;
  shipping: number = 0;
  address: AddressDto | null = null;
  orderDto: OrderDto | null = null;
  buyerEmail: string | null = null;
  basketId: string = '';
  total: number = 0;
  selectedDeliveryMethodId: number | null = null;




  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router ,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.usercartItems = cartItems;
      this.calculateTotals();
    });

    this.orderService.deliveryMethod$.subscribe(methodId => {
      this.selectedDeliveryMethodId = methodId;
      this.orderService.getAllDeliveryMethods().subscribe(methods => {
        const selectedMethod = methods.find(method => method.id === methodId);
        this.shipping = selectedMethod ? selectedMethod.price : 0;
        this.calculateTotals();
      });
    });

    this.buyerEmail = this.authService.getUserEmail();
    this.basketId = this.cartService.userCart.id;
    this.address = this.authService.getUserAddress();
  }

  calculateTotal(): number {
    return this.usercartItems.reduce((total, item) => total + (item.Quantity * item.Price), 0);
  }

  applyCoupon() {
    const coupon = this.validCoupons[this.couponCode];
    if (coupon) {
      this.discount = coupon;
    } else {
      this.snackBar.open('Inavalid Coupon Code ', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      setTimeout(() => {
        this.router.navigate(['addresses']);
      });
      this.discount = 0;
    }
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.calculateTotal();
    const discountAmount = (this.subtotal * this.discount) / 100;
    this.subtotal -= discountAmount;
    this.total = this.subtotal + this.shipping + this.taxes;
  }

  placeOrder(): void {

    if (!this.buyerEmail || !this.basketId || !this.address || this.selectedDeliveryMethodId == null) {
      this.snackBar
        .open('Please ensure all details are filled out', '', {
          duration: 5000
        });
      return;
    }

    const orderDto: OrderDto = {
      basketId: this.basketId,
      buyerEmail: this.buyerEmail,
      deliveryMethodId: this.selectedDeliveryMethodId,
      shippingAddress: this.address,
      OrderItems: this.usercartItems.map(item => ({
        productItemId: item.Id,
        productName: item.ProductName,
        pictureUrl: item.PictureUrl,
        price: item.Price,
        quantity: item.Quantity
      }))
    };

    this.orderService.createOrder(orderDto).subscribe(
      (orderResult) => {
        this.router.navigate(['/checkout/success'], {
          state: {
            order: orderResult,
            total: this.total,
            address: this.address
          }
        }
      );

      },
      (error) => {
        // console.error('Error creating order:', error);
        this.snackBar
        .open('There was a problem placing your order. Please try again.', '', {
          duration: 5000
        });
      }
    );
  }

  generateOrderId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
