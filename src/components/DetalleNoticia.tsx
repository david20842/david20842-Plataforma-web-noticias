import React from 'react';
import { Noticia, Pagina } from '../types';

interface DetalleNoticiaProps {
  noticia: Noticia | null;
  onVolver: () => void;
  esFavorito: boolean;
  onToggleFavorito: (noticia: Noticia) => void;
  setPaginaActual: (pagina: Pagina) => void;
}

export const DetalleNoticia: React.FC<DetalleNoticiaProps> = ({
  noticia,
  onVolver,
  esFavorito,
  onToggleFavorito,
  setPaginaActual,
}) => {
  if (!noticia) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">No se ha seleccionado ninguna noticia.</p>
        <button
          onClick={onVolver}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Volver al listado de noticias
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onVolver}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            &larr; Volver al catálogo
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded">
            {noticia.categoria}
          </span>
        </div>
        <span className="text-xs text-gray-500">Publicado: {noticia.fecha}</span>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <div className="w-full h-72 sm:h-96 bg-gray-200 overflow-hidden relative">
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {noticia.titulo}
          </h1>

          <div className="bg-gray-50 border-l-4 border-blue-600 p-4 rounded-r text-gray-700 font-medium text-base">
            {noticia.descripcion}
          </div>

          <div className="border border-gray-200 rounded p-6 bg-white space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Información completa de la noticia (texto extendido)
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
              {noticia.contenido}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onToggleFavorito(noticia)}
              className={`px-5 py-2.5 rounded font-semibold text-sm transition-colors flex items-center gap-2 ${
                esFavorito
                  ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-950 shadow'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={esFavorito ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span>{esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
            </button>

            <button
              onClick={() => setPaginaActual('contacto')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 font-semibold px-5 py-2.5 rounded text-sm transition-colors"
            >
              Contacto
            </button>

            <button
              onClick={onVolver}
              className="ml-auto text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Volver al listado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
