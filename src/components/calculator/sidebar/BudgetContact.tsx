/*
 * BudgetContact.tsx
 * Sección de contacto en la calculadora de presupuestos.
 *
 * - Muestra teléfono, email y WhatsApp del proyecto.
 * - Se utiliza en el sidebar de la calculadora.
 */

import React from "react";

interface ContactInfo {
    telefono: string;
    email: string;
    whatsapp?: string;
}

interface Props {
    contacto: ContactInfo;
}

const BudgetContact: React.FC<Props> = ({ contacto }) => {
    return (
        <div className="mt-6 pt-6 border-t border-blue-700">
            <h4 className="font-semibold mb-2">Contacto</h4>
            <div className="text-sm space-y-1">
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
