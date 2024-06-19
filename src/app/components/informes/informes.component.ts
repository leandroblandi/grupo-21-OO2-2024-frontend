import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticuloService } from '../../core/services/articulo.service';
import Articulo from '../../core/models/articulo';
import Rol from '../../core/models/rol';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  articulos: Articulo[] = [];
  rol: Rol = {
    authority: "ROLE_ADMINISTRADOR"
  }

  constructor(private toast: ToastrService,
    private router: Router,
    private title: Title,
    private articuloService: ArticuloService) {
  }

  ngOnInit() {
    this.title.setTitle("Hastock :: Informes");
  }

  getArticulosMasVendidos(): void{

  }

}
