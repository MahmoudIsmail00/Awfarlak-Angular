import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressDto } from '../../../Models/order';
import { AuthService } from '../../Services/authentication/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css'],
  imports: [NgIf , ReactiveFormsModule]
})
export class CheckoutAddressComponent implements OnInit {
  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]] 
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUserAddress().subscribe(address => {
      if (address) {
        this.addressForm.patchValue(address);
      }
    });
  }

  submitOrder(): void {
    if (this.addressForm.valid) {
      const address: AddressDto = this.addressForm.value;
      this.router.navigate(['/checkout/delivery']);
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
