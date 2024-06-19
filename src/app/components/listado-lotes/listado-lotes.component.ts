import { Component, OnInit } from '@angular/core';
import { LoteService } from '../../core/services/lote.service';
import { ToastrService } from 'ngx-toastr';
import LoteArticulo from '../../core/models/loteArticulo';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LoginService } from '../../core/services/login.service';
import Rol from '../../core/models/rol';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-listado-lotes',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterModule, FormsModule],
  templateUrl: './listado-lotes.component.html',
  styleUrl: './listado-lotes.component.css',
})
export class ListadoLotesComponent implements OnInit {
  idArticuloLote: number = 0;
  mostrarModalAprovisionamiento: boolean = false;
  cantidadAprovisionar: number = 0;
  lotes: LoteArticulo[] = [];
  rol: Rol = {
    authority: 'ROLE_CLIENTE',
  };

  constructor(
    private loteService: LoteService,
    private toast: ToastrService,
    private loginService: LoginService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.getLotes();
    this.rol = this.loginService.getRolUsuario();
    this.title.setTitle('Hastock :: Lotes de artículos');
  }

  getLotes(): void {
    this.loteService.getLotes().subscribe({
      next: (res) => {
        this.lotes = res;
      },
      error: (err) => {
        this.toast.error(
          'Hubo un error al obtener los lotes de articulos',
          '¡Oops!'
        );
      },
    });
  }

  abrirModal(lote: LoteArticulo): void {
    this.idArticuloLote = lote.articulo.idArticulo;
    this.mostrarModalAprovisionamiento = true;
  }

  closeModal(): void {
    this.mostrarModalAprovisionamiento = false;
  }

  aprovisionar() {
    if (this.idArticuloLote > 0 && this.cantidadAprovisionar > 0) {
      this.loteService
        .aprovisionar(this.idArticuloLote, this.cantidadAprovisionar)
        .subscribe({
          next: (res) => {
            this.toast.success('Pedido realizado exitosamente', '¡Genial!');
            this.closeModal();
            this.getLotes();
          },
          error: (err) => {
            this.toast.error(
              'Hubo un problema al realizar el pedido de aprovisionamiento',
              '¡Oops!'
            );
          },
        });
    } else {
      this.toast.warning('Introduce una cantidad valida', '¡Cuidado!');
    }
  }

  eliminarLote(id: number): void {
    this.loteService.eliminarLote(id).subscribe({
      next: (res) => {
        if (res) {
          this.toast.success('Lote eliminado correctamente', '¡Listo!');
          this.eliminarLoteDeLista(id);
        } else {
          this.toast.error('Hubo un error al eliminar ese lote', '¡Oops!');
        }
      },
      error: (err) => {
        this.toast.error('Hubo un error al eliminar ese lote', '¡Oops!');
      },
    });
  }

  eliminarLoteDeLista(idLote: number): void {
    this.lotes = this.lotes.filter((cadaLote) => cadaLote.idLote != idLote);
  }
}
