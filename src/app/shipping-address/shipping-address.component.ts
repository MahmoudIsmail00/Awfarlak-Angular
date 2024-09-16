import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../Services/authentication/auth.service';
import { AddressDto } from '../../Models/order';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { User } from '../../Models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css'],
  imports: [ReactiveFormsModule, SidebarComponent]
})
export class ShippingAddressComponent implements OnInit {
  addressForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAddress();
  }

 // In your component
loadAddress(): void {
  this.authService.getCurrentUserAddress().subscribe(address => {
    if (address) {
      console.log('Address loaded from API:', address);
      this.addressForm.patchValue(address);
      this.isEditing = true;
    } else {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser.address) {
          console.log('Address loaded from local storage:', parsedUser.address);
          this.addressForm.patchValue(parsedUser.address);
          this.isEditing = true;
        }
      }
    }
  }, error => {
    console.error('Error loading address:', error);
  });
}


  saveAddress(): void {
    if (this.addressForm.valid) {
      const updatedAddress: AddressDto = this.addressForm.value;
      this.authService.updateUserAddress(updatedAddress).subscribe(
        () => {
          const currentUser = this.authService.currentUserValue || {} as User;
          const updatedUser: User = {
            ...currentUser,
            address: updatedAddress,
            email: currentUser.email || '',
          };
          this.authService.updateCurrentUser(updatedUser);
          this.snackBar.open('Address updated successfully!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          setTimeout(() => {
            this.router.navigate(['addresses']);
          });
        },
        error => console.error('Error updating address:', error)
      );
    }
  }



}
