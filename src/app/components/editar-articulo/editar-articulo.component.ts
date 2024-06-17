import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticuloService } from '../../core/services/articulo.service';
import { FormsModule } from '@angular/forms';
import Articulo from '../../core/models/articulo';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-articulo',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-articulo.component.html',
  styleUrl: './editar-articulo.component.css'
})
export class EditarArticuloComponent implements OnInit {
  descripcion: string = "";
  costo: number = 0;
  precioVenta: number = 0;
  idArticulo: number = 0;

  constructor(
    private articuloService: ArticuloService,
    private toast: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    this.idArticulo = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.getArticulo(this.idArticulo);
    this.title.setTitle("Hastock :: Editar artículo");
  }

  getArticulo(id: number) {
    this.articuloService.getArticulo(id).subscribe({
      next: (art) => {
        this.descripcion = art.descripcion;
        this.costo = art.costo;
        this.precioVenta = art.precioVenta;
      }, error: (err) => {
        this.toast.error("Hubo un error al obtener los datos del artículo a editar", "¡Oops!");
      }
    })
  }

  editarArticulo(): void {
    if(this.descripcion != ""
      && this.costo > 0
      && this.precioVenta > 0
    ) {
      this.articuloService.editarArticulo(this.idArticulo, this.descripcion, this.costo, this.precioVenta).subscribe({
        next: (res) => {
          this.toast.success("Artículo editado exitosamente", "¡Creado!");
          this.router.navigate(["/articulos"]);
        }, error: (err) => {
          this.toast.error("Hubo un problema al editar ese artículo", "¡Oops!");
        }
      })
    } else {
      this.toast.warning("Te faltan completar algunos campos", "¡Cuidado!");
    }
  }
}
