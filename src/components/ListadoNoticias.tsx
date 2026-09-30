import React, { useState } from 'react';
import { Noticia } from '../types';
import { NoticiaCard } from './NoticiaCard';

interface ListadoNoticiasProps {
  noticias: Noticia[];
  onVerDetalle: (noticia: Noticia) => void;
  favoritosIds: number[];
  onToggleFavorito: (noticia: Noticia) => void;
  onCrearNoticia: (nuevaNoticia: Omit<Noticia, 'id'>) => void;
  onEliminarNoticia: (id: number) => void;
  onRestablecerDatos: () => void;
}

export const ListadoNoticias: React.FC<ListadoNoticiasProps> = ({
  noticias,
  onVerDetalle,
  favoritosIds,
  onToggleFavorito,
  onCrearNoticia,
  onEliminarNoticia,
  onRestablecerDatos,
}) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Educación');
  const [descripcion, setDescripcion] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState('');
  const [errorFormulario, setErrorFormulario] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const categorias = ['Todas', 'Educación', 'Tecnología', 'Turismo', 'Comercio'];

  const noticiasFiltradas =
    categoriaSeleccionada === 'Todas'
      ? noticias
      : noticias.filter((n) => n.categoria === categoriaSeleccionada);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descripcion.trim() || !contenido.trim()) {
      setErrorFormulario('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    const imagenFinal =
      imagen.trim() ||
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';

    onCrearNoticia({
      titulo: titulo.trim(),
      categoria,
      descripcion: descripcion.trim(),
      contenido: contenido.trim(),
      imagen: imagenFinal,
      fecha: new Date().toISOString().split('T')[0],
    });

    setTitulo('');
    setDescripcion('');
    setContenido('');
    setImagen('');
    setErrorFormulario('');
    setMensajeExito('Noticia agregada con éxito al catálogo.');
    setMostrarFormulario(false);

    setTimeout(() => {
      setMensajeExito('');
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 space-y-8">
      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Listado de Noticias</h1>
          <p className="text-sm text-gray-500">Catálogo completo de noticias y experiencias registradas</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors flex items-center gap-1.5"
          >
            <span>{mostrarFormulario ? 'Cerrar formulario' : '+ Crear nueva noticia'}</span>
          </button>

          <button
            type="button"
            onClick={onRestablecerDatos}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 font-medium px-3 py-2 rounded text-sm transition-colors"
            title="Restablecer datos originales del archivo JSON"
          >
            Restablecer JSON
          </button>
        </div>
      </div>

      {mensajeExito && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {mensajeExito}
        </div>
      )}

      {mostrarFormulario && (
        <section className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">
              Gestión básica de noticias: Crear nueva noticia (Mini CRUD)
            </h2>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
            >
              &times; Cerrar
            </button>
          </div>

          {errorFormulario && (
            <div className="mb-4 bg-red-100 border border-red-300 text-red-700 text-sm p-3 rounded">
              {errorFormulario}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Título de la noticia *
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Innovación en programas formativos"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Educación">Educación</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Turismo">Turismo</option>
                  <option value="Comercio">Comercio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Descripción breve *
              </label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Resumen corto que se mostrará en la tarjeta de la noticia"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Información completa (texto extendido) *
              </label>
              <textarea
                rows={4}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escribe el desarrollo completo de la noticia..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                URL de la imagen (opcional)
              </label>
              <input
                type="url"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="https://ejemplo.com/foto.jpg (si se deja vacío se usará una predeterminada)"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium shadow-sm"
              >
                Guardar Noticia
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-2">
          Filtrar por:
        </span>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
              categoriaSeleccionada === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-500">
          Mostrando {noticiasFiltradas.length} de {noticias.length} noticias
        </span>
      </div>

      {noticiasFiltradas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-300">
          <p className="text-gray-500">No hay noticias registradas en esta categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticiasFiltradas.map((noticia) => (
            <NoticiaCard
              key={noticia.id}
              noticia={noticia}
              onVerDetalle={onVerDetalle}
              esFavorito={favoritosIds.includes(noticia.id)}
              onToggleFavorito={onToggleFavorito}
              onEliminar={onEliminarNoticia}
            />
          ))}
        </div>
      )}
    </div>
  );
};
