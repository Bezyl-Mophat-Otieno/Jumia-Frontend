import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.method != 'GET'){
    return next(req);
  }
  return next(req)
};

// I need to look out for better usecases for interceptors
// We  have cacheing purposes especially for GET requests 