/*
Componente de acciones del presupuesto versión limpia
Sin iconos, sin preview, solo funcionalidades esenciales
Diseño profesional y minimalista
*/

import React from "react";
import type { ProjectConfig, CalculatorState, CommonConfig } from "../../../config/types";
import { generateBudgetPDF } from "../../../utils/pdfGenerator";
import sidebarStyles from "../../../styles/components/BudgetSidebar.module.css";

interface BudgetActionsProps {
    projectConfig: ProjectConfig;
    calculatorState: CalculatorState;
    total: number;
    savings: number;
    extras: number;
    monthly: number;
    commonConfig: CommonConfig;
}

const BudgetActions: React.FC<BudgetActionsProps> = ({
    projectConfig,
    calculatorState,
    total,
    savings,
    extras,
    monthly,
    commonConfig,
}) => {
    const handleDownloadPDF = () => {
        generateBudgetPDF(
            projectConfig,
            calculatorState,
            total,
            savings,
            extras,
            monthly,
            commonConfig
        );
    };

    const handleSendWhatsApp = () => {
        const resumen = `*PRESUPUESTO WEB - ${projectConfig.empresa}*\n\n` +
            `💰 TOTAL PROYECTO: ${total}€\n` +
            `📊 Precio base: ${projectConfig.precioBase}€\n` +
            `🎯 Ahorros: -${savings}€\n` +
            `✨ Extras: +${extras}€\n` +
            (monthly > 0 ? `🔄 Mensual: ${monthly}€/mes\n` : '') +
            `\n📞 Contacto: ${commonConfig.contacto.telefono}`;

        const whatsappUrl = `https://wa.me/34622428891?text=${encodeURIComponent(resumen)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleSendEmail = () => {
        const subject = `Presupuesto Web - ${projectConfig.empresa}`;
        const body = `Hola,\n\nAdjunto el presupuesto solicitado:\n\n` +
            `TOTAL PROYECTO: ${total}€\n` +
            `Precio base: ${projectConfig.precioBase}€\n` +
            `Ahorros: -${savings}€\n` +
            `Extras: +${extras}€\n` +
            (monthly > 0 ? `Coste mensual: ${monthly}€/mes\n` : '') +
            `\nGracias.`;

        const mailtoUrl = `mailto:${commonConfig.contacto.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    };

    return (
        <div className={sidebarStyles.actionsSection}>
            <div className="flex flex-col gap-3">
                <button
                    onClick={handleDownloadPDF}
                    className={`${sidebarStyles.actionButton} ${sidebarStyles.btnSuccess}`}
                >
                    Descargar PDF
                </button>

                <button
                    onClick={handleSendWhatsApp}
                    className={`${sidebarStyles.actionButton} ${sidebarStyles.btnPrimary}`}
                >
                    Enviar WhatsApp
                </button>

                <button
                    onClick={handleSendEmail}
                    className={`${sidebarStyles.actionButton} ${sidebarStyles.btnWarning}`}
                >
                    Enviar Email
                </button>
            </div>
        </div>
    );
};

export default BudgetActions;