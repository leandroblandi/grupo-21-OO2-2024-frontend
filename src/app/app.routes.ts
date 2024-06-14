import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListadoLotesComponent } from './components/listado-lotes/listado-lotes.component';
import { AltaLoteComponent } from './components/alta-lote/alta-lote.component';
import { ListadoArticulosComponent } from './components/listado-articulos/listado-articulos.component';
import { AltaArticuloComponent } from './components/alta-articulo/alta-articulo.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

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
    path: "lotes",
    component: ListadoLotesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "alta-lote",
    component: AltaLoteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "articulos",
    component: ListadoArticulosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "alta-articulo",
    component: AltaArticuloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "clientes",
    component: ListadoClientesComponent,
    canActivate: [AuthGuard]
  }
];
