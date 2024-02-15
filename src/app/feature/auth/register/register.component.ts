import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IRegister } from '../../../core/constants/constants';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private registrationservice:RegisterService) { }

  registeForm = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    phoneNumber:new FormControl('',[Validators.required,Validators.minLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
    
  })

  register(){
    
    const registerData:IRegister = {
      name:this.registeForm.value.name??"",
      email:this.registeForm.value.email??"",
      password:this.registeForm.value.password??"",
      phoneNumber:this.registeForm.value.phoneNumber?.toString()??""
    }

    console.log(registerData)

    this.registrationservice.register(registerData).subscribe((res)=>{
      console.log(res)
    })
  }
}
