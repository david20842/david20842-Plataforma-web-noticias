import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Noticia, Pagina } from '../../models/noticia.model';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-noticia.component.html'
})
export class DetalleNoticiaComponent {
  @Input() noticia: Noticia | null = null;
  @Input() esFavorito: boolean = false;

  @Output() volver = new EventEmitter<void>();
  @Output() toggleFavorito = new EventEmitter<Noticia>();
  @Output() cambioPagina = new EventEmitter<Pagina>();

  onToggleFavorito(): void {
    if (this.noticia) {
      this.toggleFavorito.emit(this.noticia);
    }
  }

  navegar(pagina: Pagina): void {
    this.cambioPagina.emit(pagina);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';
  }
}
