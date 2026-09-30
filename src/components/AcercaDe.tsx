import React from 'react';

export const AcercaDe: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
      <div className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 shadow-sm">
        <div className="border-b pb-4 mb-6">
          <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">
            Información Institucional y Académica
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            Acerca del Proyecto
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Entrega 2 – Prototipo funcional (Semana 5)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded p-5 space-y-3">
            <h2 className="text-base font-bold text-gray-800 border-b pb-2">
              Datos del Módulo
            </h2>
            <div className="text-sm text-gray-700 space-y-1.5">
              <p>
                <span className="font-semibold text-gray-900">Institución:</span> Politécnico Grancolombiano
              </p>
              <p>
                <span className="font-semibold text-gray-900">Módulo:</span> Desarrollo de Front-end (Teórico - Práctico)
              </p>
              <p>
                <span className="font-semibold text-gray-900">Nivel académico:</span> Profesional
              </p>
              <p>
                <span className="font-semibold text-gray-900">Docente tutor:</span> John Olarte Ramos
              </p>
              <p>
                <span className="font-semibold text-gray-900">Fecha de entrega:</span> Agosto / Septiembre 2026
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded p-5 space-y-3">
            <h2 className="text-base font-bold text-gray-800 border-b pb-2">
              Autor / Estudiante
            </h2>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="p-3 bg-white rounded border border-gray-200">
                <p className="font-semibold text-gray-900 text-base">David Fernando Gonzalez Garcia</p>
                <p className="text-xs text-gray-500 mt-0.5">Estudiante Politécnico Grancolombiano</p>
                <p className="text-xs text-blue-600 mt-1">Desarrollo de Front-end</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded p-6 bg-white space-y-4">
          <h2 className="text-lg font-bold text-gray-800">
            Requerimientos Implementados en la Entrega 2
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Desarrollo en HTML, CSS (Tailwind) y JavaScript / TypeScript</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Renderizado dinámico de noticias desde archivo JSON</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Gestión de favoritos persistente mediante localStorage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Formulario de contacto con validaciones de campos y correo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mensaje de confirmación tras el envío exitoso</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mini CRUD: creación de nuevas noticias y eliminación</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Vistas correspondientes con la maquetación (mockups) de la Entrega 1</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Navegación de 5 páginas: Inicio, Noticias, Favoritos, Contacto, Acerca de</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
