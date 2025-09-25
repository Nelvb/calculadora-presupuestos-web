/*
Hook personalizado para gestionar la lógica de cálculos del presupuesto.
Mantiene servicios seleccionados, precios base, ahorros y extras.
Proporciona funciones para actualizar y exportar el estado.
*/

import { useState, useCallback } from "react";
import type { CalculatorState, ServiceItem, MaintenanceItem } from "../config/types";

interface UseCalculatorReturn {
    calculatorState: CalculatorState;
    toggleService: (service: ServiceItem) => void;
    toggleMaintenance: (maintenance: MaintenanceItem) => void;
    clearAll: () => void;
    getTotalPrice: () => number;
    getMonthlyPrice: () => number;
    getSavings: () => number;
    getExtras: () => number;
}

export const useCalculator = (basePrice: number): UseCalculatorReturn => {
    const [calculatorState, setCalculatorState] = useState<CalculatorState>({
        precioBase: basePrice,
        ahorros: 0,
        extras: 0,
        mantenimientoMensual: 0,
        serviciosSeleccionados: [],
        mantenimientoSeleccionado: [],
    });

    const toggleService = useCallback((service: ServiceItem) => {
        setCalculatorState((prev) => {
            const isSelected = prev.serviciosSeleccionados.some((s) => s.id === service.id);

            if (isSelected) {
                const newServices = prev.serviciosSeleccionados.filter((s) => s.id !== service.id);
                return {
                    ...prev,
                    serviciosSeleccionados: newServices,
                    ahorros:
                        service.tipo === "ahorro" ? prev.ahorros - Math.abs(service.precio) : prev.ahorros,
                    extras: service.tipo === "extra" ? prev.extras - service.precio : prev.extras,
                };
            } else {
                const newServices = [...prev.serviciosSeleccionados, service];
                return {
                    ...prev,
                    serviciosSeleccionados: newServices,
                    ahorros:
                        service.tipo === "ahorro" ? prev.ahorros + Math.abs(service.precio) : prev.ahorros,
                    extras: service.tipo === "extra" ? prev.extras + service.precio : prev.extras,
                };
            }
        });
    }, []);

    const toggleMaintenance = useCallback((maintenance: MaintenanceItem) => {
        setCalculatorState((prev) => {
            const isSelected = prev.mantenimientoSeleccionado.some(
                (m) => m.id === maintenance.id
            );

            if (isSelected) {
                const newMaintenance = prev.mantenimientoSeleccionado.filter(
                    (m) => m.id !== maintenance.id
                );
                return {
                    ...prev,
                    mantenimientoSeleccionado: newMaintenance,
                    mantenimientoMensual: prev.mantenimientoMensual - maintenance.precio,
                };
            } else {
                const newMaintenance = [...prev.mantenimientoSeleccionado, maintenance];
                return {
                    ...prev,
                    mantenimientoSeleccionado: newMaintenance,
                    mantenimientoMensual: prev.mantenimientoMensual + maintenance.precio,
                };
            }
        });
    }, []);

    const clearAll = useCallback(() => {
        setCalculatorState({
            precioBase: basePrice,
            ahorros: 0,
            extras: 0,
            mantenimientoMensual: 0,
            serviciosSeleccionados: [],
            mantenimientoSeleccionado: [],
        });
    }, [basePrice]);

    const getTotalPrice = useCallback(() => {
        return basePrice + calculatorState.extras - calculatorState.ahorros;
    }, [basePrice, calculatorState.extras, calculatorState.ahorros]);

    const getMonthlyPrice = useCallback(() => {
        return calculatorState.mantenimientoMensual;
    }, [calculatorState.mantenimientoMensual]);

    const getSavings = useCallback(() => {
        return calculatorState.ahorros;
    }, [calculatorState.ahorros]);

    const getExtras = useCallback(() => {
        return calculatorState.extras;
    }, [calculatorState.extras]);

    return {
        calculatorState,
        toggleService,
        toggleMaintenance,
        clearAll,
        getTotalPrice,
        getMonthlyPrice,
        getSavings,
        getExtras,
    };
};
