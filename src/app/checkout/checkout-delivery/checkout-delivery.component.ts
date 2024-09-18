import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order/order.service';
import { DeliveryMethod } from '../../../Models/order';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private orderService: OrderService, private router: Router , private snackBar :MatSnackBar ) {}

  ngOnInit(): void {
    this.orderService.getAllDeliveryMethods().subscribe(methods => {
      this.deliveryMethods = methods;
    });
  }

  onDeliveryMethodChange(methodId: number) {
    this.selectedDeliveryMethod = methodId;
    this.orderService.setDeliveryMethod(this.selectedDeliveryMethod);
    this.snackBar.open('Delivery method updated!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
