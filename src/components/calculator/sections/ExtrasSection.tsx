/*
 * ExtrasSection.tsx
 * Sección de servicios adicionales en la calculadora de presupuestos.
 *
 * - Renderiza las funcionalidades extra que el cliente puede añadir.
 * - Al seleccionarlos, se suman al presupuesto.
 */

import React from "react";
import type { useCalculator } from "../../../hooks/useCalculator";
import type { ServiceItem } from "../../../config/types";

type CalculatorHook = ReturnType<typeof useCalculator>;

interface Props {
    services: ServiceItem[];
    calculator: CalculatorHook;
}

const ExtrasSection: React.FC<Props> = ({ services, calculator }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Servicios adicionales
            </h2>
            <p className="text-gray-600 mb-6">
                Funcionalidades extra que puede añadir a su proyecto
            </p>

            <div className="space-y-4">
                {services
                    .filter((s) => s.tipo === "extra")
                    .map((service: ServiceItem) => {
                        const isSelected = calculator.calculatorState.serviciosSeleccionados.some(
                            (s: ServiceItem) => s.id === service.id
                        );

                        return (
                            <div
                                key={service.id}
                                onClick={() => calculator.toggleService(service)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                                    }`}
                            >
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => { }}
                                        className="mt-1 h-4 w-4 text-blue-600 rounded"
                                    />
                                    <div className="ml-3 flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {service.titulo}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {service.descripcion}
                                        </p>
                                        <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                                            +{service.precio}€
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ExtrasSection;
