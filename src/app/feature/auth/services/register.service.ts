import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants , IRegister } from '../../../core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) {}

  register(credentials:IRegister ){
    return this.http.post(Constants.AUTH_API_URL+Constants.METHODS.REGISTER,credentials)
  }
}
