import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagina } from '../../models/noticia.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() paginaActual: Pagina = 'inicio';
  @Input() cantidadFavoritos: number = 0;
  @Output() cambioPagina = new EventEmitter<Pagina>();

  navegar(pagina: Pagina): void {
    this.cambioPagina.emit(pagina);
  }
}
