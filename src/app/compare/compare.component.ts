import { CompareList } from './../../Models/comparelist';
import { Product } from './../../Models/product';
import { ProductsService } from './../Services/store/products.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductWithSpecs } from '../../Models/productWithSpecs';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  standalone: true,
  imports: [RouterLink, SidebarComponent],
})
export class CompareComponent implements OnInit {
  compareList: ProductWithSpecs[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(user);
    for (const item of user.CompareList.data) {
      this.productsService.getProductWithSpecs(Number(item)).subscribe((data:ProductWithSpecs)=>{
        this.compareList.push(data);
      })
    }
  }
  removeCompareListProduct(productId: number) {
    console.log('clicked');
    console.log(productId);
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(user);
    user.CompareList.data = user.CompareList.data.filter(
      (id: string) => id !== productId.toString()
    );
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.compareList = this.compareList.filter(
      (product) => product.id !== productId
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
