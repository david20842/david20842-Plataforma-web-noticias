import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Noticia, Pagina } from '../../models/noticia.model';
import { NoticiaCardComponent } from '../noticia-card/noticia-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NoticiaCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  @Input() noticias: Noticia[] = [];
  @Input() favoritosIds: number[] = [];

  @Output() verDetalle = new EventEmitter<Noticia>();
  @Output() toggleFavorito = new EventEmitter<Noticia>();
  @Output() cambioPagina = new EventEmitter<Pagina>();

  get noticiasDestacadas(): Noticia[] {
    return this.noticias.slice(0, 3);
  }

  esFavorito(id: number): boolean {
    return this.favoritosIds.includes(id);
  }

  onVerDetalle(noticia: Noticia): void {
    this.verDetalle.emit(noticia);
  }

  onToggleFavorito(noticia: Noticia): void {
    this.toggleFavorito.emit(noticia);
  }

  navegar(pagina: Pagina): void {
    this.cambioPagina.emit(pagina);
  }
}
