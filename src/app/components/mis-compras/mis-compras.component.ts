import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from '../../core/services/venta.service';
import Venta from '../../core/models/venta';
import Usuario from '../../core/models/usuario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  standalone: true,
  imports: [DatePipe],
  styleUrls: ['./mis-compras.component.css'],
})
export class MisComprasComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private router: Router,
    private title: Title,
    private ventaService: VentaService
  ) {}

  ngOnInit() {
    this.title.setTitle('Hastock :: Mis Compras');
    this.obtenerCompras();
  }

  ventas: Venta[] = [];

  obtenerCompras(): void {
    let usuario = localStorage.getItem('usuario')!;
    this.ventaService.getVentasPorUsuario(usuario).subscribe({
      next: (res) => {
        this.toast.success('Ventas traidas correctamente', '¡Listo!');
        this.ventas = res.reverse();
        console.log(res);
      },
      error: (err) => {
        this.toast.error(
          'Hubo un error al realizar el pedido de obtener tus compras',
          '¡Oops!'
        );
      },
    });
  }
}
