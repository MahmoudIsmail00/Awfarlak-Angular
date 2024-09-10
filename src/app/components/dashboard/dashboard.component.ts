import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../Models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

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
