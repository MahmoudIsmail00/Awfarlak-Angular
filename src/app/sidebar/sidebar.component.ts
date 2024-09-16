import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/authentication/auth.service';
import { OrderService } from '../Services/order/order.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  orderCount: number = 0;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(orders => {
      this.orderCount = orders.length;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
