import { HomeProductComponent } from './../home-product/home-product.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AwfarlkComponentComponent } from '../awfarlk-component/awfarlk-component.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterLink, HomeProductComponent, AwfarlkComponentComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
