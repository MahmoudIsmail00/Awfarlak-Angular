import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user/user.service';
import { Role, UpdateUserRoleDto, UserDto } from '../../../../Models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard-users-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,RouterLink,NgIf],
  templateUrl: './admin-dashboard-users-edit-user.component.html',
  styleUrl: './admin-dashboard-users-edit-user.component.css'
})
export class AdminDashboardUsersEditUserComponent implements OnInit{

  roles:Role[]=[];
  user!:UserDto;
  userId:string|null = '';
  userForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ){
    this.userForm = this.fb.group({
      email:['', Validators.required],
      role:['', Validators.required]
    })
  }

  loadUserData(userId:string):void{
    this.userService.GetUserData(userId).subscribe((user:UserDto)=>{
      this.userForm.patchValue({
        email: user.email,
        roles: user.roles[0]
      })
    });

  }

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(data=>{this.roles = data});

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
  });
    if(this.userId){
      this.loadUserData(this.userId);
    }
  }

  UpdateUser(){
    if(this.userForm.valid){
      let UpdatedUser: UpdateUserRoleDto = {
        email:this.userForm.value.email,
        newRole: this.userForm.value.role
      }
      // console.log(UpdatedUser);

      this.userService.UpdateRole(UpdatedUser).subscribe(data=>{});
      this.snackBar.open('Role has been updated successfully!', 'View Users', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'],
      }).onAction().subscribe(() => {
        this.router.navigate(['/adminDashboard/admin-users']).then(()=>{
          window.location.reload();
        });
      });
    }
  }
}
