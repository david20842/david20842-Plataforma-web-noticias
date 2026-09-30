export interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  contenido: string;
  imagen: string;
  fecha: string;
}

export type Pagina = 'inicio' | 'noticias' | 'detalle' | 'favoritos' | 'contacto' | 'acerca';
