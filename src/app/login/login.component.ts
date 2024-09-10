import { NgIf } from '@angular/common';
import { AuthService } from '../Services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (isLoggedIn) => {
          if (isLoggedIn) {
            console.log('Login successful');
            this.router.navigate(['products/0']);
          } else {
            this.loginError = 'Invalid email or password';
          }
        },
        (error) => {
          this.loginError = 'Invalid email or password';
          console.error('Login failed:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['products/0']);
    }
  }
}
