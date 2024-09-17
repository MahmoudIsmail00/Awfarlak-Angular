import { Component, OnInit } from '@angular/core';
import { OrderResultDto } from '../../../Models/order';
import { OrderService } from '../../Services/order/order.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-orders',
  standalone: true,
  imports: [RouterLink,NgxPaginationModule,NgFor],
  templateUrl: './admin-dashboard-orders.component.html',
  styleUrl: './admin-dashboard-orders.component.css'
})
export class AdminDashboardOrdersComponent implements OnInit{

  orders:OrderResultDto[] = [];
  paymentStatus:string = '';
  page:number = 1;
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data:OrderResultDto[])=>{
      data.forEach(order => {
        switch (Number(order.orderStatus)) {
          case 0:
            order.orderStatus = "Pending";
            break;
          case 1:
            order.orderStatus = "Payment received";
            break;
          case 2:
            order.orderStatus = "Payment failed";
            break;
          default:
            order.orderStatus = "Unknown status"; // Fallback for unknown status codes
            break;
        }
      });
      data.forEach( x=> {
        let date: Date = new Date(x.orderDate)
        x.orderDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
      })
      this.orders = data;
        console.log(data);
    })
  }

}
