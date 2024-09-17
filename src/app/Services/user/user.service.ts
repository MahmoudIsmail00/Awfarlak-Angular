import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Role,  UpdateUserRoleDto,  UserChangePasswordDto,  UserDto } from '../../../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  UsersURL = `${environment.apiUrl}/Account/`;
  constructor(private http: HttpClient, private authService: AuthService) {}
  ngOnInit(): void {
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAllUsers():Observable<UserDto[]>{
    const headers = this.getHeaders();
    return this.http.get<UserDto[]>(this.UsersURL + 'GetAllUsers', {
      headers,
    });
  }

  getAllRoles():Observable<Role[]>{
    const headers = this.getHeaders();
    return this.http.get<Role[]>(this.UsersURL + 'GetAllRoles', {
      headers,
    });
  }

  UpdateRole(userDto:UpdateUserRoleDto):Observable<UpdateUserRoleDto>{
    const headers = this.getHeaders();
    return this.http.post<UpdateUserRoleDto>(`${this.UsersURL}UpdateUserRole`, userDto ,{headers});
  }

  GetUserData(userId:string):Observable<UserDto>{
    const headers = this.getHeaders();
    return this.http.get<UserDto>(this.UsersURL + `GetUserData/${userId}`, {
      headers,
    });
  }

  ChangePassword(userId:string|null,user:UserChangePasswordDto):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.UsersURL}ChangeDetails/${userId}`,user ,{headers});
  }
}
