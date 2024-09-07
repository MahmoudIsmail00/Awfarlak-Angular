import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css'],
  standalone: true,
  imports: [RouterLink, RouterOutlet],
})
export class HomeProductComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
