import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/store/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductWithSpecs } from '../../Models/productWithSpecs';

@Component({
  selector: 'app-awfarlk-component',
  templateUrl: './awfarlk-component.component.html',
  styleUrls: ['./awfarlk-component.component.css'],
  standalone: true,
})
export class AwfarlkComponentComponent implements OnInit {
  productId:any;
  product!:ProductWithSpecs;
  constructor(private productService: ProductsService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');  // Capture the 'id' from the route, '+' converts it to number
      console.log(this.productId);
      this.productService.getProductWithSpecs(this.productId).subscribe((data:any)=>{
        this.product = data;
        console.log(this.product);
      })
    });
  }
}
