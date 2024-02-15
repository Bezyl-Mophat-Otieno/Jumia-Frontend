import {inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../feature/auth/services/login.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginservice = inject(LoginService)
  if(loginservice.isAuthenticated()){
    return true
  }else{
    router.navigateByUrl('login')
    return false
  }
};
