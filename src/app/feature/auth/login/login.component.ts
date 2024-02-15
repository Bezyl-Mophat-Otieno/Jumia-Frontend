import { Component } from '@angular/core';
import { ReactiveFormsModule , FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../../core/constants/constants';
import { LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';

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
        this.router.navigateByUrl('dashboard/admin')
      }
    })
  
  }

}
