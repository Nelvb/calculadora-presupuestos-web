/*
 * BudgetCalculator.tsx
 * Componente principal de la calculadora de presupuestos.
 *
 * - Carga la configuración del proyecto con useConfig.
 * - Aplica la lógica de selección con useCalculator.
 * - Renderiza servicios, extras, mantenimiento, cálculo total y acciones.
 */

import React from "react";
import type { TokenConfig } from "../../config/types";
import { useConfig } from "../../hooks/useConfig";
import { useCalculator } from "../../hooks/useCalculator";
import LoadingSpinner from "../common/LoadingSpinner";

interface BudgetCalculatorProps {
    projectType: string;
    tokenConfig: TokenConfig;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
    projectType,
    tokenConfig,
}) => {
    const {
        projectConfig,
        maintenanceItems,
        isLoading,
        error,
    } = useConfig(projectType);

    const calculator = useCalculator(projectConfig?.precioBase || 0);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error || !projectConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        Error de Configuración
                    </h2>
                    <p className="text-gray-600">
                        {error || "No se pudo cargar la configuración del proyecto"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {projectConfig.empresa}
                    </h1>
                    <p className="text-gray-600 mb-4">{projectConfig.descripcion}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>
                            <strong>Cliente:</strong> {tokenConfig.client}
                        </span>
                        <span>
                            <strong>Tecnología:</strong> {projectConfig.tecnologia}
                        </span>
                        <span>
                            <strong>Tiempo:</strong> {projectConfig.tiempo}
                        </span>
                    </div>
                </div>

                {/* Layout principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Secciones de servicios */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Ahorros */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Lo que aporta el cliente
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Marque los elementos que ya tiene para reducir el presupuesto
                            </p>

                            <div className="space-y-4">
                                {projectConfig.serviciosExtra
                                    .filter((s) => s.tipo === "ahorro")
                                    .map((service) => {
                                        const isSelected =
                                            calculator.calculatorState.serviciosSeleccionados.some(
                                                (s) => s.id === service.id
                                            );

                                        return (
                                            <div
                                                key={service.id}
                                                onClick={() => calculator.toggleService(service)}
                                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                                                        ? "border-green-500 bg-green-50"
                                                        : "border-gray-200 hover:border-green-300 hover:bg-green-25"
                                                    }`}
                                            >
                                                <div className="flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => { }}
                                                        className="mt-1 h-4 w-4 text-green-600 rounded"
                                                    />
                                                    <div className="ml-3 flex-1">
                                                        <h3 className="font-medium text-gray-900">
                                                            {service.titulo}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {service.descripcion}
                                                        </p>
                                                        <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                                                            AHORRA: {Math.abs(service.precio)}€
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Extras */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Servicios adicionales
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Funcionalidades extra que puede añadir a su proyecto
                            </p>

                            <div className="space-y-4">
                                {projectConfig.serviciosExtra
                                    .filter((s) => s.tipo === "extra")
                                    .map((service) => {
                                        const isSelected =
                                            calculator.calculatorState.serviciosSeleccionados.some(
                                                (s) => s.id === service.id
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

                        {/* Mantenimiento */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Servicios de mantenimiento mensual
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Servicios opcionales para mantener su web funcionando
                            </p>

                            <div className="space-y-4">
                                {maintenanceItems.map((item) => {
                                    const isSelected =
                                        calculator.calculatorState.mantenimientoSeleccionado.some(
                                            (m) => m.id === item.id
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
                                                    <h3 className="font-medium text-gray-900">
                                                        {item.titulo}
                                                    </h3>
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
                    </div>

                    {/* Calculadora lateral */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-blue-900 text-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-6">
                                Calculadora de Presupuesto
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-blue-700 pb-2">
                                    <span>Precio base:</span>
                                    <span className="font-semibold">
                                        {projectConfig.precioBase}€
                                    </span>
                                </div>

                                <div className="flex justify-between border-b border-blue-700 pb-2">
                                    <span>Ahorros:</span>
                                    <span className="font-semibold text-green-300">
                                        -{calculator.getSavings()}€
                                    </span>
                                </div>

                                <div className="flex justify-between border-b border-blue-700 pb-2">
                                    <span>Extras:</span>
                                    <span className="font-semibold text-blue-300">
                                        +{calculator.getExtras()}€
                                    </span>
                                </div>

                                <div className="flex justify-between text-xl font-bold pt-2 border-t-2 border-yellow-400">
                                    <span>TOTAL PROYECTO:</span>
                                    <span className="text-yellow-300">
                                        {calculator.getTotalPrice()}€
                                    </span>
                                </div>

                                {calculator.getMonthlyPrice() > 0 && (
                                    <div className="flex justify-between text-lg font-semibold pt-2">
                                        <span>Coste mensual:</span>
                                        <span className="text-yellow-300">
                                            {calculator.getMonthlyPrice()}€/mes
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Resumen */}
                            <div className="mt-6 pt-6 border-t border-blue-700">
                                <h4 className="font-semibold mb-3">Resumen seleccionado</h4>
                                <div className="text-sm space-y-1">
                                    {calculator.calculatorState.serviciosSeleccionados.length ===
                                        0 &&
                                        calculator.calculatorState.mantenimientoSeleccionado
                                            .length === 0 ? (
                                        <em className="text-blue-300">
                                            Marque las opciones para ver el resumen
                                        </em>
                                    ) : (
                                        <>
                                            {calculator.calculatorState.serviciosSeleccionados.map(
                                                (service) => (
                                                    <div
                                                        key={service.id}
                                                        className="flex justify-between"
                                                    >
                                                        <span className="text-xs">{service.titulo}</span>
                                                        <span
                                                            className={`text-xs font-semibold ${service.tipo === "ahorro"
                                                                    ? "text-green-300"
                                                                    : "text-blue-300"
                                                                }`}
                                                        >
                                                            {service.precio < 0
                                                                ? service.precio
                                                                : `+${service.precio}`}
                                                            €
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                            {calculator.calculatorState.mantenimientoSeleccionado.map(
                                                (maintenance) => (
                                                    <div
                                                        key={maintenance.id}
                                                        className="flex justify-between"
                                                    >
                                                        <span className="text-xs">
                                                            {maintenance.titulo}
                                                        </span>
                                                        <span className="text-xs font-semibold text-yellow-300">
                                                            {maintenance.precio}€/mes
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Botones acción */}
                            <div className="mt-6 pt-6 border-t border-blue-700 space-y-3">
                                <button
                                    onClick={() =>
                                        alert("Función de descargar PDF en desarrollo")
                                    }
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                                >
                                    Descargar PDF
                                </button>

                                <button
                                    onClick={() => alert("Función de WhatsApp en desarrollo")}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                                >
                                    Enviar WhatsApp
                                </button>

                                <button
                                    onClick={() => alert("Función de Email en desarrollo")}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                                >
                                    Enviar Email
                                </button>
                            </div>

                            {/* Contacto */}
                            <div className="mt-6 pt-6 border-t border-blue-700">
                                <h4 className="font-semibold mb-2">Contacto</h4>
                                <div className="text-sm space-y-1">
                                    <p>
                                        <strong>Tel:</strong> {projectConfig.contacto.telefono}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {projectConfig.contacto.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetCalculator;
