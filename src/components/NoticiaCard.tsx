import React from 'react';
import { Noticia } from '../types';

interface NoticiaCardProps {
  noticia: Noticia;
  onVerDetalle: (noticia: Noticia) => void;
  esFavorito: boolean;
  onToggleFavorito: (noticia: Noticia) => void;
  onEliminar?: (id: number) => void;
}

export const NoticiaCard: React.FC<NoticiaCardProps> = ({
  noticia,
  onVerDetalle,
  esFavorito,
  onToggleFavorito,
  onEliminar,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {noticia.categoria}
        </span>

        <button
          type="button"
          onClick={() => onToggleFavorito(noticia)}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow transition-colors ${
            esFavorito
              ? 'bg-yellow-400 text-yellow-950'
              : 'bg-white/90 text-gray-600 hover:text-yellow-600'
          }`}
          title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
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
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs text-gray-500 block mb-1">{noticia.fecha}</span>
          <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2">
            {noticia.titulo}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {noticia.descripcion}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onVerDetalle(noticia)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded transition-colors w-full text-center"
          >
            Ver más
          </button>

          {onEliminar && (
            <button
              type="button"
              onClick={() => onEliminar(noticia.id)}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm px-3 py-2 rounded transition-colors"
              title="Eliminar noticia"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
