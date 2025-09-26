/*
Componente de información de contacto con diseño consistente
Muestra teléfono, email y WhatsApp del proyecto
Usa CSS modules para mantener consistencia visual
*/

import React from "react";
import sidebarStyles from "../../../styles/components/BudgetSidebar.module.css";

interface ContactInfo {
    telefono: string;
    email: string;
    whatsapp?: string;
}

interface BudgetContactProps {
    contacto: ContactInfo;
}

const BudgetContact: React.FC<BudgetContactProps> = ({ contacto }) => {
    return (
        <div className={sidebarStyles.contactSection}>
            <h4 className={sidebarStyles.contactTitle}>Contacto</h4>
            <div className={sidebarStyles.contactInfo}>
                <p>
                    <strong>Tel:</strong> {contacto.telefono}
                </p>
                <p>
                    <strong>Email:</strong> {contacto.email}
                </p>
                {contacto.whatsapp && (
                    <p>
                        <strong>WhatsApp:</strong> {contacto.whatsapp}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BudgetContact;