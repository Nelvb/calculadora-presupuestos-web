/*
Componente de resumen de servicios seleccionados con diseño consistente
Muestra ahorros, extras y mantenimiento que el cliente selecciona
Usa CSS modules para mantener consistencia visual
*/

import React from "react";
import type { ServiceItem, MaintenanceItem } from "../../../config/types";
import sidebarStyles from "../../../styles/components/BudgetSidebar.module.css";

interface BudgetSummaryProps {
    services: ServiceItem[];
    maintenance: MaintenanceItem[];
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ services, maintenance }) => {
    return (
        <div className={sidebarStyles.summarySection}>
            <h4 className={sidebarStyles.summaryTitle}>Resumen seleccionado</h4>
            <div className={sidebarStyles.summaryContent}>
                {services.length === 0 && maintenance.length === 0 ? (
                    <em className="text-blue-300">Marque las opciones para ver el resumen</em>
                ) : (
                    <>
                        {services.length > 0 && (
                            <>
                                <div className={sidebarStyles.summaryCategory}>Proyecto:</div>
                                {services.map(service => (
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

                        {maintenance.length > 0 && (
                            <>
                                <div className={sidebarStyles.summaryCategory}>Mensual:</div>
                                {maintenance.map(maintenanceItem => (
                                    <div key={maintenanceItem.id} className={sidebarStyles.summaryItem}>
                                        <span style={{ fontSize: '0.8rem' }}>{maintenanceItem.titulo}</span>
                                        <span style={{
                                            color: '#d69e2e',
                                            fontWeight: 600,
                                            fontSize: '0.8rem'
                                        }}>
                                            {maintenanceItem.precio}€/mes
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BudgetSummary;