import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-dash',
  standalone: true,
  imports: [], 
  templateUrl: './side-dash.component.html',
  styleUrls: ['./side-dash.component.css'],
})
export class SideDashComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
