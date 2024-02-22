import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

let cache = new Map<string, any>(); // Move the cache outside the interceptor function

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  let cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    // console.log('Returning cached response');
    return of(cachedResponse); // Ensure you wrap the cached response in an Observable
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        // console.log('Caching new response');
        cache.set(req.url, event); // Cache the new response
        // console.log('Cached response:', cache.get(req.url)); // Log the cached response
      }
    })
  );
};

// I need to look out for better usecases for interceptors
// We  have cacheing purposes especially for GET requests 