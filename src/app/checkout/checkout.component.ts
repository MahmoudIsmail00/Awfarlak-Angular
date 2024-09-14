import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive]
})
export class CheckoutComponent implements OnInit {

  ngOnInit(): void {
  }


}
