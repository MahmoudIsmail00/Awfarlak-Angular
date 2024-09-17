import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { UserService } from '../Services/user/user.service';
import { Router } from '@angular/router';
import { UserChangePasswordDto, UserDto } from '../../Models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [SidebarComponent,ReactiveFormsModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit{
  AllUsers:UserDto[] = [];
  currentUserFromLocalStorage!:UserDto;
  currentUser!:UserDto;
  userForm!:FormGroup;
  constructor(private userService:UserService,private router:Router, private fb:FormBuilder){
    this.userForm = this.fb.group({
      displayName: ['',Validators.required],
      email:['',Validators.required],
      oldPassword:['',Validators.required],
      newPassword:['',Validators.required],
      confirmNewPassword:['',Validators.required],
    })
  }
  ngOnInit(): void {
    this.currentUserFromLocalStorage = JSON.parse(localStorage.getItem('currentUser')!);
    this.userService.getAllUsers().subscribe((data)=>
      {
        this.currentUser = data.find((x)=>x.email == this.currentUserFromLocalStorage.email)!;
        this.loadUserData();
      });

  }
  loadUserData():void{
    console.log(this.currentUser);

    this.userForm.patchValue({
      displayName: this.currentUser.displayName,
      email: this.currentUser.email
    })
  }

  ChangePassword(){
    if(this.userForm.valid && this.userForm.value.newPassword === this.userForm.value.confirmNewPassword){
      let changedUser : UserChangePasswordDto ={
        userId:this.currentUser.userId,
        displayName: this.userForm.value.displayName,
        email: this.userForm.value.email,
        oldPassword: this.userForm.value.oldPassword,
        newPassword: this.userForm.value.newPassword
      }
      console.log(this.userForm);

      this.userService.ChangePassword(this.currentUser.userId,changedUser).subscribe(data=>{});
      this.router.navigate(['/dashboard']).then(()=>{
        alert('Data has been changed successfully!');
        window.location.reload();
      });
    }else{
      alert('Please write valid data');
    }
  }
}
