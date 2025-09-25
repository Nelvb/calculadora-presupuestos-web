/*
 * MaintenanceSection.tsx
 * Sección de servicios de mantenimiento mensual.
 *
 * - Renderiza los servicios opcionales de mantenimiento.
 * - Al seleccionarlos, se añaden como coste mensual.
 */

import React from "react";
import type { useCalculator } from "../../../hooks/useCalculator";
import type { MaintenanceItem } from "../../../config/types";

type CalculatorHook = ReturnType<typeof useCalculator>;

interface Props {
    maintenanceItems: MaintenanceItem[];
    calculator: CalculatorHook;
}

const MaintenanceSection: React.FC<Props> = ({
    maintenanceItems,
    calculator,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Servicios de mantenimiento mensual
            </h2>
            <p className="text-gray-600 mb-6">
                Servicios opcionales para mantener su web funcionando
            </p>

            <div className="space-y-4">
                {maintenanceItems.map((item: MaintenanceItem) => {
                    const isSelected =
                        calculator.calculatorState.mantenimientoSeleccionado.some(
                            (m: MaintenanceItem) => m.id === item.id
                        );

                    return (
                        <div
                            key={item.id}
                            onClick={() => calculator.toggleMaintenance(item)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                                    ? "border-yellow-500 bg-yellow-50"
                                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-25"
                                }`}
                        >
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => { }}
                                    className="mt-1 h-4 w-4 text-yellow-600 rounded"
                                />
                                <div className="ml-3 flex-1">
                                    <h3 className="font-medium text-gray-900">{item.titulo}</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.descripcion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MaintenanceSection;
