/*
Componente UnauthorizedView con diseño profesional consistente con la calculadora
Vista de error elegante con información de contacto y acciones claras
Usa enfoque híbrido: Tailwind para layout + CSS modules para diseño específico
*/

import React from 'react';
import styles from '../../styles/components/UnauthorizedView.module.css';

interface UnauthorizedViewProps {
    // Props opcionales para futuras expansiones
}

const UnauthorizedView: React.FC<UnauthorizedViewProps> = () => {
    // Mensaje siempre amigable para clientes - nunca mostrar errores técnicos
    const clientMessage = "Para acceder a su presupuesto personalizado, necesita el enlace directo enviado por email. Si desea solicitar un nuevo presupuesto, puede contactarnos usando los botones de abajo.";

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Header con diseño profesional */}
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                            />
                        </svg>
                    </div>
                    <h1 className={styles.headerTitle}>
                        Acceso Restringido
                    </h1>
                    <p className={styles.headerSubtitle}>
                        Presupuesto Personalizado
                    </p>
                </div>

                {/* Contenido principal */}
                <div className={styles.content}>
                    <p className={styles.message}>
                        {clientMessage}
                    </p>

                    {/* Tarjeta de contacto profesional */}
                    <div className={styles.contactCard}>
                        <h2 className={styles.contactTitle}>
                            Solicitar Nuevo Presupuesto
                        </h2>
                        <div className={styles.contactDetails}>
                            <div className={styles.contactItem}>
                                <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 11.37c-.532.287-.532 1.067 0 1.354l4.126 2.227 2.227 4.126c.287.532 1.067.532 1.354 0l1.978-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className={styles.contactText}>
                                    <strong>Teléfono:</strong> +34 622 42 88 91
                                </span>
                            </div>

                            <div className={styles.contactItem}>
                                <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className={styles.contactText}>
                                    <strong>Email:</strong> nelsonvbarcelona@gmail.com
                                </span>
                            </div>
                            
                        </div>
                    </div>

                    {/* Botones de acción profesionales */}
                    <div className={styles.actions}>
                        <a
                            href="tel:+34622428891"
                            className={`${styles.actionButton} ${styles.primaryButton} ${styles.callButton}`}
                        >
                            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 11.37c-.532.287-.532 1.067 0 1.354l4.126 2.227 2.227 4.126c.287.532 1.067.532 1.354 0l1.978-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Llamar Ahora
                        </a>

                        <a
                            href="mailto:nelsonvbarcelona@gmail.com?subject=Solicitud de Presupuesto Web"
                            className={`${styles.actionButton} ${styles.secondaryButton}`}
                        >
                            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Enviar Email
                        </a>

                        <a
                            href="https://wa.me/34622428891?text=Hola, me gustaría solicitar un presupuesto para mi proyecto web."
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.actionButton} ${styles.tertiaryButton}`}
                        >
                            <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Footer informativo */}
                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Especialistas en desarrollo web profesional
                    </p>
                    <p className={styles.footerText}>
                        <strong>Horario de atención:</strong> Lunes a Viernes 9:00-18:00h
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedView;