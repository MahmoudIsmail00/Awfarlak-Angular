import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  standalone: true,
  imports:[RouterLink]
})
export class WishlistComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
