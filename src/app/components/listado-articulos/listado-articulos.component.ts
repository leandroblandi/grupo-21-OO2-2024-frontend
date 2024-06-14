import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../core/services/articulo.service';
import Articulo from '../../core/models/articulo';
import { ToastrService } from 'ngx-toastr';
import Rol from '../../core/models/rol';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-listado-articulos',
  standalone: true,
  imports: [],
  templateUrl: './listado-articulos.component.html',
  styleUrl: './listado-articulos.component.css'
})
export class ListadoArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  rol: Rol = {
    authority: "ROLE_CLIENTE"
  }

  constructor(
    private articuloService: ArticuloService,
    private toast: ToastrService,
    private loginService: LoginService) { }
  
  ngOnInit(): void {
    this.getArticulos();
    this.rol = this.loginService.getRolUsuario();
  }

  getArticulos(): void {
    this.articuloService.getArticulos().subscribe({
      next: (res) => {
        this.articulos = res;
      }, error: (err) => {
        this.toast.error("Hubo un error al obtener los articulos", "¡Oops!");
      }
    });
  }
}
