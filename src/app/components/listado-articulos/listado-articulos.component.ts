import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../core/services/articulo.service';
import Articulo from '../../core/models/articulo';
import { ToastrService } from 'ngx-toastr';
import Rol from '../../core/models/rol';
import { LoginService } from '../../core/services/login.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-listado-articulos',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './listado-articulos.component.html',
  styleUrl: './listado-articulos.component.css'
})
export class ListadoArticulosComponent implements OnInit {
  ningunArticuloActivo: boolean = true;
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
    this.actualizarListArticulos();
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

  eliminarArticulo(id: number): void {
    this.articuloService.eliminarArticulo(id).subscribe({
      next: (res) => {
        this.toast.success("Articulo eliminado exitosamente", "¡Listo!");
        this.eliminarArticuloDeLista(id);
        this.actualizarListArticulos();
      }, error: (err) => {
        this.toast.error("Hubo un error al eliminar ese articulo", "¡Oops!");
      }
    })
  }

  eliminarArticuloDeLista(id: number): void {
    this.articulos = this.articulos.filter(art => art.idArticulo != id);
  }

  actualizarListArticulos(): void {
    let algunArtActivo: boolean = false;
    
    for(let articulo of this.articulos) {
      if(articulo.activo) {
        algunArtActivo = true;
      }
    }
    this.ningunArticuloActivo = !algunArtActivo;
  }
}
