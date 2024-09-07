import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/store/products.service';
import { Product } from '../../Models/product';
import { ProductComponent } from '../product/product.component'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [ProductComponent],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  images:any;
  filteredProducts: Product[] = [];

  constructor(private productService: ProductsService) {}

  shuffleProducts(products: any) {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products:any) => {
      this.products = products["data"];
      this.filteredProducts = products["data"];
      console.log(this.products);
      console.log(this.images);
    });

    this.productService.currentSearchTerm.subscribe((term) => {
      this.updateProductList(term);
    });
  }
  updateProductList(term: string) {
    // console.log('the search term is :::', term);
    // console.log(this.products);
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  }
  encodeImagePath(imagePath: string): string {
    return imagePath.split(' ').join('%20');
  }
}
