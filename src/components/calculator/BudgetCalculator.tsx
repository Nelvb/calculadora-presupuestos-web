/*
Componente principal de la calculadora de presupuestos refactorizado
Usa enfoque modular con componentes separados para cada funcionalidad
Orquesta la lógica principal pero delega la renderización a componentes específicos
*/

import React from 'react';
import type { TokenConfig } from '../../config/types';
import { useConfig } from '../../hooks/useConfig';
import { useCalculator } from '../../hooks/useCalculator';
import LoadingSpinner from '../common/LoadingSpinner';

// Componentes modulares del sidebar
import BudgetTotals from './sidebar/BudgetTotals';
import BudgetSummary from './sidebar/BudgetSummary';
import BudgetActions from './sidebar/BudgetActions';
import BudgetContact from './sidebar/BudgetContact';

// CSS Modules
import calculatorStyles from '../../styles/components/Calculator.module.css';
import serviceStyles from '../../styles/components/ServiceItem.module.css';
import sidebarStyles from '../../styles/components/BudgetSidebar.module.css';

interface BudgetCalculatorProps {
    projectType: string;
    tokenConfig: TokenConfig;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
    projectType,
    tokenConfig
}) => {
    const {
        projectConfig,
        commonConfig,
        maintenanceItems,
        isLoading,
        error
    } = useConfig(projectType);

    const calculator = useCalculator(projectConfig?.precioBase || 0);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error || !projectConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error de Configuración</h2>
                    <p className="text-gray-600">{error || 'No se pudo cargar la configuración del proyecto'}</p>
                </div>
            </div>
        );
    }

    // Componente para renderizar un servicio individual
    const ServiceItem = ({ service, isSelected, onToggle, tipo }: {
        service: any;
        isSelected: boolean;
        onToggle: () => void;
        tipo: 'savings' | 'extras' | 'maintenance';
    }) => (
        <div
            onClick={onToggle}
            className={`${serviceStyles.serviceItem} ${serviceStyles[tipo]} ${isSelected ? serviceStyles.selected : ''} p-4 flex items-start`}
        >
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {}}
                className={`${serviceStyles.checkbox} mr-3 mt-1`}
            />
            <div className="flex-1">
                <h3 className={`${serviceStyles.serviceTitle} mb-1`}>
                    {service.titulo}
                </h3>
                <p className={`${serviceStyles.serviceDescription} mb-2`}>
                    {service.descripcion}
                </p>
                {tipo !== 'maintenance' && (
                    <span className={`${serviceStyles.priceTag} ${serviceStyles[tipo]}`}>
                        {tipo === 'savings' ? `AHORRA: ${Math.abs(service.precio)}€` : `+${service.precio}€`}
                    </span>
                )}
                {tipo === 'maintenance' && (
                    <span className={`${serviceStyles.priceTag} ${serviceStyles.maintenance}`}>
                        {service.precio}€/mes
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-4">

                {/* Header con diseño profesional */}
                <div className={`${calculatorStyles.header} p-8 mb-8`}>
                    <h1 className={calculatorStyles.headerTitle}>
                        {projectConfig.empresa}
                    </h1>
                    <p className={`${calculatorStyles.headerSubtitle} mb-4`}>
                        {projectConfig.descripcion}
                    </p>
                    <div className={`${calculatorStyles.clientInfo} pt-4 mt-4`}>
                        <span><strong>Cliente:</strong> {tokenConfig.client}</span>
                        <span className="mx-4"><strong>Tecnología:</strong> {projectConfig.tecnologia}</span>
                        <span><strong>Tiempo:</strong> {projectConfig.tiempo}</span>
                    </div>
                </div>

                {/* Layout principal: Tailwind Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contenido principal */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Servicios que aporta el cliente (Ahorros) */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Lo que aporta el cliente
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Marque los elementos que ya tiene para reducir el presupuesto
                            </p>

                            <div className="space-y-4">
                                {(commonConfig.serviciosExtra || []).filter(s => s.tipo === 'ahorro').map((service) => {
                                    const isSelected = calculator.calculatorState.serviciosSeleccionados
                                        .some(s => s.id === service.id);

                                    return (
                                        <ServiceItem
                                            key={service.id}
                                            service={service}
                                            isSelected={isSelected}
                                            onToggle={() => calculator.toggleService(service)}
                                            tipo="savings"
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Servicios adicionales (Extras) */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Servicios adicionales
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Funcionalidades extra que puede añadir a su proyecto
                            </p>

                            <div className="space-y-4">
                                {[...(commonConfig.serviciosExtra || []), ...(projectConfig.serviciosExtra || [])].filter(s => s.tipo === 'extra').map((service) => {
                                    const isSelected = calculator.calculatorState.serviciosSeleccionados
                                        .some(s => s.id === service.id);

                                    return (
                                        <ServiceItem
                                            key={service.id}
                                            service={service}
                                            isSelected={isSelected}
                                            onToggle={() => calculator.toggleService(service)}
                                            tipo="extras"
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Servicios de mantenimiento */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Servicios de mantenimiento mensual
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Servicios opcionales para mantener su web funcionando óptimamente
                            </p>

                            <div className="space-y-4">
                                {maintenanceItems.map((item) => {
                                    const isSelected = calculator.calculatorState.mantenimientoSeleccionado
                                        .some(m => m.id === item.id);

                                    return (
                                        <ServiceItem
                                            key={item.id}
                                            service={item}
                                            isSelected={isSelected}
                                            onToggle={() => calculator.toggleMaintenance(item)}
                                            tipo="maintenance"
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Información del proyecto */}
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Información del proyecto
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Tecnología</h3>
                                    <p className="text-gray-600">{projectConfig.tecnologia}</p>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">Tiempo estimado</h3>
                                    <p className="text-gray-600">{projectConfig.tiempo}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Calculadora modular */}
                    <div className="lg:col-span-1">
                        <div className={`${sidebarStyles.sidebar} p-6 sticky top-8`}>
                            <h3 className={`${sidebarStyles.sidebarTitle} mb-6`}>
                                Calculadora de Presupuesto
                            </h3>

                            {/* Componente de totales */}
                            <BudgetTotals
                                precioBase={projectConfig.precioBase}
                                savings={calculator.getSavings()}
                                extras={calculator.getExtras()}
                                total={calculator.getTotalPrice()}
                                monthly={calculator.getMonthlyPrice()}
                            />

                            {/* Componente de resumen */}
                            <BudgetSummary
                                services={calculator.calculatorState.serviciosSeleccionados}
                                maintenance={calculator.calculatorState.mantenimientoSeleccionado}
                            />

                            {/* Componente de acciones */}
                            <BudgetActions
                                projectConfig={projectConfig}
                                calculatorState={calculator.calculatorState}
                                total={calculator.getTotalPrice()}
                                savings={calculator.getSavings()}
                                extras={calculator.getExtras()}
                                monthly={calculator.getMonthlyPrice()}
                                commonConfig={commonConfig}
                            />

                            <div className="mt-4">
                                <button
                                    onClick={calculator.clearAll}
                                    className={`${sidebarStyles.actionButton} ${sidebarStyles.btnOutline} w-full`}
                                >
                                    Limpiar Todo
                                </button>
                            </div>

                            {/* Componente de contacto */}
                            <BudgetContact contacto={commonConfig.contacto} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetCalculator;