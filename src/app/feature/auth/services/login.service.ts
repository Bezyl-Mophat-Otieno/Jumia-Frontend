import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants, ILogin, LoginResponseDto, Roles } from '../../../core/constants/constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(credentials:ILogin ){
    return this.http.post(Constants.AUTH_API_URL+Constants.METHODS.LOGIN,credentials) as Observable<LoginResponseDto>
  }
  isAuthenticated():boolean{
    const authToken = localStorage.getItem('auth-token');
    return !!authToken
  }
  isAuthorized(roles: string[]): boolean {
    if (!this.isAuthenticated()) return false;
    return roles.some(role => {
      return role === Roles.ADMIN || role === Roles.CUSTOMER || role === Roles.GUEST; 
    })
      
  }
}
