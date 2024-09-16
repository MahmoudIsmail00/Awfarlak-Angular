import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../Models/user';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-all-addresses',
  standalone: true,
  imports: [SidebarComponent, RouterLink, NgIf],
  templateUrl: './all-addresses.component.html',
  styleUrls: ['./all-addresses.component.css']
})
export class AllAddressesComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      this.currentUser = parsedUser;
    }
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  hasShippingAddress(): boolean {
    return this.currentUser?.address !== undefined && this.currentUser.address !== null;
  }

  getShippingAddress(): string {
    const address = this.currentUser?.address;
    return address ? `
      ${address.firstName} ${address.lastName}
      ${address.street},
      ${address.city},
      ${address.state},
      ${address.zipCode}
    ` : '';
  }
}
