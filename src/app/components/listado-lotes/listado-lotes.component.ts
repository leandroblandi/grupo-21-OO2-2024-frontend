import { Component, OnInit } from '@angular/core';
import { LoteService } from '../../core/services/lote.service';
import { ToastrService } from 'ngx-toastr';
import LoteArticulo from '../../core/models/loteArticulo';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LoginService } from '../../core/services/login.service';
import Rol from '../../core/models/rol';

@Component({
  selector: 'app-listado-lotes',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './listado-lotes.component.html',
  styleUrl: './listado-lotes.component.css'
})
export class ListadoLotesComponent implements OnInit {
  lotes: LoteArticulo[] = [];
  rol: Rol = {
    authority: "ROLE_CLIENTE"
  }

  constructor(
    private loteService: LoteService, 
    private toast: ToastrService,
    private loginService: LoginService
  ) { }


  ngOnInit(): void {
    this.getLotes();
    this.rol = this.loginService.getRolUsuario();
  }

  getLotes(): void {
    this.loteService.getLotes().subscribe({
      next: (res) => {
        this.lotes = res;
      }, error: (err) => {
        this.toast.error("Hubo un error al obtener los lotes de articulos", "¡Oops!");
      }
    })
  }

  eliminarLote(id: number): void {
    this.loteService.eliminarLote(id).subscribe({
      next: (res) => {
        if(res) {
          this.toast.success("Lote eliminado correctamente", "¡Listo!");
          this.eliminarLoteDeLista(id);
        } else {
          this.toast.error("Hubo un error al eliminar ese lote", "¡Oops!");
        }
      }, error: (err) => {
        this.toast.error("Hubo un error al eliminar ese lote", "¡Oops!");
      }
    })
  }

  eliminarLoteDeLista(idLote: number): void {
    this.lotes= this.lotes.filter(cadaLote => cadaLote.idLote != idLote);
  }
}
