import { HomeProductComponent } from './../home-product/home-product.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AwfarlkComponentComponent } from '../awfarlk-component/awfarlk-component.component';
import { ProductsService } from '../../Services/store/products.service';
import { SubCategory } from '../../Models/subCategory';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterLink, HomeProductComponent, AwfarlkComponentComponent],
})
export class HomeComponent implements OnInit {

  subcategories:SubCategory[] = [];

  constructor(private productsService: ProductsService) {}

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
