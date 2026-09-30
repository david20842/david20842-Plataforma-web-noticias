import React from 'react';
import { Pagina } from '../types';

interface HeaderProps {
  paginaActual: Pagina;
  setPaginaActual: (pagina: Pagina) => void;
  cantidadFavoritos: number;
}

export const Header: React.FC<HeaderProps> = ({
  paginaActual,
  setPaginaActual,
  cantidadFavoritos,
}) => {
  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div
          onClick={() => setPaginaActual('inicio')}
          className="cursor-pointer text-xl md:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          Plataforma Web de Noticias
        </div>

        <nav className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
          <button
            onClick={() => setPaginaActual('inicio')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              paginaActual === 'inicio'
                ? 'bg-blue-800 text-white shadow-inner'
                : 'hover:bg-blue-700 text-blue-50'
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => setPaginaActual('noticias')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              paginaActual === 'noticias'
                ? 'bg-blue-800 text-white shadow-inner'
                : 'hover:bg-blue-700 text-blue-50'
            }`}
          >
            Noticias
          </button>

          <button
            onClick={() => setPaginaActual('favoritos')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1.5 ${
              paginaActual === 'favoritos'
                ? 'bg-blue-800 text-white shadow-inner'
                : 'hover:bg-blue-700 text-blue-50'
            }`}
          >
            <span>Favoritos</span>
            {cantidadFavoritos > 0 && (
              <span className="bg-yellow-400 text-blue-950 font-bold text-xs px-1.5 py-0.5 rounded-full">
                {cantidadFavoritos}
              </span>
            )}
          </button>

          <button
            onClick={() => setPaginaActual('contacto')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              paginaActual === 'contacto'
                ? 'bg-blue-800 text-white shadow-inner'
                : 'hover:bg-blue-700 text-blue-50'
            }`}
          >
            Contacto
          </button>

          <button
            onClick={() => setPaginaActual('acerca')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              paginaActual === 'acerca'
                ? 'bg-blue-800 text-white shadow-inner'
                : 'hover:bg-blue-700 text-blue-50'
            }`}
          >
            Acerca de
          </button>
        </nav>
      </div>
    </header>
  );
};
