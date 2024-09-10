import { map } from 'rxjs';
import { ProductsService } from './../../Services/store/products.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/authentication/auth.service';
import { FormsModule } from '@angular/forms';
import { SubCategory } from '../../Models/subCategory';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule],
})
export class NavbarComponent implements OnInit {
  search = '';
  isDropdownOpen = false;
  subcategories:SubCategory[] =[];

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
  }

  updateSearch() {
    console.log('updating the search');
    console.log(this.search);
    this.productsService.updateSearchTerm(this.search);
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  disableDropdown() {
    this.isDropdownOpen = false;
  }

  isActive(route: string): boolean {
    console.log('ho222la');
    console.log(this.router.url);
    return this.router.url === route;
  }

  checkLoggedIn() {
    return this.authService.currentUserValue;
  }

  ngOnInit() {
    this.productsService.getAllSubCategories().subscribe((data:any)=>{
      this.subcategories = data.map((item:SubCategory) => {
        return {
          id: item.id,
          name: item.name
        };
      });
    })
  }
}
