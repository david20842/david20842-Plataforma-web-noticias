import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Noticia, Pagina } from './models/noticia.model';
import { NoticiasService } from './services/noticias.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListadoNoticiasComponent } from './components/listado-noticias/listado-noticias.component';
import { DetalleNoticiaComponent } from './components/detalle-noticia/detalle-noticia.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListadoNoticiasComponent,
    DetalleNoticiaComponent,
    FavoritosComponent,
    ContactoComponent,
    AcercaDeComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  paginaActual: Pagina = 'inicio';
  noticias: Noticia[] = [];
  favoritosIds: number[] = [];
  noticiaSeleccionada: Noticia | null = null;

  private subNoticias!: Subscription;
  private subFavoritos!: Subscription;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.subNoticias = this.noticiasService.noticias$.subscribe(data => {
      this.noticias = data;
    });

    this.subFavoritos = this.noticiasService.favoritos$.subscribe(favs => {
      this.favoritosIds = favs;
    });
  }

  ngOnDestroy(): void {
    if (this.subNoticias) this.subNoticias.unsubscribe();
    if (this.subFavoritos) this.subFavoritos.unsubscribe();
  }

  cambiarPagina(pagina: Pagina): void {
    this.paginaActual = pagina;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  verDetalle(noticia: Noticia): void {
    this.noticiaSeleccionada = noticia;
    this.paginaActual = 'detalle';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onToggleFavorito(noticia: Noticia): void {
    this.noticiasService.toggleFavorito(noticia.id);
  }

  onCrearNoticia(nueva: Omit<Noticia, 'id'>): void {
    this.noticiasService.crearNoticia(nueva);
  }

  onEliminarNoticia(id: number): void {
    this.noticiasService.eliminarNoticia(id);
    if (this.noticiaSeleccionada && this.noticiaSeleccionada.id === id) {
      this.noticiaSeleccionada = null;
      this.paginaActual = 'noticias';
    }
  }

  onRestablecerDatos(): void {
    this.noticiasService.restablecerDatos();
  }

  esNoticiaFavorita(noticia: Noticia | null): boolean {
    if (!noticia) return false;
    return this.favoritosIds.includes(noticia.id);
  }
}
