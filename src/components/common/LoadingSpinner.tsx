/*
Componente LoadingSpinner para mostrar carga durante transiciones
Spinner animado con mensaje de carga personalizado
*/

import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Cargando presupuesto...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;