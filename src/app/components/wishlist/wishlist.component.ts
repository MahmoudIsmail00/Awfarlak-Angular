import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SideDashComponent } from '../side-dash/side-dash.component';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  standalone: true,
  imports: [RouterLink, SideDashComponent]
})
export class WishlistComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
