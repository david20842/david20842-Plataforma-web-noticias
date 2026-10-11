import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticia } from '../models/noticia.model';
import datosIniciales from '../../assets/noticias.json';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticiasSubject = new BehaviorSubject<Noticia[]>([]);
  public noticias$: Observable<Noticia[]> = this.noticiasSubject.asObservable();

  private favoritosSubject = new BehaviorSubject<number[]>([]);
  public favoritos$: Observable<number[]> = this.favoritosSubject.asObservable();

  constructor() {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    const noticiasGuardadas = localStorage.getItem('noticias_catalogo');
    if (noticiasGuardadas) {
      try {
        this.noticiasSubject.next(JSON.parse(noticiasGuardadas));
      } catch {
        this.noticiasSubject.next(datosIniciales as Noticia[]);
      }
    } else {
      this.noticiasSubject.next(datosIniciales as Noticia[]);
    }

    const favsGuardados = localStorage.getItem('noticias_favoritos');
    if (favsGuardados) {
      try {
        this.favoritosSubject.next(JSON.parse(favsGuardados));
      } catch {
        this.favoritosSubject.next([]);
      }
    } else {
      this.favoritosSubject.next([]);
    }
  }

  public getNoticias(): Noticia[] {
    return this.noticiasSubject.value;
  }

  public getFavoritos(): number[] {
    return this.favoritosSubject.value;
  }

  public toggleFavorito(noticiaId: number): void {
    const actuales = [...this.favoritosSubject.value];
    const index = actuales.indexOf(noticiaId);
    if (index > -1) {
      actuales.splice(index, 1);
    } else {
      actuales.push(noticiaId);
    }
    this.favoritosSubject.next(actuales);
    localStorage.setItem('noticias_favoritos', JSON.stringify(actuales));
  }

  public crearNoticia(nueva: Omit<Noticia, 'id'>): void {
    const lista = [...this.noticiasSubject.value];
    const nuevoId = lista.length > 0 ? Math.max(...lista.map(n => n.id)) + 1 : 1;
    const noticiaCompleta: Noticia = { ...nueva, id: nuevoId };
    const actualizada = [noticiaCompleta, ...lista];
    this.noticiasSubject.next(actualizada);
    localStorage.setItem('noticias_catalogo', JSON.stringify(actualizada));
  }

  public eliminarNoticia(id: number): void {
    const lista = this.noticiasSubject.value.filter(n => n.id !== id);
    this.noticiasSubject.next(lista);
    localStorage.setItem('noticias_catalogo', JSON.stringify(lista));

    const favs = this.favoritosSubject.value.filter(favId => favId !== id);
    this.favoritosSubject.next(favs);
    localStorage.setItem('noticias_favoritos', JSON.stringify(favs));
  }

  public restablecerDatos(): void {
    this.noticiasSubject.next(datosIniciales as Noticia[]);
    localStorage.setItem('noticias_catalogo', JSON.stringify(datosIniciales));
  }
}
