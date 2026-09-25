import { Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { DisponibilidadPipe } from './disponibilidad-pipe';
import { ProductosService, Producto } from './productos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe, DisponibilidadPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'catalogo-productos';

  private productosService = inject(ProductosService);

  productos: Producto[] = this.productosService.getProductos();

  busqueda = signal('');

  actualizarBusqueda(valor: string) {
    this.busqueda.set(valor);
  }

  resultados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    if (!texto) {
      return this.productos;
    }
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
  });
}