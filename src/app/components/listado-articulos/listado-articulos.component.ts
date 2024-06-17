import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../core/services/articulo.service';
import Articulo from '../../core/models/articulo';
import { ToastrService } from 'ngx-toastr';
import Rol from '../../core/models/rol';
import { LoginService } from '../../core/services/login.service';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listado-articulos',
  standalone: true,
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './listado-articulos.component.html',
  styleUrl: './listado-articulos.component.css'
})
export class ListadoArticulosComponent implements OnInit {
  carrito: number[] = [];
  ningunArticuloActivo: boolean = true;
  articulos: Articulo[] = [];
  rol: Rol = {
    authority: "ROLE_CLIENTE"
  }

  constructor(
    private articuloService: ArticuloService,
    private toast: ToastrService,
    private loginService: LoginService,
    private title: Title
  ) { }
  
  ngOnInit(): void {
    this.getArticulos();
    this.actualizarListArticulos();
    this.rol = this.loginService.getRolUsuario();
    this.setearCarrito();
    this.title.setTitle("Hastock :: Artículos");
  }

  setearCarrito(): void {
    if(localStorage.getItem("articulos_en_carrito")) {
      this.carrito = JSON.parse(localStorage.getItem("articulos_en_carrito")!);
    }
  }
  
  getArticulos(): void {
    this.articuloService.getArticulos().subscribe({
      next: (res) => {
        this.articulos = res;
        this.actualizarListArticulos();
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
        break;
      }
    }
    this.ningunArticuloActivo = !algunArtActivo;
  }

  agregarAlCarrito(articulo: Articulo) {
    if(this.carrito.find(cadaId => cadaId == articulo.idArticulo) == undefined) {
      this.carrito.push(articulo.idArticulo);
      localStorage.setItem("articulos_en_carrito", JSON.stringify(this.carrito))
      this.toast.success(`Agregaste "${articulo.descripcion}" al carrito`, "¡Listo!"); 
    } else {
      this.toast.warning("El carrito ya tiene ese item", "¡Cuidado!");
    }
  }

  limpiarCarrito() {
    this.carrito = [];
    localStorage.removeItem("articulos_en_carrito");
    this.toast.info("Carrito eliminado", "¡Listo!")
  }

  continuarAlCarrito() {
    localStorage.setItem("articulos", JSON.stringify(this.articulos));
  }
}
