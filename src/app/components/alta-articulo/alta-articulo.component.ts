import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticuloService } from '../../core/services/articulo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-alta-articulo',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './alta-articulo.component.html',
  styleUrl: './alta-articulo.component.css',
})
export class AltaArticuloComponent implements OnInit {
  descripcion: string = '';
  costo: number = 0;
  precioVenta: number = 0;

  constructor(
    private articuloService: ArticuloService,
    private toast: ToastrService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Hastock :: Alta de artículo');
  }

  crearArticulo(): void {
    if (this.descripcion != '' && this.costo > 0 && this.precioVenta > 0) {
      this.articuloService
        .crearArticulo(this.descripcion, this.costo, this.precioVenta)
        .subscribe({
          next: (res) => {
            this.toast.success('Artículo creado exitosamente', '¡Creado!');
            this.router.navigate(['/articulos']);
          },
          error: (err) => {
            this.toast.error(
              'Hubo un problema al crear ese artículo',
              '¡Oops!'
            );
          },
        });
    } else {
      this.toast.warning('Te faltan completar algunos campos', '¡Cuidado!');
    }
  }
}
