import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/authentication/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-access',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './admin-dashboard-access.component.html',
  styleUrls: ['./admin-dashboard-access.component.css'] // Corrected to styleUrls
})
export class AdminDashboardAccessComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (success) => {
          if (success) {
            const currentUser = this.authService.currentUserValue;
            if (currentUser && currentUser.roles.includes('Admin')) {
              this.router.navigate(['/adminDashboard']);
            } else {
              this.loginError = 'You do not have permission to access the admin dashboard.';
            }
          }
        },
        (error) => {
          console.error('Login failed:', error);
          this.loginError = 'Login failed. Please check your credentials and try again.';
        }
      );
    }
  }
}
