/*
Componente UnauthorizedView para mostrar cuando el acceso no es válido
Vista de error con información de contacto para solicitar presupuesto
*/

import React from 'react';

interface UnauthorizedViewProps {
    error?: string;
}

const UnauthorizedView: React.FC<UnauthorizedViewProps> = ({ error }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-lg mx-auto text-center px-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Acceso Restringido
                    </h1>

                    <p className="text-gray-600 mb-6">
                        {error || 'Para acceder a su presupuesto personalizado, utilice el enlace enviado por email.'}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h2 className="font-semibold text-gray-900 mb-3">¿Necesita un presupuesto?</h2>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Teléfono:</strong> +34 622 42 88 91</p>
                            <p><strong>Email:</strong> nelsonvbarcelona@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="tel:+34622428891"
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Llamar Ahora
                        </a>
                        <a
                            href="mailto:nelsonvbarcelona@gmail.com?subject=Solicitud de Presupuesto Web"
                            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                        >
                            Enviar Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedView;