import { ProductsService } from './../Services/store/products.service';
import { WishList } from './../../Models/wishlist';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Product } from '../../Models/product';
import { HomeProductComponent } from '../home-product/home-product.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, SidebarComponent, HomeProductComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  wishListProducts: Product[] = [];
  constructor(private productsService: ProductsService) {}
  removeFromWishlist(productId: number) {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    // console.log(user);
    user.WishList.data = user.WishList.data.filter(
      (id: string) => id !== productId.toString()
    );
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.wishListProducts = this.wishListProducts.filter(
      (product) => product.id !== productId
    );
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    // console.log(user);
    // console.log(user.WishList.data);
    this.productsService.getAllProducts().subscribe((data: Product[]) => {
      // console.log(data);
      this.wishListProducts = data.filter((product) =>
        user.WishList.data.includes(product.id.toString())
      );
      // console.log('wish list products ');
      // console.log(this.wishListProducts);
    });
  }
}
