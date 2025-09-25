/*
 * BudgetSummary.tsx
 * Resumen de servicios seleccionados en la calculadora.
 *
 * - Muestra ahorros, extras y mantenimiento que el cliente marca.
 * - Se utiliza dentro del sidebar de la calculadora.
 */

import React from "react";
import type { ServiceItem, MaintenanceItem } from "../../../config/types";

interface Props {
    services: ServiceItem[];
    maintenance: MaintenanceItem[];
}

const BudgetSummary: React.FC<Props> = ({ services, maintenance }) => {
    return (
        <div className="mt-6 pt-6 border-t border-blue-700">
            <h4 className="font-semibold mb-3">Resumen seleccionado</h4>
            <div className="text-sm space-y-1">
                {services.length === 0 && maintenance.length === 0 ? (
                    <em className="text-blue-300">
                        Marque las opciones para ver el resumen
                    </em>
                ) : (
                    <>
                        {services.map((service: ServiceItem) => (
                            <div key={service.id} className="flex justify-between">
                                <span className="text-xs">{service.titulo}</span>
                                <span
                                    className={`text-xs font-semibold ${service.tipo === "ahorro" ? "text-green-300" : "text-blue-300"
                                        }`}
                                >
                                    {service.tipo === "ahorro" ? `-${Math.abs(service.precio)}` : `+${service.precio}`}€
                                </span>
                            </div>
                        ))}
                        {maintenance.map((m: MaintenanceItem) => (
                            <div key={m.id} className="flex justify-between">
                                <span className="text-xs">{m.titulo}</span>
                                <span className="text-xs font-semibold text-yellow-300">
                                    {m.precio}€/mes
                                </span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default BudgetSummary;
