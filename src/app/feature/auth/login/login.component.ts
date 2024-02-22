import { Component } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../../core/constants/constants';
import { LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, asyncScheduler, catchError, from, map, of, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent {

  


  constructor(private loginService:LoginService , private router:Router) { }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  login(){
    const loginData:ILogin = {
      email:this.loginForm.value.email??"",
      password:this.loginForm.value.password??""
    }
    this.loginService.login(loginData).subscribe((res)=>{
     if(res.result){
        localStorage.setItem("auth-token",res.result)
        console.log(res.result.roles)
        if(this.loginService.isAuthorized(res.result.roles)){
          if(res.result.roles.includes('admin')){
            this.router.navigateByUrl('dashboard/admin')
        }
        if(res.result.roles.includes('User')){
          this.router.navigateByUrl('dashboard/market')
        }
      }
    }
    })
  
  }

}
