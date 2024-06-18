import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListadoLotesComponent } from './components/listado-lotes/listado-lotes.component';
import { AltaLoteComponent } from './components/alta-lote/alta-lote.component';
import { ListadoArticulosComponent } from './components/listado-articulos/listado-articulos.component';
import { AltaArticuloComponent } from './components/alta-articulo/alta-articulo.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { RoleGuard } from './core/guards/role.guard';
import { EditarArticuloComponent } from './components/editar-articulo/editar-articulo.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { MisComprasComponent } from './components/mis-compras/mis-compras.component';

const rolAdministrador: string = "ROLE_ADMINISTRADOR";

export const routes: Routes = [

  {
    path: "",
    pathMatch: "full",
    redirectTo: "iniciar-sesion"
  },
  {
    path: "iniciar-sesion",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "registrarse",
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "lotes",
    component: ListadoLotesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      rol: rolAdministrador
    }
  },
  {
    path: "alta-lote",
    component: AltaLoteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      rol: rolAdministrador
    }
  },
  {
    path: "articulos",
    component: ListadoArticulosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "alta-articulo",
    component: AltaArticuloComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      rol: rolAdministrador
    }
  },
  {
    path: "editar-articulo/:id",
    component: EditarArticuloComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      rol: rolAdministrador
    }
  },
  {
    path: "carrito",
    component: ComprarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "clientes",
    component: ListadoClientesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      rol: rolAdministrador
    }
  },
{
  path: "mis-compras",
  component: MisComprasComponent
}
];
