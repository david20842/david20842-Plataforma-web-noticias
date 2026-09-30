import React, { useState, useEffect } from 'react';
import datosIniciales from './data/noticias.json';
import { Noticia, Pagina } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { ListadoNoticias } from './components/ListadoNoticias';
import { DetalleNoticia } from './components/DetalleNoticia';
import { Favoritos } from './components/Favoritos';
import { Contacto } from './components/Contacto';
import { AcercaDe } from './components/AcercaDe';

export default function App() {
  const [noticias, setNoticias] = useState<Noticia[]>(() => {
    const guardadas = localStorage.getItem('noticias_catalogo');
    if (guardadas) {
      try {
        return JSON.parse(guardadas);
      } catch {
        return datosIniciales;
      }
    }
    return datosIniciales;
  });

  const [favoritosIds, setFavoritosIds] = useState<number[]>(() => {
    const favs = localStorage.getItem('noticias_favoritos');
    if (favs) {
      try {
        return JSON.parse(favs);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [paginaActual, setPaginaActual] = useState<Pagina>('inicio');
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);

  useEffect(() => {
    localStorage.setItem('noticias_catalogo', JSON.stringify(noticias));
  }, [noticias]);

  useEffect(() => {
    localStorage.setItem('noticias_favoritos', JSON.stringify(favoritosIds));
  }, [favoritosIds]);

  const handleVerDetalle = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setPaginaActual('detalle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorito = (noticia: Noticia) => {
    setFavoritosIds((prev) => {
      if (prev.includes(noticia.id)) {
        return prev.filter((id) => id !== noticia.id);
      } else {
        return [...prev, noticia.id];
      }
    });
  };

  const handleCrearNoticia = (nueva: Omit<Noticia, 'id'>) => {
    const nuevoId = noticias.length > 0 ? Math.max(...noticias.map((n) => n.id)) + 1 : 1;
    const noticiaCompleta: Noticia = {
      ...nueva,
      id: nuevoId,
    };
    setNoticias([noticiaCompleta, ...noticias]);
  };

  const handleEliminarNoticia = (id: number) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta noticia?');
    if (!confirmacion) return;

    setNoticias((prev) => prev.filter((n) => n.id !== id));
    setFavoritosIds((prev) => prev.filter((favId) => favId !== id));

    if (noticiaSeleccionada && noticiaSeleccionada.id === id) {
      setNoticiaSeleccionada(null);
      setPaginaActual('noticias');
    }
  };

  const handleRestablecerDatos = () => {
    setNoticias(datosIniciales);
    localStorage.setItem('noticias_catalogo', JSON.stringify(datosIniciales));
  };

  const cambiarPagina = (pagina: Pagina) => {
    setPaginaActual(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
      <Header
        paginaActual={paginaActual}
        setPaginaActual={cambiarPagina}
        cantidadFavoritos={favoritosIds.length}
      />

      <main className="flex-1 py-6">
        {paginaActual === 'inicio' && (
          <Home
            noticias={noticias}
            onVerDetalle={handleVerDetalle}
            favoritosIds={favoritosIds}
            onToggleFavorito={handleToggleFavorito}
            setPaginaActual={cambiarPagina}
          />
        )}

        {paginaActual === 'noticias' && (
          <ListadoNoticias
            noticias={noticias}
            onVerDetalle={handleVerDetalle}
            favoritosIds={favoritosIds}
            onToggleFavorito={handleToggleFavorito}
            onCrearNoticia={handleCrearNoticia}
            onEliminarNoticia={handleEliminarNoticia}
            onRestablecerDatos={handleRestablecerDatos}
          />
        )}

        {paginaActual === 'detalle' && (
          <DetalleNoticia
            noticia={noticiaSeleccionada}
            onVolver={() => cambiarPagina('noticias')}
            esFavorito={noticiaSeleccionada ? favoritosIds.includes(noticiaSeleccionada.id) : false}
            onToggleFavorito={handleToggleFavorito}
            setPaginaActual={cambiarPagina}
          />
        )}

        {paginaActual === 'favoritos' && (
          <Favoritos
            noticias={noticias}
            favoritosIds={favoritosIds}
            onVerDetalle={handleVerDetalle}
            onToggleFavorito={handleToggleFavorito}
            setPaginaActual={cambiarPagina}
          />
        )}

        {paginaActual === 'contacto' && <Contacto />}

        {paginaActual === 'acerca' && <AcercaDe />}
      </main>

      <Footer setPaginaActual={cambiarPagina} />
    </div>
  );
}
