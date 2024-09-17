import { map } from 'rxjs';
import { ProductsService } from '../Services/store/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../Services/authentication/auth.service';
import { FormsModule } from '@angular/forms';
import { SubCategory } from '../../Models/subCategory';
import { ThemeService } from '../Services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, NgIf],
})
export class NavbarComponent implements OnInit, OnDestroy {
  search = '';
  isDropdownOpen = false;
  subcategories: SubCategory[] = [];
  isDarkMode: boolean;
  isAdmin: boolean = false;
  private currentUserSubscription!: Subscription


  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router,
    private themeService: ThemeService,
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  logout() {
    this.authService.logout();
  }

  updateSearch() {
    // console.log('updating the search');
    // console.log(this.search);
    this.productsService.updateSearchTerm(this.search);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  disableDropdown() {
    this.isDropdownOpen = false;
  }

  isActive(route: string): boolean {
    // console.log('ho222la');
    // console.log(this.router.url);
    return this.router.url === route;
  }

  checkLoggedIn() {
    return this.authService.currentUserValue;
  }

  isAdminUser(user: any) {
    this.isAdmin = user ? user.roles.includes('Admin') : false;
  }

  ngOnInit() {
    this.productsService.getAllSubCategories().subscribe((data: any) => {
      this.subcategories = data.map((item: SubCategory) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
    });

    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.isAdminUser(user);
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
