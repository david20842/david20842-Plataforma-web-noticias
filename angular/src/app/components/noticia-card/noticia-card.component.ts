import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia-card.component.html'
})
export class NoticiaCardComponent {
  @Input() noticia!: Noticia;
  @Input() esFavorito: boolean = false;
  @Input() mostrarBotonEliminar: boolean = false;

  @Output() verDetalle = new EventEmitter<Noticia>();
  @Output() toggleFavorito = new EventEmitter<Noticia>();
  @Output() eliminar = new EventEmitter<number>();

  onVerDetalle(): void {
    this.verDetalle.emit(this.noticia);
  }

  onToggleFavorito(): void {
    this.toggleFavorito.emit(this.noticia);
  }

  onEliminar(): void {
    this.eliminar.emit(this.noticia.id);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';
  }
}
