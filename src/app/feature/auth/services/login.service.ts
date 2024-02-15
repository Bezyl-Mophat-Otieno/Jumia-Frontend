import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants, ILogin, LoginResponseDto } from '../../../core/constants/constants';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private router:Router) { }

  login(credentials:ILogin ){
    return this.http.post(Constants.AUTH_API_URL+Constants.METHODS.LOGIN,credentials) as Observable<LoginResponseDto>
  }
  isAuthenticated():boolean{
    const authToken = localStorage.getItem('auth-token');
    return !!authToken
  }
}
