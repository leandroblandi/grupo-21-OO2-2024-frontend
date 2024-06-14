import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

const loginUrl = `http://localhost:8080/api/login`;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
HttpHandlerFn) => {

  console.log(req.url)

  if(req.url === loginUrl) {
    return next(req);
  }

  const token = localStorage.getItem("token")!;
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);
};
