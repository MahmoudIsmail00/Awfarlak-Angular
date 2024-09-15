import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loadStripe, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { CartService } from '../../Services/cart/cart.service';
import { NavigationExtras, Router } from '@angular/router';
import { BasketItemDto, CustomerBasketDto } from '../../../Models/customerBasket';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [NgIf,FormsModule,ReactiveFormsModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;
  cardErrors: any;
  loading = false;

  constructor(private basketService: CartService,
    //  private checkoutService: CheckoutService, private toastr: ToastrService,
       private router: Router) {}

  ngOnInit(): void {
    loadStripe('pk_test_51Pz1woL6yab84aHE8D7U2LfE5Sz9EDuAZdXs3JFTA2b9883wWM3lLYJFKODZvv8PEV0QHNuepFWYDJINagD0ULXa00LJKpnXKL').then(stripe => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change', event => {
          this.cardNumberComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change', event => {
          this.cardExpiryComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change', event => {
          this.cardCvcComplete = event.complete;
          if (event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })
      }
    })
  }

  get paymentFormComplete() {
    return this.checkoutForm?.get('paymentForm')?.valid
      && this.cardNumberComplete
      && this.cardExpiryComplete
      && this.cardCvcComplete
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.loadCartFromLocalStorage();
    if (basket == null) throw new Error('cannot get basket');
    try {
      // const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) {
        this.basketService.clearCart();
        // const navigationExtras: NavigationExtras = {state: createdOrder};
        // this.router.navigate(['checkout/success'], navigationExtras);
        this.router.navigate(['checkout/success']);
      } else {
        // this.toastr.error(paymentResult.error.message);
        alert(paymentResult.error.message);
      }
    } catch (error: any) {
      console.log(error);
      // this.toastr.error(error.message);
        alert(error.message);
      } finally {
      this.loading = false;
    }
  }

  private async confirmPaymentWithStripe(basket: CustomerBasketDto | null) {
    if (!basket) throw new Error('Basket is null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
    if (!result) throw new Error('Problem attempting payment with stripe');
    return result;
  }

  // private async createOrder(basket: Basket | null) {
  //   if (!basket) throw new Error('Basket is null');
  //   const orderToCreate = this.getOrderToCreate(basket);
  //   return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  // }

  // private getOrderToCreate(basket: Basket): OrderToCreate {
  //   const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
  //   const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
  //   if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
  //   return {
  //     basketId: basket.id,
  //     deliveryMethodId: deliveryMethodId,
  //     shipToAddress: shipToAddress
  //   }
  // }
}
