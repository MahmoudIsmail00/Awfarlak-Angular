import { Component } from '@angular/core';
import { AuthService } from '../Services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../Models/user';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-all-addresses',
  standalone: true,
  imports: [SidebarComponent,RouterLink],
  templateUrl: './all-addresses.component.html',
  styleUrl: './all-addresses.component.css'
})
export class AllAddressesComponent {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser: User | null = null;
  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

