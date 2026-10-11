import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Noticia } from '../../models/noticia.model';
import { NoticiaCardComponent } from '../noticia-card/noticia-card.component';

@Component({
  selector: 'app-listado-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, NoticiaCardComponent],
  templateUrl: './listado-noticias.component.html'
})
export class ListadoNoticiasComponent {
  @Input() noticias: Noticia[] = [];
  @Input() favoritosIds: number[] = [];

  @Output() verDetalle = new EventEmitter<Noticia>();
  @Output() toggleFavorito = new EventEmitter<Noticia>();
  @Output() crearNoticia = new EventEmitter<Omit<Noticia, 'id'>>();
  @Output() eliminarNoticia = new EventEmitter<number>();
  @Output() restablecerDatos = new EventEmitter<void>();

  categoriaSeleccionada: string = 'Todas';
  mostrarFormulario: boolean = false;

  titulo: string = '';
  categoria: string = 'Educación';
  descripcion: string = '';
  contenido: string = '';
  imagen: string = '';
  errorFormulario: string = '';
  mensajeExito: string = '';

  categorias: string[] = ['Todas', 'Educación', 'Tecnología', 'Turismo', 'Comercio'];

  get noticiasFiltradas(): Noticia[] {
    if (this.categoriaSeleccionada === 'Todas') {
      return this.noticias;
    }
    return this.noticias.filter(n => n.categoria === this.categoriaSeleccionada);
  }

  esFavorito(id: number): boolean {
    return this.favoritosIds.includes(id);
  }

  seleccionarCategoria(cat: string): void {
    this.categoriaSeleccionada = cat;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.errorFormulario = '';
  }

  onSubmit(): void {
    if (!this.titulo.trim() || !this.descripcion.trim() || !this.contenido.trim()) {
      this.errorFormulario = 'Por favor completa todos los campos obligatorios (*).';
      return;
    }

    const imagenFinal = this.imagen.trim() ||
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';

    this.crearNoticia.emit({
      titulo: this.titulo.trim(),
      categoria: this.categoria,
      descripcion: this.descripcion.trim(),
      contenido: this.contenido.trim(),
      imagen: imagenFinal,
      fecha: new Date().toISOString().split('T')[0]
    });

    this.titulo = '';
    this.descripcion = '';
    this.contenido = '';
    this.imagen = '';
    this.errorFormulario = '';
    this.mensajeExito = 'Noticia agregada con éxito al catálogo.';
    this.mostrarFormulario = false;

    setTimeout(() => {
      this.mensajeExito = '';
    }, 4000);
  }

  onEliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      this.eliminarNoticia.emit(id);
    }
  }
}
