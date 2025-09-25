/*
 * BudgetTotals.tsx
 * Sección de totales del presupuesto en la calculadora.
 *
 * - Muestra precio base, ahorros, extras, total y coste mensual.
 * - Se utiliza dentro del sidebar de la calculadora.
 */

import React from "react";

interface Props {
    precioBase: number;
    savings: number;
    extras: number;
    total: number;
    monthly: number;
}

const BudgetTotals: React.FC<Props> = ({
    precioBase,
    savings,
    extras,
    total,
    monthly,
}) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between border-b border-blue-700 pb-2">
                <span>Precio base:</span>
                <span className="font-semibold">{precioBase}€</span>
            </div>

            <div className="flex justify-between border-b border-blue-700 pb-2">
                <span>Ahorros:</span>
                <span className="font-semibold text-green-300">-{savings}€</span>
            </div>

            <div className="flex justify-between border-b border-blue-700 pb-2">
                <span>Extras:</span>
                <span className="font-semibold text-blue-300">+{extras}€</span>
            </div>

            <div className="flex justify-between text-xl font-bold pt-2 border-t-2 border-yellow-400">
                <span>TOTAL PROYECTO:</span>
                <span className="text-yellow-300">{total}€</span>
            </div>

            {monthly > 0 && (
                <div className="flex justify-between text-lg font-semibold pt-2">
                    <span>Coste mensual:</span>
                    <span className="text-yellow-300">{monthly}€/mes</span>
                </div>
            )}
        </div>
    );
};

export default BudgetTotals;
