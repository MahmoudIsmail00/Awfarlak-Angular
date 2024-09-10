import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/store/products.service';
import { Product } from '../Models/product';
import { ProductComponent } from '../product/product.component'
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [ProductComponent,RouterLink],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  subcategories:any;
  images:any;
  filteredProducts: Product[] = [];
  subcategoryId:any;
  constructor(private productService: ProductsService,private route: ActivatedRoute) {}

  shuffleProducts(products: any) {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subcategoryId = params.get('id');  // Capture the 'id' from the route, '+' converts it to number
      if (this.subcategoryId > 0) {
        this.productService.getProductsbySubCategoryId(this.subcategoryId).subscribe((data: Product[]) => {
          this.products = data;
          // console.log(this.products);

          this.filteredProducts = data;  // Initially set filtered products to be all products
        })}
        else if(this.subcategoryId == 0){
          this.productService.getAllProducts().subscribe((data:any)=>{
            this.products = data;
            // console.log(this.products);

          })
        }
    });


    this.productService.currentSearchTerm.subscribe((term) => {
      this.updateProductList(term);
    });
  }
  updateProductList(term: string) {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  }
  encodeImagePath(imagePath: string): string {
    return imagePath.split(' ').join('%20');
  }
}
