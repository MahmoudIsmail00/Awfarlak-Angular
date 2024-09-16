import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart/cart.service';
import { OrderService } from '../Services/order/order.service';
import { BasketItemDto } from '../../Models/customerBasket';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddressDto, OrderDto } from '../../Models/order';
import { AuthService } from '../Services/authentication/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLinkActive, RouterLink]
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
  basketId:  string = '';
  total: number = 0;


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    this.cartService.cart$.subscribe(cartItems => {
      this.usercartItems = cartItems;
      this.calculateTotals();
    });


    this.orderService.deliveryMethod$.subscribe(methodId => {
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
      alert('Invalid coupon code');
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
    
    if (!this.buyerEmail || !this.basketId || !this.address) {
      alert('Please ensure all details are filled out.');
      return;
    }

    const orderDto: OrderDto = {
      buyerEmail: this.buyerEmail,
      basketId: this.basketId,
      deliveryMethodId: 10,
      shippingAddress: this.address
    };

    this.orderService.createOrder(orderDto).subscribe(
      (orderResult) => {
        this.router.navigate(['/checkout/success'], {
          state: {
            order: orderResult,
            total: this.total,
            address: this.address
          }
        });
      },
      (error) => {
        console.error('Error creating order:', error);
        alert('There was a problem placing your order. Please try again.');
      }
    );
  }


  generateOrderId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

}
