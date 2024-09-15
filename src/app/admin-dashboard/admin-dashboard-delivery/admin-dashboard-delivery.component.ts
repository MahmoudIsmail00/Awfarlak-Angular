import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/store/products.service';
import { DeliveryMethod } from '../../../Models/order';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-dashboard-delivery',
  standalone: true,
  imports: [NgxPaginationModule,NgFor],
  templateUrl: './admin-dashboard-delivery.component.html',
  styleUrl: './admin-dashboard-delivery.component.css'
})
export class AdminDashboardDeliveryComponent implements OnInit{

  deliveryMethods:DeliveryMethod[] = [];
  page: number = 1;

  constructor(private productsService:ProductsService){}

  ngOnInit(): void {
    this.productsService.getAllDeliveryMethods().subscribe(data=>{this.deliveryMethods=data})
  }

}
