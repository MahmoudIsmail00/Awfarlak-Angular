import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Brand } from '../../../Models/brand';
import { ProductsService } from '../../Services/store/products.service';

@Component({
  selector: 'app-admin-dashboard-brands',
  standalone: true,
  imports: [NgxPaginationModule,NgFor],
  templateUrl: './admin-dashboard-brands.component.html',
  styleUrl: './admin-dashboard-brands.component.css'
})
export class AdminDashboardBrandsComponent implements OnInit {

  brands:Brand[] = [];
  page: number = 1;

  constructor(private productsService:ProductsService){}

  ngOnInit(): void {
    this.productsService.getAllBrands().subscribe(data=>{this.brands=data})
  }
}
