import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.currentUserValue;
    console.log("User Roles = " +user?.roles);
    if (user && user.roles && user.roles.includes('Admin')) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
