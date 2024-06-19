import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loginUrl = environment.url + '/api/login';
  const registerUrl = environment.url + '/api/usuarios';

  if (
    req.url === loginUrl ||
    (req.url === registerUrl && req.method === 'POST')
  ) {
    return next(req);
  }

  console.log(req);
  const token = localStorage.getItem('token')!;
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);
};
