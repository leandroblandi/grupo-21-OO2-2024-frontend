import { InformeService } from './../../core/services/informe.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticuloService } from '../../core/services/articulo.service';
import Articulo from '../../core/models/articulo';
import Rol from '../../core/models/rol';
import ArticuloCantidadDto from '../../core/models/articulo-cantidad.dto';
import { environment } from '../../environments/environment';
import ArticuloDiasDto from '../../core/models/articulo-dias.dto';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./informes.component.css'],
})
export class InformesComponent implements OnInit {
  listaArticulosMasVendidos: ArticuloCantidadDto[] = [];
  listaArticulosConMasDias: ArticuloDiasDto[] = [];

  totalVentas: number = 0;
  totalClientes: number = 0;
  totalAdministradores: number = 0;

  rol: Rol = {
    authority: 'ROLE_ADMINISTRADOR',
  };

  constructor(
    private toast: ToastrService,
    private router: Router,
    private title: Title,
    private informeService: InformeService
  ) {}

  ngOnInit() {
    this.title.setTitle("Hastock :: Informes");
    this.getArticulosMasVendidos();
    this.getArticulosConMasDias();
    this.getTotalVentas();
    this.getTotalClientes();
    this.getTotalAdministradores();
  }

  getArticulosMasVendidos(): void{
    this.informeService.getArticulosMasVendidos().subscribe({
      next: (res) =>{
        this.listaArticulosMasVendidos = res;
      }, error: (err) => {
        this.toast.error("Hubo un error al obtener los artículos más vendidos", "¡Oops!")
      }
    })
  }

  getArticulosConMasDias(): void{
    this.informeService.getArticulosConMasDias(90).subscribe({
      next: (res) => {
        this.listaArticulosConMasDias = res;

      }, error: (err) => {
        this.toast.error("Hubo un error al obtener los artículos con más días", "¡Oops!");
      }
    })
  }

  getTotalVentas(): void{
    this.informeService.getTotalVentas().subscribe({
      next: (res) => {
        this.totalVentas = res;

        interval(120).pipe(
          take(res + 1) // Tomar hasta el valor máximo
        ).subscribe(count => {
          this.totalVentas = count;
        });

      }, error: (err) => {
        this.toast.error("Hubo un error al obtener el total de ventas", "¡Oops!");
      }
    })
  }

  getTotalClientes(): void{
    this.informeService.getTotalClientes().subscribe({
      next: (res) => {
        this.totalClientes = res;

        interval(120).pipe(
          take(res + 1)
        ).subscribe(count => {
          this.totalClientes = count;
        });

      }, error: (err) => {
        this.toast.error("Hubo un error al obtener el total de clientes", "¡Oops!");
      }
    })
  }

  getTotalAdministradores(): void{
    this.informeService.getTotalAdministradores().subscribe({
      next: (res) => {
        this.totalAdministradores = res;

        interval(120).pipe(
          take(res + 1)
        ).subscribe(count => {
          this.totalAdministradores = count;
        });

      }, error: (err) => {
        this.toast.error("Hubo un error al obtener el total de administradores", "¡Oops!");
      }
    })
  }
}
