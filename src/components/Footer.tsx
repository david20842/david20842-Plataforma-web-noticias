import React from 'react';
import { Pagina } from '../types';

interface FooterProps {
  setPaginaActual: (pagina: Pagina) => void;
}

export const Footer: React.FC<FooterProps> = ({ setPaginaActual }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto py-8 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium mb-4">
          <button
            onClick={() => setPaginaActual('inicio')}
            className="hover:text-white transition-colors"
          >
            Inicio
          </button>
          <span>|</span>
          <button
            onClick={() => setPaginaActual('noticias')}
            className="hover:text-white transition-colors"
          >
            Noticias
          </button>
          <span>|</span>
          <button
            onClick={() => setPaginaActual('favoritos')}
            className="hover:text-white transition-colors"
          >
            Favoritos
          </button>
          <span>|</span>
          <button
            onClick={() => setPaginaActual('contacto')}
            className="hover:text-white transition-colors"
          >
            Contacto
          </button>
          <span>|</span>
          <button
            onClick={() => setPaginaActual('acerca')}
            className="hover:text-white transition-colors"
          >
            Acerca de
          </button>
        </div>

        <div className="text-sm text-gray-400 mb-2">
          <span>Contacto: contacto@noticiasweb.edu.co</span>
          <span className="mx-2">•</span>
          <span>Redes sociales: @noticiasweb_col</span>
        </div>

        <p className="text-xs text-gray-500">
          Footer | Contacto | Redes sociales | © 2026 Plataforma Web de Noticias. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
