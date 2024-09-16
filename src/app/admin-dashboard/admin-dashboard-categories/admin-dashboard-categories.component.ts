import { SubCategory } from './../../../Models/subCategory';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsService } from '../../Services/store/products.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-categories',
  standalone: true,
  imports: [NgxPaginationModule,NgFor,RouterLink],
  templateUrl: './admin-dashboard-categories.component.html',
  styleUrl: './admin-dashboard-categories.component.css'
})
export class AdminDashboardCategoriesComponent implements OnInit {

  subCategories:SubCategory[] = [];
  page: number = 1;

  constructor(private productsService:ProductsService, private router:Router){}

  ngOnInit(): void {
    this.productsService.getAllSubCategories().subscribe(data=>{this.subCategories = data;})
  }
  DeleteSubCategory(id:number){
    let res = confirm('Are you sure you want to delete this subCategory?');
    if(res){
      this.productsService.DeleteSubcategory(id).subscribe(data=>{});
      alert('SubCategory has been deleted successfully!')
      this.router.navigate(['/adminDashboard/admin-categories']).then(()=>{
        window.location.reload();
      });
    }else{
      alert('SubCategory has has not been deleted !');
      this.router.navigate(['/adminDashboard/admin-categories']).then(()=>{
        window.location.reload();
      });
    }
  }
}
