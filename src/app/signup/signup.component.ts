import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
})
export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    const { email, displayName, password } = this.registerForm.value;
    this.authService.signup(email!, displayName!, password!).subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          console.log('Signup successful');
          this.router.navigate(['products/0']);
        } else {
          console.log('Signup not successful');
        }
      },
      (error) => {
        console.error('Signup failed:', error);
      }
    );
  }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['products']);
    }
  }
}
