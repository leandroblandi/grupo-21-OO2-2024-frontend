import { Component, OnInit } from '@angular/core';
import Articulo from '../../core/models/articulo';
import { ArticuloService } from '../../core/services/articulo.service';
import { VentaService } from '../../core/services/venta.service';
import { ToastrService } from 'ngx-toastr';
import ItemDto from '../../core/models/item.dto';
import { Router, RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './comprar.component.html',
  styleUrl: './comprar.component.css'
})
export class ComprarComponent implements OnInit{
  articulos: Articulo[] = [];
  idsArticulos: number[] = [];
  articulosSelected: Articulo[] = [];
  itemsDto: ItemDto[] = [];
  horaHoy: number = new Date().getHours();
  sumaTotal: number = 0;

  constructor(
    private articuloService: ArticuloService,
    private ventaService: VentaService,
    private toast: ToastrService,
    private router: Router,
    private title: Title
  ) { }


  ngOnInit() {
    if(localStorage.getItem("articulos")
    && localStorage.getItem("articulos_en_carrito")) {
      this.articulos = JSON.parse(localStorage.getItem("articulos")!);
      this.idsArticulos = JSON.parse(localStorage.getItem("articulos_en_carrito")!);
      this.itemsDto = this.getItemDtoByIds(this.idsArticulos);
      this.sumaTotal = this.calcularTotalItems();
    } else {
      this.verificarItems();
    }
    this.title.setTitle("Hastock :: Carrito de compra");
  }

  getItemDtoByIds(ids: number[]): ItemDto[] {
    const articulos: Articulo[] = this.getArticulosByIds(ids);
    const dtos: ItemDto[] = [];

    for(let articulo of articulos) {
      dtos.push({
        id: articulo.idArticulo,
        descripcion: articulo.descripcion,
        cantidad: 1,
        precio: articulo.precioVenta
      });
    }
    
    return dtos;
  }

  getArticulosByIds(ids: number[]) {
    const articulos: Articulo[] = [];
    for(let id of ids) {
      let artBuscar: Articulo | undefined = this.articulos.find(a => a.idArticulo == id);
      if(artBuscar) {
        articulos.push(artBuscar);
      }
    }
    return articulos;
  }

  sumarCantidadItem(item: ItemDto) {
    let indice = this.itemsDto.indexOf(item);

    if(indice != -1) {
      let itemModificado = item;
      itemModificado.cantidad = itemModificado.cantidad + 1;
      this.itemsDto[indice] = itemModificado
      this.sumaTotal += item.precio;
    }
  }

  restarCantidadItem(item: ItemDto) {
    console.log("", item);

    let indice = this.itemsDto.indexOf(item);

    if(indice != -1 && item.cantidad > 1) {
      let itemModificado = item;
      itemModificado.cantidad = itemModificado.cantidad - 1;
      this.itemsDto[indice] = itemModificado
      this.sumaTotal -= item.precio;
    }

  }

  realizarCompra() {

  }

  verificarItems() {
    if(this.idsArticulos.length == 0
      || !localStorage.getItem("articulos")
      || !localStorage.getItem("articulos_en_carrito")
    ) {
      this.toast.error("No hay items en el carrito para realizar la compra", "¡Oops!");
      this.router.navigate(["/articulos"]);
    }
  }

  eliminarItem(item: ItemDto) {
    this.idsArticulos = this.idsArticulos.filter(id => id != item.id);
    localStorage.setItem("articulos_en_carrito", JSON.stringify(this.idsArticulos));
    this.itemsDto = this.itemsDto.filter(i => i.id != item.id);
    
    if(this.idsArticulos.length == 0) {
      localStorage.removeItem("articulos_en_carrito");
    }

    this.verificarItems();
  }

  calcularTotalItems() {
    let sumaTotal: number = 0;

    for(let item of this.itemsDto) {
      sumaTotal += item.precio;
    }

    return sumaTotal;
  }
}
