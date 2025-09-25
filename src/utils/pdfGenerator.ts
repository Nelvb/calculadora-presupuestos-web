/*
pdfGenerator.ts - Generador de PDF profesional completo CORREGIDO
Genera presupuesto completo usando información de los JSONs ampliados
Márgenes corregidos y toda la información técnica incluida
*/

import jsPDF from "jspdf";
import type { ProjectConfig, CalculatorState, CommonConfig } from "../config/types";

export function generateBudgetPDF(
    projectConfig: ProjectConfig,
    calculatorState: CalculatorState,
    total: number,
    savings: number,
    extras: number,
    monthly: number,
    commonConfig?: CommonConfig
) {
    const doc = new jsPDF();
    let yPos = 20;
    const margin = 20;
    const pageWidth = 170; 
    
    // Función para nueva página con márgenes seguros
    const newPage = () => {
        doc.addPage();
        yPos = 20;
    };

    // Función para verificar espacio con margen de seguridad
    const checkSpace = (needed: number) => {
        if (yPos + needed > 270) {
            newPage();
        }
    };

    // ✅ CORREGIDO: Función para línea divisoria con márgenes correctos
    const addDivider = (style: 'thin' | 'thick' = 'thin') => {
        checkSpace(8);
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(style === 'thick' ? 1 : 0.3);
        doc.line(margin, yPos, margin + pageWidth, yPos);
        yPos += style === 'thick' ? 10 : 6;
    };

    // ============ PÁGINA 1: HEADER Y RESUMEN ============
    
    // HEADER PRINCIPAL
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(24, 48, 82);
    doc.text("PRESUPUESTO WEB PROFESIONAL", margin, yPos);
    yPos += 12;

    doc.setFontSize(16);
    doc.setTextColor(70, 70, 70);
    doc.text(projectConfig.empresa, margin, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(projectConfig.descripcion, margin, yPos);
    yPos += 15;

    addDivider('thick');

    // RESUMEN EJECUTIVO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("RESUMEN EJECUTIVO", margin, yPos);
    yPos += 12;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    const executiveData = [
        `Proyecto: ${projectConfig.descripcion}`,
        `Tecnología: ${projectConfig.tecnologia}`,
        `Tiempo estimado: ${projectConfig.tiempo}`,
        `Precio total: ${total}€ (IVA no incluido)`
    ];

    executiveData.forEach(line => {
        checkSpace(6);
        doc.text(line, margin, yPos);
        yPos += 6;
    });

    yPos += 8;
    addDivider();

    // ALCANCE DEL PROYECTO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("ALCANCE DEL PROYECTO", margin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Funcionalidades incluidas:", margin, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);

    if (projectConfig.alcanceDelProyecto) {
        projectConfig.alcanceDelProyecto.forEach(item => {
            checkSpace(5);
            doc.text(`• ${item}`, margin + 5, yPos);
            yPos += 5;
        });
    }

    yPos += 10;
    addDivider();

    // ============ DESGLOSE POR PARTIDAS ============
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("DESGLOSE POR PARTIDAS", margin, yPos);
    yPos += 12;

    projectConfig.desglose.forEach((categoria, index) => {
        checkSpace(25);
        
        // ✅ CORREGIDO: Título de categoría con fondo que respeta márgenes
        doc.setFillColor(245, 248, 255);
        doc.rect(margin, yPos - 3, pageWidth, 12, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text(`${index + 1}. ${categoria.categoria} - ${categoria.precio}€`, margin + 5, yPos + 5);
        yPos += 15;

        // Items de la categoría
        if (categoria.items && categoria.items.length > 0) {
            categoria.items.forEach(item => {
                checkSpace(8);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                doc.setTextColor(100, 100, 100);
                
                // Concepto y descripción
                doc.text(`• ${item.concepto}`, margin + 10, yPos);
                yPos += 4;
                doc.text(`  ${item.descripcion}`, margin + 12, yPos);
                
                // ✅ CORREGIDO: Precio alineado dentro de márgenes
                doc.setTextColor(60, 60, 60);
                doc.text(`${item.precio}€`, margin + pageWidth - 25, yPos);
                yPos += 6;
            });
        }
        yPos += 5;
    });

    // ============ SERVICIOS PERSONALIZADOS (si hay) ============
    if (calculatorState.serviciosSeleccionados.length > 0) {
        checkSpace(30);
        addDivider();
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("SERVICIOS PERSONALIZADOS SELECCIONADOS", margin, yPos);
        yPos += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text("Servicios adicionales incluidos en su presupuesto:", margin, yPos);
        yPos += 12;

        calculatorState.serviciosSeleccionados.forEach(service => {
            checkSpace(10);
            
            const isDiscount = service.tipo === 'ahorro';
            
            // ✅ CORREGIDO: Fondo que respeta márgenes
            if (isDiscount) {
                doc.setFillColor(240, 255, 240);
            } else {
                doc.setFillColor(255, 245, 245);
            }
            doc.rect(margin, yPos - 2, pageWidth, 8, 'F');
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            doc.text(`• ${service.titulo}`, margin + 5, yPos + 3);
            
            // Precio con color
            if (isDiscount) {
                doc.setTextColor(40, 167, 69);
            } else {
                doc.setTextColor(220, 53, 69);
            }
            const tipo = isDiscount ? 'DESCUENTO' : 'SERVICIO EXTRA';
            const precio = service.precio < 0 ? `${service.precio}€` : `+${service.precio}€`;
            // ✅ CORREGIDO: Precio dentro de márgenes
            doc.text(`${tipo}: ${precio}`, margin + pageWidth - 60, yPos + 3);
            
            yPos += 10;
        });
    }

    // ============ PÁGINAS Y FUNCIONALIDADES INCLUIDAS ============
    if (projectConfig.paginasYFuncionalidades) {
        checkSpace(40);
        addDivider();
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("PÁGINAS Y FUNCIONALIDADES INCLUIDAS", margin, yPos);
        yPos += 12;

        // Páginas principales
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Páginas principales:", margin, yPos);
        yPos += 8;

        projectConfig.paginasYFuncionalidades.paginasPrincipales.forEach(pagina => {
            checkSpace(6);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(24, 48, 82);
            doc.text(`• ${pagina.nombre}:`, margin + 5, yPos);
            
            doc.setFont("helvetica", "normal");
            doc.setTextColor(80, 80, 80);
            doc.text(pagina.descripcion, margin + 35, yPos);
            yPos += 6;
        });

        yPos += 5;

        // Integraciones técnicas
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text("Integraciones técnicas:", margin, yPos);
        yPos += 8;

        projectConfig.paginasYFuncionalidades.integracionesTecnicas.forEach(integracion => {
            checkSpace(5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            doc.text(`• ${integracion}`, margin + 5, yPos);
            yPos += 5;
        });
    }

    // ============ NUEVA PÁGINA - INFRAESTRUCTURA TÉCNICA ============
    newPage();
    
    if (commonConfig?.infraestructuraTecnica) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("INFRAESTRUCTURA TÉCNICA", margin, yPos);
        yPos += 15;

        // Sistema de emails
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Sistema de emails:", margin, yPos);
        yPos += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(commonConfig.infraestructuraTecnica.sistemaEmails.descripcion, margin, yPos);
        yPos += 8;

        commonConfig.infraestructuraTecnica.sistemaEmails.opciones.forEach(opcion => {
            checkSpace(8);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`• ${opcion.nombre}`, margin + 5, yPos);
            
            doc.setFont("helvetica", "normal");
            doc.text(`${opcion.descripcion} - ${opcion.coste}`, margin + 8, yPos + 4);
            yPos += 8;
        });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(commonConfig.infraestructuraTecnica.sistemaEmails.configuracion, margin, yPos);
        yPos += 15;

        // Hosting y servidores
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(24, 48, 82);
        doc.text("Hosting y servidores:", margin, yPos);
        yPos += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(commonConfig.infraestructuraTecnica.hostingServidores.descripcion, margin, yPos);
        yPos += 10;

        commonConfig.infraestructuraTecnica.hostingServidores.opciones.forEach(opcion => {
            checkSpace(15);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`• ${opcion.tipo.charAt(0).toUpperCase() + opcion.tipo.slice(1)}: ${opcion.nombre}`, margin + 5, yPos);
            yPos += 5;
            
            doc.setFont("helvetica", "normal");
            doc.text(`  ${opcion.coste}`, margin + 8, yPos);
            yPos += 4;
            
            doc.text(`  Incluye:`, margin + 8, yPos);
            yPos += 4;
            
            opcion.incluye.forEach(item => {
                doc.text(`    - ${item}`, margin + 10, yPos);
                yPos += 4;
            });
            yPos += 3;
        });

        // Decisión del cliente
        yPos += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(commonConfig.infraestructuraTecnica.hostingServidores.decision.titulo, margin, yPos);
        yPos += 8;

        commonConfig.infraestructuraTecnica.hostingServidores.decision.opciones.forEach(opcion => {
            checkSpace(5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${opcion}`, margin + 5, yPos);
            yPos += 5;
        });
    }

    // ============ CRONOGRAMA ============
    checkSpace(50);
    addDivider();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("CRONOGRAMA", margin, yPos);
    yPos += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`PROYECTO BASE (${projectConfig.precioBase}€):`, margin, yPos);
    yPos += 10;

    // ✅ CORREGIDO: Header de tabla que respeta márgenes
    doc.setFillColor(24, 48, 82);
    doc.rect(margin, yPos, pageWidth, 10, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Semana", margin + 5, yPos + 7);
    doc.text("Tareas", margin + 30, yPos + 7);
    doc.text("Entregables", margin + 100, yPos + 7);
    yPos += 12;

    // Filas del cronograma
    projectConfig.cronograma.forEach((fase, index) => {
        checkSpace(8);
        
        // ✅ CORREGIDO: Fila alternada que respeta márgenes
        if (index % 2 === 0) {
            doc.setFillColor(248, 249, 250);
            doc.rect(margin, yPos - 2, pageWidth, 8, 'F');
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(`${fase.semana}`, margin + 10, yPos + 3);
        
        doc.setFont("helvetica", "normal");
        doc.text(fase.tareas, margin + 30, yPos + 3);
        doc.text(fase.entregables, margin + 100, yPos + 3);
        
        yPos += 8;
    });

    // Cronograma si hay servicios adicionales
    if (projectConfig.cronogramaSiAdicionales) {
        yPos += 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text(projectConfig.cronogramaSiAdicionales.titulo, margin, yPos);
        yPos += 8;

        projectConfig.cronogramaSiAdicionales.tiemposExtra.forEach(tiempo => {
            checkSpace(5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${tiempo.servicio}: ${tiempo.tiempo}`, margin + 5, yPos);
            yPos += 5;
        });

        if (projectConfig.cronogramaSiAdicionales.nota) {
            yPos += 5;
            doc.setFont("helvetica", "italic");
            doc.text(projectConfig.cronogramaSiAdicionales.nota, margin, yPos);
        }
    }

    // ============ RESUMEN FINANCIERO ============
    checkSpace(50);
    addDivider();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("RESUMEN FINANCIERO", margin, yPos);
    yPos += 15;

    // ✅ CORREGIDO: Caja de resumen financiero con márgenes correctos
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPos, pageWidth, 40);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);

    const financialData = [
        { label: "Precio base del proyecto:", value: `${projectConfig.precioBase}€`, colorR: 80, colorG: 80, colorB: 80 },
        ...(savings > 0 ? [{ label: "Descuentos aplicados:", value: `-${savings}€`, colorR: 40, colorG: 167, colorB: 69 }] : []),
        ...(extras > 0 ? [{ label: "Servicios adicionales:", value: `+${extras}€`, colorR: 220, colorG: 53, colorB: 69 }] : [])
    ];

    let tempY = yPos + 8;
    financialData.forEach(item => {
        doc.setTextColor(item.colorR, item.colorG, item.colorB);
        doc.text(item.label, margin + 10, tempY);
        // ✅ CORREGIDO: Valor alineado dentro de márgenes
        doc.text(item.value, margin + pageWidth - 40, tempY);
        tempY += 8;
    });

    // Total final destacado
    tempY += 3;
    doc.setDrawColor(24, 48, 82);
    doc.setLineWidth(1);
    // ✅ CORREGIDO: Línea dentro de márgenes
    doc.line(margin + 10, tempY, margin + pageWidth - 10, tempY);
    tempY += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(24, 48, 82);
    doc.text("PRECIO TOTAL:", margin + 10, tempY);
    doc.text(`${total}€`, margin + pageWidth - 40, tempY);

    yPos += 45;

    if (monthly > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(214, 158, 46);
        doc.text(`* Servicios mensuales estimados: ${monthly}€/mes`, margin, yPos);
        yPos += 8;
    }

    // ============ EJEMPLOS DE COSTES MENSUALES ============
    if (commonConfig?.ejemplosCostesMenuales) {
        checkSpace(60);
        addDivider();
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text(commonConfig.ejemplosCostesMenuales.titulo, margin, yPos);
        yPos += 15;

        commonConfig.ejemplosCostesMenuales.casos.forEach(caso => {
            checkSpace(20);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`${caso.nombre}:`, margin, yPos);
            yPos += 8;

            caso.componentes.forEach(componente => {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                doc.text(`${componente.concepto}: ${componente.coste}`, margin + 5, yPos);
                yPos += 5;
            });

            doc.setFont("helvetica", "bold");
            doc.text(`Total: ${caso.total}`, margin + 5, yPos);
            yPos += 10;
        });

        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.text(commonConfig.ejemplosCostesMenuales.nota, margin, yPos);
        yPos += 15;
    }

    // ============ NUEVA PÁGINA - SERVICIOS ADICIONALES ============
    newPage();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("SERVICIOS ADICIONALES DISPONIBLES", margin, yPos);
    yPos += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("(Desarrollo web únicamente)", margin, yPos);
    yPos += 15;

    // Agrupar servicios por sección
    const servicesBySecciones = projectConfig.serviciosExtra.reduce((acc, service) => {
        if (!acc[service.seccion]) {
            acc[service.seccion] = [];
        }
        acc[service.seccion].push(service);
        return acc;
    }, {} as Record<string, typeof projectConfig.serviciosExtra>);

    // Renderizar cada sección
    Object.entries(servicesBySecciones).forEach(([seccion, services]) => {
        checkSpace(20);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(24, 48, 82);
        doc.text(seccion.toUpperCase(), margin, yPos);
        yPos += 12;

        services.forEach(service => {
            checkSpace(12);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            doc.text(`• ${service.titulo}`, margin + 5, yPos);
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(service.descripcion, margin + 8, yPos + 5);
            
            doc.setFont("helvetica", "bold");
            if (service.tipo === 'ahorro') {
                doc.setTextColor(40, 167, 69);
                doc.text(`${service.precio}€`, margin + pageWidth - 30, yPos);
            } else {
                doc.setTextColor(220, 53, 69);
                doc.text(`+${service.precio}€`, margin + pageWidth - 30, yPos);
            }
            
            yPos += 12;
        });
        yPos += 8;
    });

    // ============ NUEVA PÁGINA - FORMA DE PAGO Y ACLARACIONES ============
    newPage();

    // FORMA DE PAGO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("FORMA DE PAGO", margin, yPos);
    yPos += 12;

    if (commonConfig?.formaPago) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(`• ${commonConfig.formaPago.porcentajes.inicio}% al inicio del proyecto: ${Math.round(total * commonConfig.formaPago.porcentajes.inicio / 100)}€`, margin, yPos);
        yPos += 7;
        doc.text(`• ${commonConfig.formaPago.porcentajes.produccion}% al finalizar: ${Math.round(total * commonConfig.formaPago.porcentajes.produccion / 100)}€`, margin, yPos);
        yPos += 7;
        doc.text(`• Formas de pago: ${commonConfig.formaPago.metodos.join(' o ')}`, margin, yPos);
        yPos += 15;
    }

    addDivider();

    // ACLARACIONES IMPORTANTES
    if (commonConfig?.aclaraciones) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("ACLARACIONES IMPORTANTES", margin, yPos);
        yPos += 15;

        // Lo que incluye
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("LO QUE INCLUYE EL PRECIO BASE:", margin, yPos);
        yPos += 10;

        commonConfig.aclaraciones.incluido.forEach(item => {
            checkSpace(5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${item}`, margin + 5, yPos);
            yPos += 5;
        });
        yPos += 8;

        // Lo que NO incluye
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("NO INCLUIDO (servicios adicionales):", margin, yPos);
        yPos += 10;

        commonConfig.aclaraciones.noIncluido.forEach(item => {
            checkSpace(5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${item}`, margin + 5, yPos);
            yPos += 5;
        });
        yPos += 10;

        // Aclaraciones específicas
        const aclaracionesEspecificas = [
            {
                titulo: "Sobre las redes sociales:",
                incluido: commonConfig.aclaraciones.sobreRedesSociales.incluido,
                noIncluido: commonConfig.aclaraciones.sobreRedesSociales.noIncluido
            },
            {
                titulo: "Sobre Google Analytics:",
                incluido: commonConfig.aclaraciones.sobreAnalytics.incluido,
                noIncluido: commonConfig.aclaraciones.sobreAnalytics.noIncluido
            },
            {
                titulo: "Sobre el SEO:",
                incluido: commonConfig.aclaraciones.sobreSEO.incluido,
                noIncluido: commonConfig.aclaraciones.sobreSEO.noIncluido
            }
        ];

        aclaracionesEspecificas.forEach(aclaracion => {
            checkSpace(15);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(aclaracion.titulo, margin, yPos);
            yPos += 6;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(`Incluido: ${aclaracion.incluido}`, margin + 5, yPos);
            yPos += 4;
            doc.text(`NO incluido: ${aclaracion.noIncluido}`, margin + 5, yPos);
            yPos += 8;
        });
    }

    // ============ SIGUIENTE PASO Y CONTACTO ============
    if (commonConfig?.siguientePaso) {
        checkSpace(40);
        addDivider();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("SIGUIENTE PASO", margin, yPos);
        yPos += 12;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(commonConfig.siguientePaso.titulo, margin, yPos);
        yPos += 8;

        commonConfig.siguientePaso.objetivos.forEach(objetivo => {
            checkSpace(5);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${objetivo}`, margin + 5, yPos);
            yPos += 5;
        });

        yPos += 10;

        // Información de contacto destacada con márgenes correctos
        doc.setFillColor(245, 248, 255);
        doc.rect(margin, yPos, pageWidth, 25, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text("CONTACTO", margin + 10, yPos + 8);
        yPos += 15;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text(`Teléfono: ${projectConfig.contacto.telefono}`, margin + 10, yPos);
        yPos += 6;
        doc.text(`Email: ${projectConfig.contacto.email}`, margin + 10, yPos);

        yPos += 15;

        // Información final
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`• Presupuesto válido: ${commonConfig?.validezPresupuesto || '30 días'}`, margin, yPos);
        yPos += 5;
        doc.text(`• Tiempo de ejecución: ${projectConfig.tiempo}`, margin, yPos);
        yPos += 5;
        doc.text("• Servicios adicionales: Se pueden contratar durante o después del desarrollo", margin, yPos);
    }

    // Footer en todas las páginas que respeta márgenes
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Página ${i} de ${totalPages}`, margin, 285);
        doc.text(`Generado automáticamente - ${new Date().toLocaleDateString('es-ES')}`, margin + 50, 285);
        doc.text(`${projectConfig.contacto.telefono} | ${projectConfig.contacto.email}`, margin + 120, 285);
    }

    // Descargar con nombre profesional
    const clientName = projectConfig.empresa.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');
    const fileName = `Presupuesto-${clientName}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
}