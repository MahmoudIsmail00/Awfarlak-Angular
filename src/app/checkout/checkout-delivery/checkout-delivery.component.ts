import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order/order.service';
import { DeliveryMethod } from '../../../Models/order';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit {
  deliveryMethods: DeliveryMethod[] = [];
  selectedDeliveryMethod: number | null = null;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getAllDeliveryMethods().subscribe(methods => {
      this.deliveryMethods = methods;
    });
  }

  proceedToReview() {
    if (this.selectedDeliveryMethod !== null) {
      this.orderService.setDeliveryMethod(this.selectedDeliveryMethod); // Save selected method
      this.router.navigate(['/checkout/review']);
    } else {
      alert('Please select a delivery method.');
    }
  }
}
