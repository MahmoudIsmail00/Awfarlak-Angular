import { AuthService } from './../../Services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService
      .login(this.email, this.password)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          console.log('successful login');
          this.router.navigate(['products']);
        } else {
          console.log('unsuccessful login');
        }
      });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['products']);
    }
  }
}
