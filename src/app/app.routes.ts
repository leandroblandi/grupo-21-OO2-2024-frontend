import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListadoLotesComponent } from './components/listado-lotes/listado-lotes.component';
import { AltaLoteComponent } from './components/alta-lote/alta-lote.component';
import { ListadoArticulosComponent } from './components/listado-articulos/listado-articulos.component';
import { AltaArticuloComponent } from './components/alta-articulo/alta-articulo.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "iniciar-sesion",
    component: LoginComponent
  },
  {
    path: "lotes",
    component: ListadoLotesComponent
  },
  {
    path: "alta-lote",
    component: AltaLoteComponent
  },
  {
    path: "articulos",
    component: ListadoArticulosComponent
  },
  {
    path: "alta-articulo",
    component: AltaArticuloComponent
  },
  {
    path: "clientes",
    component: ListadoClientesComponent
  }
];
