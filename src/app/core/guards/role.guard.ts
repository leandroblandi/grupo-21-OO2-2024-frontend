import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

export const RoleGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const toast = inject(ToastrService);
  const router = inject(Router);

  const rol: string = loginService.getRolUsuario().authority;
  const requiredRol: string = route.data['rol'] as string;

  if(rol == requiredRol) {
    return true;
  }
  else {
    toast.error('No tienes permiso acceder a esta sección', '¡Oops!');
    router.navigate(['/articulos']);
    return false;
  }
};

