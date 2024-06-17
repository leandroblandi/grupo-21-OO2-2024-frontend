import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticuloService } from '../../core/services/articulo.service';
import { LoteService } from '../../core/services/lote.service';
import { ToastrService } from 'ngx-toastr';
import Articulo from '../../core/models/articulo';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-alta-lote',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './alta-lote.component.html',
  styleUrl: './alta-lote.component.css'
})
export class AltaLoteComponent implements OnInit {
  cantidad: number = 0;
  idArticulo: number = 0;
  proveedor: string = "";
  articulos: Articulo[] = [];
  
  constructor(
    private articuloService: ArticuloService,
    private loteService: LoteService,
    private toast: ToastrService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
      this.getArticulos();
  }

  getArticulos() {
    this.articuloService.getArticulos().subscribe({
      next: (res) => {
        this.articulos = res;
      }, error: (err) => {
        this.toast.error("Hubo un error al obtener los artículos", "¡Oops!");
      }
    });
  }

  crearLote() {
    if(this.idArticulo > 0
      && this.cantidad > 0
      && this.proveedor != ""
    ) {
      let articuloSelected: Articulo = this.getArticuloById(this.idArticulo);
      this.loteService.crearLote(this.idArticulo, this.cantidad, 0, this.proveedor, articuloSelected.costo).subscribe({
        next: (res) => {
          this.toast.success("Lote creado exitosamente", "¡Éxito!");
          this.router.navigate(["/lotes"]);
        }, error: (err) => {
          this.toast.error("Hubo un error al crear el lote", "¡Oops!");
        }
      });
    }
  }
  
  getArticuloById(id: number): Articulo {
    return this.articulos.find(art => art.idArticulo == id)!;
  }
}
