/*
Componente de totales del presupuesto con diseño consistente
Muestra precio base, ahorros, extras, total y costes mensuales
Usa CSS modules para mantener consistencia visual - Layout corregido
*/

import React from "react";
import sidebarStyles from "../../../styles/components/BudgetSidebar.module.css";

interface BudgetTotalsProps {
    precioBase: number;
    savings: number;
    extras: number;
    total: number;
    monthly: number;
}

const BudgetTotals: React.FC<BudgetTotalsProps> = ({
    precioBase,
    savings,
    extras,
    total,
    monthly,
}) => {
    return (
        <div className="space-y-4">
            <div className={sidebarStyles.priceLine}>
                <span>Precio base:</span>
                <span className={sidebarStyles.priceAmount}>{precioBase}€</span>
            </div>

            <div className={sidebarStyles.priceLine}>
                <span>Ahorros:</span>
                <span className={`${sidebarStyles.priceAmount} ${sidebarStyles.savingsAmount}`}>
                    -{savings}€
                </span>
            </div>

            <div className={sidebarStyles.priceLine}>
                <span>Extras:</span>
                <span className={`${sidebarStyles.priceAmount} ${sidebarStyles.extrasAmount}`}>
                    +{extras}€
                </span>
            </div>

            <div className={sidebarStyles.finalPrice}>
                <div className={sidebarStyles.priceLine}>
                    <span>TOTAL PROYECTO:</span>
                    <span>{total}€</span>
                </div>
            </div>

            {monthly > 0 && (
                <div className="mt-4">
                    <div className={sidebarStyles.priceLine}>
                        <span>Coste mensual:</span>
                        <span className={sidebarStyles.priceAmount}>{monthly}€/mes</span>
                    </div>
                    <div className="text-xs text-blue-300 mt-1 text-center">
                        (No incluido en el total del proyecto)
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetTotals;