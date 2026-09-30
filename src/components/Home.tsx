import React from 'react';
import { Noticia, Pagina } from '../types';
import { NoticiaCard } from './NoticiaCard';

interface HomeProps {
  noticias: Noticia[];
  onVerDetalle: (noticia: Noticia) => void;
  favoritosIds: number[];
  onToggleFavorito: (noticia: Noticia) => void;
  setPaginaActual: (pagina: Pagina) => void;
}

export const Home: React.FC<HomeProps> = ({
  noticias,
  onVerDetalle,
  favoritosIds,
  onToggleFavorito,
  setPaginaActual,
}) => {
  const noticiasDestacadas = noticias.slice(0, 3);

  return (
    <div className="space-y-10 pb-12">
      <section className="bg-gray-100 border border-gray-300 rounded-lg p-8 sm:p-12 text-center max-w-5xl mx-auto shadow-sm">
        <span className="text-sm uppercase tracking-wider text-blue-700 font-bold block mb-2">
          Sección de bienvenida
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Explora noticias educativas, tecnológicas, turísticas y comerciales
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
          Mantente al día con los artículos más recientes sobre avances científicos, iniciativas de aprendizaje, destinos de viaje sostenibles y tendencias del comercio actual.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setPaginaActual('noticias')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow transition-colors"
          >
            Ver noticias
          </button>
          <button
            onClick={() => setPaginaActual('contacto')}
            className="bg-white hover:bg-gray-50 text-blue-600 font-semibold px-6 py-3 rounded-md border border-blue-600 transition-colors"
          >
            Contactar
          </button>
          <button
            onClick={() => setPaginaActual('acerca')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Acerca del proyecto
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Noticias destacadas</h2>
            <p className="text-sm text-gray-500">Últimas publicaciones seleccionadas de nuestra redacción</p>
          </div>
          <button
            onClick={() => setPaginaActual('noticias')}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
          >
            Ver catálogo completo &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {noticiasDestacadas.map((noticia) => (
            <NoticiaCard
              key={noticia.id}
              noticia={noticia}
              onVerDetalle={onVerDetalle}
              esFavorito={favoritosIds.includes(noticia.id)}
              onToggleFavorito={onToggleFavorito}
            />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Sección informativa / Testimonios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 p-5 rounded-md flex flex-col justify-between">
              <div>
                <span className="text-blue-600 font-bold text-xs uppercase block mb-1">Información</span>
                <h3 className="font-semibold text-gray-800 mb-2">Cobertura Integral</h3>
                <p className="text-sm text-gray-600">
                  Monitoreamos continuamente fuentes educativas, tecnológicas y comerciales para ofrecer reportes fidedignos y de alto valor formativo.
                </p>
              </div>
              <span className="text-xs text-gray-400 mt-4 block">Equipo Editorial 2026</span>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-5 rounded-md flex flex-col justify-between">
              <div>
                <span className="text-blue-600 font-bold text-xs uppercase block mb-1">Testimonio</span>
                <p className="text-sm text-gray-700 italic mb-3">
                  "La plataforma me permite organizar mis lecturas académicas y guardar en favoritos los artículos necesarios para mis proyectos de investigación universitaria."
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-600">Mariana Gómez — Estudiante de Ingeniería</span>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-5 rounded-md flex flex-col justify-between">
              <div>
                <span className="text-blue-600 font-bold text-xs uppercase block mb-1">Testimonio</span>
                <p className="text-sm text-gray-700 italic mb-3">
                  "El diseño es limpio, directo y la interacción con los módulos de contacto y favoritos responde de manera inmediata en cualquier navegador."
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-600">Carlos Rengifo — Docente de Comunicación</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-800">¿Tienes una noticia o experiencia para compartir?</span>
              <p className="text-xs text-gray-500">Escríbenos a través de nuestro formulario de contacto.</p>
            </div>
            <button
              onClick={() => setPaginaActual('contacto')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors whitespace-nowrap"
            >
              Ir a Contacto
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
