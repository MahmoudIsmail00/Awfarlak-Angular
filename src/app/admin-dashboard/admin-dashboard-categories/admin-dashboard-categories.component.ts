import { SubCategory } from './../../../Models/subCategory';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsService } from '../../Services/store/products.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private productsService:ProductsService, private router:Router , private snackBar :MatSnackBar){}

  ngOnInit(): void {
    this.productsService.getAllSubCategories().subscribe(data=>{this.subCategories = data;})
  }
  DeleteSubCategory(id: number) {
    const res = confirm('Are you sure you want to delete this subCategory?');
    if (res) {
      this.productsService.DeleteSubcategory(id).subscribe(
        data => {
          this.snackBar.open('SubCategory has been deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/adminDashboard/admin-categories']).then(() => {
            window.location.reload();
          });
        },
        error => {
          this.snackBar.open('Failed to delete SubCategory. Please try again.', 'Close', {
            duration: 3000,
          });

        }
      );
    } else {
      this.snackBar.open('SubCategory has not been deleted!', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/adminDashboard/admin-categories']).then(() => {
        window.location.reload();
      });
    }
  }
}
