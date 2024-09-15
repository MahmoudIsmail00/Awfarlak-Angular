import { SubCategory } from './../../../Models/subCategory';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsService } from '../../Services/store/products.service';

@Component({
  selector: 'app-admin-dashboard-categories',
  standalone: true,
  imports: [NgxPaginationModule,NgFor],
  templateUrl: './admin-dashboard-categories.component.html',
  styleUrl: './admin-dashboard-categories.component.css'
})
export class AdminDashboardCategoriesComponent implements OnInit {

  subCategories:SubCategory[] = [];
  page: number = 1;

  constructor(private productsService:ProductsService){}

  ngOnInit(): void {
    this.productsService.getAllSubCategories().subscribe(data=>{this.subCategories = data;})
  }
}
