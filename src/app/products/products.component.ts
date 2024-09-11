import { specs } from './../../Models/specs';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/store/products.service';
import { Product } from '../../Models/product';
import { ProductComponent } from '../product/product.component'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [ProductComponent,RouterLink , NgFor],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  subcategories:any;
  images:any;
  filteredProducts: Product[] = [];
  subcategoryId:any;
  Brands:any[] = [];
  BrandsQuantity!:[string,number][];
  specs:specs[] = [];
  cpusQuantities!:[string,number][];
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
          this.filteredProducts = data;  // Initially set filtered products to be all products
          this.getBrands();
          this.getSpecs();

        })}
        else if(this.subcategoryId == 0){
          this.productService.getAllProducts().subscribe((data:any)=>{
            this.products = data;
            this.filteredProducts = data;
            this.getBrands();
            this.getSpecs();
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
  getBrandsWithQuantites(){
    const map = new Map<string, number>();
    this.Brands.forEach((item: string) => {
      const normalizedItem = item;

      if (map.has(normalizedItem)) {
        map.set(normalizedItem, map.get(normalizedItem)! + 1); // Increment count
      } else {
        map.set(normalizedItem, 1); // Initialize count
      }
    });
    this.BrandsQuantity= Array.from(map.entries());

  }
  filiterItemsByBrandName(name:string){
    this.filteredProducts = this.products.filter(x=>x.productBrandName === name);
  }
  filiterItemsByCPU(name:string){
      let filteredSpecs = this.specs.filter(x=>x.cpu == name) ;
      console.log(filteredSpecs);
      for (let item of filteredSpecs) {
        this.filteredProducts.filter(x=>x.id == item.productId);
      }
    // console.log(this.filteredProducts);
  }

  getBrands(){
    this.Brands = this.products.map(x=>x.productBrandName);
    this.getBrandsWithQuantites();
  }
  getSpecs(){
    this.specs.splice(0,this.specs.length);
    this.productService.getAllSpecs().subscribe(data=>{
      for (let element of this.filteredProducts) {
        this.specs.push(data.find(x=>x["productId"] == element.id));
      }
      console.log(this.specs);
      this.getSpecsWithQuantities();
    })
  }
  getSpecsWithQuantities(){
    const map = new Map<string, number>();

    this.specs.forEach((item: any) => {
      const normalizedItem = item.cpu;

      if (map.has(normalizedItem)) {
        map.set(normalizedItem, map.get(normalizedItem)! + 1); // Increment count
      } else {
        map.set(normalizedItem, 1); // Initialize count
      }
    });
    this.cpusQuantities= Array.from(map.entries());
    console.log(this.cpusQuantities);
  }
}
