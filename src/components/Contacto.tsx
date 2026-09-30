import React, { useState } from 'react';

interface ErroresFormulario {
  nombre?: string;
  correo?: string;
  mensaje?: string;
}

export const Contacto: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [enviado, setEnviado] = useState(false);

  const validarCorreo = (email: string) => {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: ErroresFormulario = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El campo nombre es obligatorio.';
    } else if (nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!validarCorreo(correo.trim())) {
      nuevosErrores.correo = 'Ingresa un correo electrónico con formato válido (ejemplo: usuario@correo.com).';
    }

    if (!mensaje.trim()) {
      nuevosErrores.mensaje = 'El campo mensaje es obligatorio.';
    } else if (mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe contener al menos 10 caracteres.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setEnviado(false);
      return;
    }

    setErrores({});
    setEnviado(true);
    setNombre('');
    setCorreo('');
    setMensaje('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12">
      <div className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Contacto</h1>
          <p className="text-sm text-gray-500 mt-1">Formulario de contacto</p>
        </div>

        {enviado && (
          <div className="bg-green-50 border-2 border-green-500 text-green-800 p-4 rounded text-center">
            <span className="block font-bold text-base mb-1">
              Mensaje de confirmación: "¡Gracias por contactarnos!"
            </span>
            <span className="text-sm">
              Hemos recibido tu mensaje correctamente. Nuestro equipo se pondrá en contacto a la brevedad.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (errores.nombre) {
                  setErrores({ ...errores, nombre: undefined });
                }
              }}
              placeholder="Ingresa tu nombre completo"
              className={`w-full border rounded px-3 py-2 text-sm focus:outline-none ${
                errores.nombre
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errores.nombre && (
              <p className="text-red-600 text-xs mt-1 font-medium">{errores.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                if (errores.correo) {
                  setErrores({ ...errores, correo: undefined });
                }
              }}
              placeholder="ejemplo@correo.com"
              className={`w-full border rounded px-3 py-2 text-sm focus:outline-none ${
                errores.correo
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errores.correo && (
              <p className="text-red-600 text-xs mt-1 font-medium">{errores.correo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              rows={5}
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
                if (errores.mensaje) {
                  setErrores({ ...errores, mensaje: undefined });
                }
              }}
              placeholder="Escribe aquí tu consulta o sugerencia sobre las noticias..."
              className={`w-full border rounded px-3 py-2 text-sm focus:outline-none ${
                errores.mensaje
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errores.mensaje && (
              <p className="text-red-600 text-xs mt-1 font-medium">{errores.mensaje}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded text-sm shadow transition-colors"
            >
              Enviar
            </button>
          </div>
        </form>

        <div className="bg-gray-50 border border-gray-200 rounded p-4 text-xs text-gray-600">
          <p className="font-semibold text-gray-800 mb-1">Información de soporte:</p>
          <p>Horario de atención: Lunes a Viernes de 8:00 a.m. a 6:00 p.m.</p>
          <p>Correo de redacción: redaccion@noticiasweb.edu.co</p>
        </div>
      </div>
    </div>
  );
};
