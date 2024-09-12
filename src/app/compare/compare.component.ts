import { Product } from './../../Models/product';
import { ProductsService } from './../Services/store/products.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CompareList } from '../../Models/comparelist';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  standalone: true,
  imports: [RouterLink, SidebarComponent],
})
export class CompareComponent implements OnInit {
  compareList: Product[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(user);
    this.productsService.getAllProducts().subscribe((data: Product[]) => {
      this.compareList = data.filter((product) =>
        user.CompareList.data.includes(product.id.toString())
      );
      console.log('wish list products ');
      console.log(this.compareList);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
