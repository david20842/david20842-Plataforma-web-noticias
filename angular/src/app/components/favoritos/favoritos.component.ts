import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Noticia, Pagina } from '../../models/noticia.model';
import { NoticiaCardComponent } from '../noticia-card/noticia-card.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, NoticiaCardComponent],
  templateUrl: './favoritos.component.html'
})
export class FavoritosComponent {
  @Input() noticias: Noticia[] = [];
  @Input() favoritosIds: number[] = [];

  @Output() verDetalle = new EventEmitter<Noticia>();
  @Output() toggleFavorito = new EventEmitter<Noticia>();
  @Output() cambioPagina = new EventEmitter<Pagina>();

  get noticiasFavoritas(): Noticia[] {
    return this.noticias.filter(n => this.favoritosIds.includes(n.id));
  }

  navegar(pagina: Pagina): void {
    this.cambioPagina.emit(pagina);
  }
}
