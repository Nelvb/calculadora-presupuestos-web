/*
Hook personalizado para gestionar la lógica de cálculos del presupuesto
Maneja servicios seleccionados, precios, ahorros y mantenimiento mensual
Proporciona funciones para actualizar y exportar el estado de la calculadora
*/

import { useState, useCallback } from 'react';
import type { CalculatorState, ServiceItem, MaintenanceItem } from '../config/types';

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
        mantenimientoSeleccionado: []
    });

    const toggleService = useCallback((service: ServiceItem) => {
        setCalculatorState(prev => {
            const isSelected = prev.serviciosSeleccionados.some(s => s.id === service.id);

            if (isSelected) {
                // Deseleccionar
                const newServices = prev.serviciosSeleccionados.filter(s => s.id !== service.id);
                const newAhorros = service.tipo === 'ahorro'
                    ? prev.ahorros - Math.abs(service.precio)
                    : prev.ahorros;
                const newExtras = service.tipo === 'extra'
                    ? prev.extras - service.precio
                    : prev.extras;

                return {
                    ...prev,
                    serviciosSeleccionados: newServices,
                    ahorros: newAhorros,
                    extras: newExtras
                };
            } else {
                // Seleccionar
                const newServices = [...prev.serviciosSeleccionados, service];
                const newAhorros = service.tipo === 'ahorro'
                    ? prev.ahorros + Math.abs(service.precio)
                    : prev.ahorros;
                const newExtras = service.tipo === 'extra'
                    ? prev.extras + service.precio
                    : prev.extras;

                return {
                    ...prev,
                    serviciosSeleccionados: newServices,
                    ahorros: newAhorros,
                    extras: newExtras
                };
            }
        });
    }, []);

    const toggleMaintenance = useCallback((maintenance: MaintenanceItem) => {
        setCalculatorState(prev => {
            const isSelected = prev.mantenimientoSeleccionado.some(m => m.id === maintenance.id);

            if (isSelected) {
                // Deseleccionar
                const newMaintenance = prev.mantenimientoSeleccionado.filter(m => m.id !== maintenance.id);
                const newMonthlyPrice = prev.mantenimientoMensual - maintenance.precio;

                return {
                    ...prev,
                    mantenimientoSeleccionado: newMaintenance,
                    mantenimientoMensual: newMonthlyPrice
                };
            } else {
                // Seleccionar
                const newMaintenance = [...prev.mantenimientoSeleccionado, maintenance];
                const newMonthlyPrice = prev.mantenimientoMensual + maintenance.precio;

                return {
                    ...prev,
                    mantenimientoSeleccionado: newMaintenance,
                    mantenimientoMensual: newMonthlyPrice
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
            mantenimientoSeleccionado: []
        });
    }, [basePrice]);

    const getTotalPrice = useCallback(() => {
        return calculatorState.precioBase - calculatorState.ahorros + calculatorState.extras;
    }, [calculatorState]);

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
        getExtras
    };
};