/*
Componente principal de la calculadora de presupuestos con diseño profesional
Usa enfoque híbrido: Tailwind para layout + CSS módulos para estilos específicos
Orquesta todos los componentes y gestiona el estado global de la calculadora
*/

import React from 'react';
import type { TokenConfig } from '../../config/types';
import { useConfig } from '../../hooks/useConfig';
import { useCalculator } from '../../hooks/useCalculator';
import LoadingSpinner from '../common/LoadingSpinner';
import { generateBudgetPDF } from '../../utils/pdfGenerator';


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

                    {/* Contenido principal - Tailwind layout */}
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
                                {projectConfig.serviciosExtra.filter(s => s.tipo === 'ahorro').map((service) => {
                                    const isSelected = calculator.calculatorState.serviciosSeleccionados
                                        .some(s => s.id === service.id);

                                    return (
                                        <div
                                            key={service.id}
                                            onClick={() => calculator.toggleService(service)}
                                            className={`${serviceStyles.serviceItem} ${serviceStyles.savings} ${isSelected ? serviceStyles.selected : ''} p-4 flex items-start`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => { }} // Controlado por onClick del div
                                                className={`${serviceStyles.checkbox} mr-3 mt-1`}
                                            />
                                            <div className="flex-1">
                                                <h3 className={`${serviceStyles.serviceTitle} mb-1`}>
                                                    {service.titulo}
                                                </h3>
                                                <p className={`${serviceStyles.serviceDescription} mb-2`}>
                                                    {service.descripcion}
                                                </p>
                                                <span className={`${serviceStyles.priceTag} ${serviceStyles.savings}`}>
                                                    AHORRA: {Math.abs(service.precio)}€
                                                </span>
                                            </div>
                                        </div>
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
                                {projectConfig.serviciosExtra.filter(s => s.tipo === 'extra').map((service) => {
                                    const isSelected = calculator.calculatorState.serviciosSeleccionados
                                        .some(s => s.id === service.id);

                                    return (
                                        <div
                                            key={service.id}
                                            onClick={() => calculator.toggleService(service)}
                                            className={`${serviceStyles.serviceItem} ${serviceStyles.extras} ${isSelected ? serviceStyles.selected : ''} p-4 flex items-start`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => { }}
                                                className={`${serviceStyles.checkbox} mr-3 mt-1`}
                                            />
                                            <div className="flex-1">
                                                <h3 className={`${serviceStyles.serviceTitle} mb-1`}>
                                                    {service.titulo}
                                                </h3>
                                                <p className={`${serviceStyles.serviceDescription} mb-2`}>
                                                    {service.descripcion}
                                                </p>
                                                <span className={`${serviceStyles.priceTag} ${serviceStyles.extras}`}>
                                                    +{service.precio}€
                                                </span>
                                            </div>
                                        </div>
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
                                        <div
                                            key={item.id}
                                            onClick={() => calculator.toggleMaintenance(item)}
                                            className={`${serviceStyles.serviceItem} ${serviceStyles.maintenance} ${isSelected ? serviceStyles.selected : ''} p-4 flex items-start`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => { }}
                                                className={`${serviceStyles.checkbox} mr-3 mt-1`}
                                            />
                                            <div className="flex-1">
                                                <h3 className={`${serviceStyles.serviceTitle} mb-1`}>
                                                    {item.titulo}
                                                </h3>
                                                <p className={serviceStyles.serviceDescription}>
                                                    {item.descripcion}
                                                </p>
                                            </div>
                                        </div>
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

                    {/* Sidebar - Calculadora con diseño profesional */}
                    <div className="lg:col-span-1">
                        <div className={`${sidebarStyles.sidebar} p-6 sticky top-8`}>
                            <h3 className={`${sidebarStyles.sidebarTitle} mb-6`}>
                                Calculadora de Presupuesto
                            </h3>

                            {/* Líneas de precio */}
                            <div className={sidebarStyles.priceLine}>
                                <span>Precio base:</span>
                                <span className={sidebarStyles.priceAmount}>{projectConfig.precioBase}€</span>
                            </div>

                            <div className={sidebarStyles.priceLine}>
                                <span>Ahorros:</span>
                                <span className={`${sidebarStyles.priceAmount} ${sidebarStyles.savingsAmount}`}>
                                    -{calculator.getSavings()}€
                                </span>
                            </div>

                            <div className={sidebarStyles.priceLine}>
                                <span>Extras:</span>
                                <span className={`${sidebarStyles.priceAmount} ${sidebarStyles.extrasAmount}`}>
                                    +{calculator.getExtras()}€
                                </span>
                            </div>

                            <div className={sidebarStyles.finalPrice}>
                                <div className={sidebarStyles.priceLine}>
                                    <span>TOTAL PROYECTO:</span>
                                    <span>{calculator.getTotalPrice()}€</span>
                                </div>
                            </div>

                            {calculator.getMonthlyPrice() > 0 && (
                                <div className={`${sidebarStyles.priceLine} mt-4`}>
                                    <span>Coste mensual:</span>
                                    <span className={sidebarStyles.priceAmount}>{calculator.getMonthlyPrice()}€/mes</span>
                                </div>
                            )}

                            {/* Resumen */}
                            <div className={sidebarStyles.summarySection}>
                                <h4 className={sidebarStyles.summaryTitle}>Resumen seleccionado</h4>
                                <div className={sidebarStyles.summaryContent}>
                                    {calculator.calculatorState.serviciosSeleccionados.length === 0 &&
                                        calculator.calculatorState.mantenimientoSeleccionado.length === 0 ? (
                                        <em className="text-blue-300">Marque las opciones para ver el resumen</em>
                                    ) : (
                                        <>
                                            {calculator.calculatorState.serviciosSeleccionados.length > 0 && (
                                                <>
                                                    <div className={sidebarStyles.summaryCategory}>Proyecto:</div>
                                                    {calculator.calculatorState.serviciosSeleccionados.map(service => (
                                                        <div key={service.id} className={sidebarStyles.summaryItem}>
                                                            <span style={{ fontSize: '0.8rem' }}>{service.titulo}</span>
                                                            <span style={{
                                                                color: service.tipo === 'ahorro' ? '#68d391' : '#90cdf4',
                                                                fontWeight: 600,
                                                                fontSize: '0.8rem'
                                                            }}>
                                                                {service.precio < 0 ? service.precio : `+${service.precio}`}€
                                                            </span>
                                                        </div>
                                                    ))}
                                                </>
                                            )}

                                            {calculator.calculatorState.mantenimientoSeleccionado.length > 0 && (
                                                <>
                                                    <div className={sidebarStyles.summaryCategory}>Mensual:</div>
                                                    {calculator.calculatorState.mantenimientoSeleccionado.map(maintenance => (
                                                        <div key={maintenance.id} className={sidebarStyles.summaryItem}>
                                                            <span style={{ fontSize: '0.8rem' }}>{maintenance.titulo}</span>
                                                            <span style={{
                                                                color: '#d69e2e',
                                                                fontWeight: 600,
                                                                fontSize: '0.8rem'
                                                            }}>
                                                                {maintenance.precio}€/mes
                                                            </span>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className={sidebarStyles.actionsSection}>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => {
                                            generateBudgetPDF(
                                                projectConfig,
                                                calculator.calculatorState,
                                                calculator.getTotalPrice(),
                                                calculator.getSavings(),
                                                calculator.getExtras(),
                                                calculator.getMonthlyPrice(),
                                                commonConfig
                                            );
                                        }}
                                        className={`${sidebarStyles.actionButton} ${sidebarStyles.btnSuccess}`}
                                    >
                                        Descargar PDF
                                    </button>

                                    <button
                                        onClick={() => {
                                            const resumen = `*PRESUPUESTO WEB - ${projectConfig.empresa}*\n\n` +
                                                `💰 TOTAL PROYECTO: ${calculator.getTotalPrice()}€\n` +
                                                `📊 Precio base: ${projectConfig.precioBase}€\n` +
                                                `🎯 Ahorros: -${calculator.getSavings()}€\n` +
                                                `✨ Extras: +${calculator.getExtras()}€\n` +
                                                (calculator.getMonthlyPrice() > 0 ? `🔄 Mensual: ${calculator.getMonthlyPrice()}€/mes\n` : '') +
                                                `\n📞 Contacto: ${projectConfig.contacto.telefono}`;

                                            const whatsappUrl = `https://wa.me/34622428891?text=${encodeURIComponent(resumen)}`;
                                            window.open(whatsappUrl, '_blank');
                                        }}
                                        className={`${sidebarStyles.actionButton} ${sidebarStyles.btnPrimary}`}
                                    >
                                        Enviar WhatsApp
                                    </button>

                                    <button
                                        onClick={() => {
                                            const subject = `Presupuesto Web - ${projectConfig.empresa}`;
                                            const body = `Hola,\n\nAdjunto el presupuesto solicitado:\n\n` +
                                                `TOTAL PROYECTO: ${calculator.getTotalPrice()}€\n` +
                                                `Precio base: ${projectConfig.precioBase}€\n` +
                                                `Ahorros: -${calculator.getSavings()}€\n` +
                                                `Extras: +${calculator.getExtras()}€\n` +
                                                (calculator.getMonthlyPrice() > 0 ? `Coste mensual: ${calculator.getMonthlyPrice()}€/mes\n` : '') +
                                                `\nGracias.`;

                                            const mailtoUrl = `mailto:${projectConfig.contacto.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                            window.location.href = mailtoUrl;
                                        }}
                                        className={`${sidebarStyles.actionButton} ${sidebarStyles.btnWarning}`}
                                    >
                                        Enviar Email
                                    </button>

                                    <button
                                        onClick={calculator.clearAll}
                                        className={`${sidebarStyles.actionButton} ${sidebarStyles.btnOutline}`}
                                    >
                                        Limpiar Todo
                                    </button>
                                </div>
                            </div>

                            {/* Contacto */}
                            <div className={sidebarStyles.contactSection}>
                                <h4 className={sidebarStyles.contactTitle}>Contacto</h4>
                                <div className={sidebarStyles.contactInfo}>
                                    <p><strong>Tel:</strong> {projectConfig.contacto.telefono}</p>
                                    <p><strong>Email:</strong> {projectConfig.contacto.email}</p>
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