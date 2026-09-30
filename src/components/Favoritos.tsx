import React from 'react';
import { Noticia, Pagina } from '../types';
import { NoticiaCard } from './NoticiaCard';

interface FavoritosProps {
  noticias: Noticia[];
  favoritosIds: number[];
  onVerDetalle: (noticia: Noticia) => void;
  onToggleFavorito: (noticia: Noticia) => void;
  setPaginaActual: (pagina: Pagina) => void;
}

export const Favoritos: React.FC<FavoritosProps> = ({
  noticias,
  favoritosIds,
  onVerDetalle,
  onToggleFavorito,
  setPaginaActual,
}) => {
  const noticiasFavoritas = noticias.filter((n) => favoritosIds.includes(n.id));

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 space-y-6">
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Noticias Favoritas</h1>
          <p className="text-sm text-gray-500">
            Lista personalizada de noticias guardadas localmente en el navegador (localStorage)
          </p>
        </div>

        <button
          onClick={() => setPaginaActual('noticias')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Explorar más noticias &rarr;
        </button>
      </div>

      {noticiasFavoritas.length === 0 ? (
        <div className="bg-white border border-gray-300 rounded-lg p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">No tienes noticias favoritas guardadas</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Puedes marcar cualquier noticia haciendo clic en el icono de estrella en el catálogo o usando el botón en la vista detallada.
          </p>
          <button
            onClick={() => setPaginaActual('noticias')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded text-sm transition-colors"
          >
            Ir al catálogo de noticias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticiasFavoritas.map((noticia) => (
            <NoticiaCard
              key={noticia.id}
              noticia={noticia}
              onVerDetalle={onVerDetalle}
              esFavorito={true}
              onToggleFavorito={onToggleFavorito}
            />
          ))}
        </div>
      )}
    </div>
  );
};
