import { Product } from './../../Models/product';
import { SubCategory } from './../../Models/subCategory';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../Services/store/products.service';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css'],
  standalone: true,
  imports: [RouterLink, RouterOutlet],
})
export class HomeProductComponent implements OnInit {

  @Input() subCategory!:SubCategory;

  products:Product[]=[];

  constructor(private ProductsService:ProductsService) {}

  ngOnInit() {
      this.ProductsService.getProductsbySubCategoryId(this.subCategory.id).subscribe((data:Product[])=>{
        this.products = data;
      })
  }
}
