import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Brand } from '../../../Models/brand';
import { ProductsService } from '../../Services/store/products.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-brands',
  standalone: true,
  imports: [NgxPaginationModule,NgFor,RouterLink],
  templateUrl: './admin-dashboard-brands.component.html',
  styleUrl: './admin-dashboard-brands.component.css'
})
export class AdminDashboardBrandsComponent implements OnInit {

  brands:Brand[] = [];
  page: number = 1;

  constructor(private productsService:ProductsService, private router:Router){}

  ngOnInit(): void {
    this.productsService.getAllBrands().subscribe(data=>{this.brands=data})
  }
  DeleteBrands(id:number){
    let res = confirm('Are you sure you want to delete this brand?');
    if(res){
      this.productsService.DeleteBrand(id).subscribe(data=>{});
      alert('Brand has been deleted successfully!')
      this.router.navigate(['/adminDashboard/admin-brands']).then(()=>{
        window.location.reload();
      });
    }else{
      alert('Brand has has not been deleted !');
      this.router.navigate(['/adminDashboard/admin-brands']).then(()=>{
        window.location.reload();
      });;
    }
  }
}
