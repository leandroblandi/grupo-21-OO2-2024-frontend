import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { LoginService } from "../services/login.service";
import { ToastrService } from "ngx-toastr";

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
HttpHandlerFn) => {
  
  const router = inject(Router);
  const auth = inject(LoginService);
  const toast = inject(ToastrService);
  
  return next(req).pipe(catchError((err: HttpErrorResponse)=> {

    if(err.status == 401 || !auth.isAuthenticated()) {
      toast.error("Tu token expiró", "¡Oops!");
      auth.logout();
      router.navigate(['/iniciar-sesion']);
    }
    return throwError(()=> err);
  }));
}
