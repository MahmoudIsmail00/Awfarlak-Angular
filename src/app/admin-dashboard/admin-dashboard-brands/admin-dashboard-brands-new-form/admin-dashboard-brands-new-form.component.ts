import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Brand } from '../../../../Models/brand';
import { ProductsService } from '../../../Services/store/products.service';

@Component({
  selector: 'app-admin-dashboard-brands-new-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './admin-dashboard-brands-new-form.component.html',
  styleUrl: './admin-dashboard-brands-new-form.component.css'
})
export class AdminDashboardBrandsNewFormComponent implements OnInit{
  newBrandForm!: FormGroup;
  newBrand!:Brand;

  constructor(
    private fb: FormBuilder,
    private productsService:ProductsService,
    private router: Router
  ){
    this.newBrandForm = this.fb.group({
      name: ['', Validators.required]
    });

  }
  ngOnInit(): void {

  }
  CreateBrand(){
    if(this.newBrandForm.valid){
      let newBranditem : Brand = {
        id : 0,
        name : this.newBrandForm.value.name
      };
      console.log(newBranditem);

      this.productsService.CreateNewBrand(newBranditem).subscribe(data=>{});
      alert('Brand Has been added Successfully!');
      this.router.navigate(['/adminDashboard/admin-brands']).then(()=>{
        window.location.reload();
      });
    }else {
      alert("Form is invalid");
    }
  }

}
