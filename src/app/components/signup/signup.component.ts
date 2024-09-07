import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    const { email, username, password } = this.registerForm.value;
    this.authService
      .signup(email!, username!, password!)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          console.log('signup successful');
          this.router.navigate(['products']);
        } else {
          console.log('signup not successful');
        }
      });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['products']);
    }
  }
}
