/*
 * BudgetActions.tsx
 * Acciones del presupuesto: Descargar PDF, enviar por WhatsApp o Email.
 *
 * - Usa generateBudgetPDF para crear el PDF.
 * - Construye enlaces dinámicos con el total y servicios seleccionados.
 */

import React from "react";
import type { ProjectConfig, CalculatorState } from "../../../config/types";
import { generateBudgetPDF } from "../../../utils/pdfGenerator";

interface BudgetActionsProps {
    projectConfig: ProjectConfig;
    calculatorState: CalculatorState;
    total: number;
    savings: number;
    extras: number;
    monthly: number;
}

const BudgetActions: React.FC<BudgetActionsProps> = ({
    projectConfig,
    calculatorState,
    total,
    savings,
    extras,
    monthly,
}) => {
    // Teléfono y email destino
    const whatsappNumber = "+34622428891";
    const emailAddress = "nelsonvbarcelona@gmail.com";

    // Texto del resumen
    const resumen = `
Proyecto: ${projectConfig.empresa}
Total: ${total}€
Ahorros: ${savings}€
Extras: ${extras}€
Mantenimiento mensual: ${monthly}€
  `.trim();

    const handleDownloadPDF = () => {
        generateBudgetPDF(
            projectConfig,
            calculatorState,
            total,
            savings,
            extras,
            monthly
        );
    };

    const handleSendWhatsApp = () => {
        const url = `https://wa.me/${whatsappNumber.replace(
            "+",
            ""
        )}?text=${encodeURIComponent(resumen)}`;
        window.open(url, "_blank");
    };

    const handleSendEmail = () => {
        const subject = encodeURIComponent(
            `Presupuesto: ${projectConfig.empresa}`
        );
        const body = encodeURIComponent(resumen);
        window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="mt-6 pt-6 border-t border-blue-700 space-y-3">
            <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
                Descargar PDF
            </button>

            <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
                Enviar WhatsApp
            </button>

            <button
                type="button"
                onClick={handleSendEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
                Enviar Email
            </button>
        </div>
    );
};

export default BudgetActions;
