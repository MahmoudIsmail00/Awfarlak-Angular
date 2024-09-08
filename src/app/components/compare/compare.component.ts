import { Component, OnInit } from '@angular/core';
import { SideDashComponent } from '../side-dash/side-dash.component';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  standalone: true,
  imports: [SideDashComponent],
})
export class CompareComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
