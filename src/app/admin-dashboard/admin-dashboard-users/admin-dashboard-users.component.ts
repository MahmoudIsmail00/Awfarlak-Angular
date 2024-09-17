import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDto } from '../../../Models/user';
import { UserService } from '../../Services/user/user.service';

@Component({
  selector: 'app-admin-dashboard-users',
  standalone: true,
  imports: [NgxPaginationModule,NgFor,RouterLink],
  templateUrl: './admin-dashboard-users.component.html',
  styleUrl: './admin-dashboard-users.component.css'
})
export class AdminDashboardUsersComponent implements OnInit {

  AllUsers:UserDto[] = [];
  page:number = 1;

  constructor(private userService:UserService,private router:Router){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data=>{this.AllUsers = data});
  }

  DeleteUser(id:string){
  }

}
