/*
 * BudgetPreview.tsx
 * Vista previa del presupuesto en pantalla.
 *
 * - Recibe datos del proyecto y del estado de la calculadora.
 * - Renderiza un presupuesto en formato visual tipo PDF.
 * - Responsive: aparece al lado de la calculadora en escritorio
 *   y debajo en móviles.
 */

import React from "react";

interface ServiceItem {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    tipo: "ahorro" | "extra";
}

interface MaintenanceItem {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
}

interface ProjectConfig {
    empresa: string;
    descripcion: string;
    precioBase: number;
    contacto: {
        telefono: string;
        email: string;
        whatsapp?: string;
    };
}

interface CalculatorState {
    serviciosSeleccionados: ServiceItem[];
    mantenimientoSeleccionado: MaintenanceItem[];
}

interface BudgetPreviewProps {
    projectConfig: ProjectConfig;
    calculatorState: CalculatorState;
    total: number;
    savings: number;
    extras: number;
    monthly: number;
}

const BudgetPreview: React.FC<BudgetPreviewProps> = ({
    projectConfig,
    calculatorState,
    total,
    savings,
    extras,
    monthly,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
            {/* Encabezado */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Presupuesto: {projectConfig.empresa}
                </h2>
                <p className="text-gray-600">{projectConfig.descripcion}</p>
            </div>

            {/* Resumen financiero */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-700">Precio base:</span>
                    <span className="font-semibold">{projectConfig.precioBase}€</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-700">Ahorros:</span>
                    <span className="font-semibold text-green-600">-{savings}€</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-700">Extras:</span>
                    <span className="font-semibold text-blue-600">+{extras}€</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-yellow-600">{total}€</span>
                </div>
                {monthly > 0 && (
                    <div className="flex justify-between text-sm font-medium">
                        <span>Coste mensual:</span>
                        <span className="text-yellow-600">{monthly}€/mes</span>
                    </div>
                )}
            </div>

            {/* Servicios seleccionados */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Detalles seleccionados
                </h3>
                {calculatorState.serviciosSeleccionados.length === 0 &&
                    calculatorState.mantenimientoSeleccionado.length === 0 ? (
                    <p className="text-gray-500 italic">
                        No se han seleccionado opciones adicionales.
                    </p>
                ) : (
                    <ul className="text-sm space-y-1">
                        {calculatorState.serviciosSeleccionados.map((s) => (
                            <li key={s.id} className="flex justify-between">
                                <span>{s.titulo}</span>
                                <span
                                    className={`${s.tipo === "ahorro" ? "text-green-600" : "text-blue-600"
                                        } font-medium`}
                                >
                                    {s.precio < 0 ? s.precio : `+${s.precio}`}€
                                </span>
                            </li>
                        ))}
                        {calculatorState.mantenimientoSeleccionado.map((m) => (
                            <li key={m.id} className="flex justify-between">
                                <span>{m.titulo}</span>
                                <span className="text-yellow-600 font-medium">
                                    {m.precio}€/mes
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Footer contacto */}
            <div className="mt-auto border-t pt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Contacto</h4>
                <p className="text-sm text-gray-600">
                    Tel: {projectConfig.contacto.telefono}
                </p>
                <p className="text-sm text-gray-600">
                    Email: {projectConfig.contacto.email}
                </p>
                {projectConfig.contacto.whatsapp && (
                    <p className="text-sm text-gray-600">
                        WhatsApp: {projectConfig.contacto.whatsapp}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BudgetPreview;
