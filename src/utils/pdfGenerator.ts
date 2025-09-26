/*
Generador de PDF profesional con espaciado y referencias corregidas
Sistema de espaciado consistente con constantes definidas
Referencias de contacto corregidas para usar commonConfig
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
    commonConfig: CommonConfig
) {
    const doc = new jsPDF();
    let yPos = 20;
    
    // ✅ CONSTANTES DE ESPACIADO CONSISTENTE
    const SPACING = {
        margin: 20,
        pageWidth: 170,
        sectionGap: 15,        // Entre secciones principales
        itemGap: 8,            // Entre items de lista
        subItemGap: 5,         // Entre sub-items
        lineHeight: 6,         // Altura de línea base
        titleGap: 12,          // Después de títulos
        paragraphGap: 10,      // Entre párrafos
        dividerGap: 8          // Espacio para divisores
    };
    
    // Función para nueva página
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

    // Función para línea divisoria
    const addDivider = (style: 'thin' | 'thick' = 'thin') => {
        checkSpace(SPACING.dividerGap);
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(style === 'thick' ? 1 : 0.3);
        doc.line(SPACING.margin, yPos, SPACING.margin + SPACING.pageWidth, yPos);
        yPos += style === 'thick' ? SPACING.paragraphGap : SPACING.itemGap;
    };

    // ============ PÁGINA 1: HEADER Y RESUMEN ============
    
    // HEADER PRINCIPAL
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(24, 48, 82);
    doc.text("PRESUPUESTO WEB PROFESIONAL", SPACING.margin, yPos);
    yPos += SPACING.titleGap;

    doc.setFontSize(16);
    doc.setTextColor(70, 70, 70);
    doc.text(projectConfig.empresa, SPACING.margin, yPos);
    yPos += SPACING.itemGap;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(projectConfig.descripcion, SPACING.margin, yPos);
    yPos += SPACING.sectionGap;

    addDivider('thick');

    // RESUMEN EJECUTIVO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("RESUMEN EJECUTIVO", SPACING.margin, yPos);
    yPos += SPACING.titleGap;

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
        checkSpace(SPACING.lineHeight);
        doc.text(line, SPACING.margin, yPos);
        yPos += SPACING.lineHeight;
    });

    yPos += SPACING.itemGap;
    addDivider();

    // ALCANCE DEL PROYECTO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("ALCANCE DEL PROYECTO", SPACING.margin, yPos);
    yPos += SPACING.paragraphGap;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Funcionalidades incluidas:", SPACING.margin, yPos);
    yPos += SPACING.itemGap;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);

    if (projectConfig.alcanceDelProyecto) {
        projectConfig.alcanceDelProyecto.forEach(item => {
            checkSpace(SPACING.subItemGap);
            doc.text(`• ${item}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
        });
    }

    yPos += SPACING.paragraphGap;
    addDivider();

    // ============ DESGLOSE POR PARTIDAS ============
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("DESGLOSE POR PARTIDAS", SPACING.margin, yPos);
    yPos += SPACING.titleGap;

    projectConfig.desglose.forEach((categoria, index) => {
        checkSpace(25);
        
        // Título de categoría con fondo
        doc.setFillColor(245, 248, 255);
        doc.rect(SPACING.margin, yPos - 3, SPACING.pageWidth, 12, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text(`${index + 1}. ${categoria.categoria} - ${categoria.precio}€`, SPACING.margin + 5, yPos + 5);
        yPos += SPACING.sectionGap;

        // Items de la categoría
        if (categoria.items && categoria.items.length > 0) {
            categoria.items.forEach(item => {
                checkSpace(SPACING.itemGap);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                doc.setTextColor(100, 100, 100);
                
                // Concepto y descripción
                doc.text(`• ${item.concepto}`, SPACING.margin + 10, yPos);
                yPos += 4;
                doc.text(`  ${item.descripcion}`, SPACING.margin + 12, yPos);
                
                // Precio alineado
                doc.setTextColor(60, 60, 60);
                doc.text(`${item.precio}€`, SPACING.margin + SPACING.pageWidth - 25, yPos);
                yPos += SPACING.lineHeight;
            });
        }
        yPos += SPACING.subItemGap;
    });

    // ============ SERVICIOS PERSONALIZADOS ============
    if (calculatorState.serviciosSeleccionados.length > 0) {
        checkSpace(30);
        addDivider();
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("SERVICIOS PERSONALIZADOS SELECCIONADOS", SPACING.margin, yPos);
        yPos += SPACING.paragraphGap;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text("Servicios adicionales incluidos en su presupuesto:", SPACING.margin, yPos);
        yPos += SPACING.titleGap;

        calculatorState.serviciosSeleccionados.forEach(service => {
            checkSpace(SPACING.paragraphGap);
            
            const isDiscount = service.tipo === 'ahorro';
            
            // Fondo coloreado
            if (isDiscount) {
                doc.setFillColor(240, 255, 240);
            } else {
                doc.setFillColor(255, 245, 245);
            }
            doc.rect(SPACING.margin, yPos - 2, SPACING.pageWidth, 8, 'F');
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            doc.text(`• ${service.titulo}`, SPACING.margin + 5, yPos + 3);
            
            // Precio con color
            if (isDiscount) {
                doc.setTextColor(40, 167, 69);
            } else {
                doc.setTextColor(220, 53, 69);
            }
            const tipo = isDiscount ? 'DESCUENTO' : 'SERVICIO EXTRA';
            const precio = service.precio < 0 ? `${service.precio}€` : `+${service.precio}€`;
            doc.text(`${tipo}: ${precio}`, SPACING.margin + SPACING.pageWidth - 60, yPos + 3);
            
            yPos += SPACING.paragraphGap;
        });
    }

    // ============ PÁGINAS Y FUNCIONALIDADES ============
    if (projectConfig.paginasYFuncionalidades) {
        checkSpace(40);
        addDivider();
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("PÁGINAS Y FUNCIONALIDADES INCLUIDAS", SPACING.margin, yPos);
        yPos += SPACING.titleGap;

        // Páginas principales
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Páginas principales:", SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        projectConfig.paginasYFuncionalidades.paginasPrincipales.forEach(pagina => {
            checkSpace(SPACING.lineHeight);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(24, 48, 82);
            doc.text(`• ${pagina.nombre}:`, SPACING.margin + 5, yPos);
            
            doc.setFont("helvetica", "normal");
            doc.setTextColor(80, 80, 80);
            doc.text(pagina.descripcion, SPACING.margin + 35, yPos);
            yPos += SPACING.lineHeight;
        });

        yPos += SPACING.subItemGap;

        // Integraciones técnicas
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text("Integraciones técnicas:", SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        projectConfig.paginasYFuncionalidades.integracionesTecnicas.forEach(integracion => {
            checkSpace(SPACING.subItemGap);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            doc.text(`• ${integracion}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
        });
    }

    // ============ NUEVA PÁGINA - INFRAESTRUCTURA ============
    newPage();
    
    if (commonConfig?.infraestructuraTecnica) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("INFRAESTRUCTURA TÉCNICA", SPACING.margin, yPos);
        yPos += SPACING.sectionGap;

        // Sistema de emails
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Sistema de emails:", SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(commonConfig.infraestructuraTecnica.sistemaEmails.descripcion, SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        commonConfig.infraestructuraTecnica.sistemaEmails.opciones.forEach(opcion => {
            checkSpace(SPACING.itemGap);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`• ${opcion.nombre}`, SPACING.margin + 5, yPos);
            
            doc.setFont("helvetica", "normal");
            doc.text(`${opcion.descripcion} - ${opcion.coste}`, SPACING.margin + 8, yPos + 4);
            yPos += SPACING.itemGap;
        });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(commonConfig.infraestructuraTecnica.sistemaEmails.configuracion, SPACING.margin, yPos);
        yPos += SPACING.sectionGap;

        // Hosting y servidores
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(24, 48, 82);
        doc.text("Hosting y servidores:", SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(commonConfig.infraestructuraTecnica.hostingServidores.descripcion, SPACING.margin, yPos);
        yPos += SPACING.paragraphGap;

        commonConfig.infraestructuraTecnica.hostingServidores.opciones.forEach(opcion => {
            checkSpace(SPACING.sectionGap);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(`• ${opcion.tipo.charAt(0).toUpperCase() + opcion.tipo.slice(1)}: ${opcion.nombre}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
            
            doc.setFont("helvetica", "normal");
            doc.text(`  ${opcion.coste}`, SPACING.margin + 8, yPos);
            yPos += 4;
            
            doc.text(`  Incluye:`, SPACING.margin + 8, yPos);
            yPos += 4;
            
            opcion.incluye.forEach(item => {
                doc.text(`    - ${item}`, SPACING.margin + 10, yPos);
                yPos += 4;
            });
            yPos += 3;
        });

        // Decisión del cliente
        yPos += SPACING.subItemGap;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(commonConfig.infraestructuraTecnica.hostingServidores.decision.titulo, SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        commonConfig.infraestructuraTecnica.hostingServidores.decision.opciones.forEach(opcion => {
            checkSpace(SPACING.subItemGap);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${opcion}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
        });
    }

    // ============ CRONOGRAMA ============
    checkSpace(50);
    addDivider();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("CRONOGRAMA", SPACING.margin, yPos);
    yPos += SPACING.titleGap;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`PROYECTO BASE (${projectConfig.precioBase}€):`, SPACING.margin, yPos);
    yPos += SPACING.paragraphGap;

    // Header de tabla
    doc.setFillColor(24, 48, 82);
    doc.rect(SPACING.margin, yPos, SPACING.pageWidth, 10, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Semana", SPACING.margin + 5, yPos + 7);
    doc.text("Tareas", SPACING.margin + 30, yPos + 7);
    doc.text("Entregables", SPACING.margin + 100, yPos + 7);
    yPos += SPACING.titleGap;

    // Filas del cronograma
    projectConfig.cronograma.forEach((fase, index) => {
        checkSpace(SPACING.itemGap);
        
        // Fila alternada
        if (index % 2 === 0) {
            doc.setFillColor(248, 249, 250);
            doc.rect(SPACING.margin, yPos - 2, SPACING.pageWidth, 8, 'F');
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(`${fase.semana}`, SPACING.margin + 10, yPos + 3);
        
        doc.setFont("helvetica", "normal");
        doc.text(fase.tareas, SPACING.margin + 30, yPos + 3);
        doc.text(fase.entregables, SPACING.margin + 100, yPos + 3);
        
        yPos += SPACING.itemGap;
    });

    // Cronograma adicionales
    if (projectConfig.cronogramaSiAdicionales) {
        yPos += SPACING.paragraphGap;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text(projectConfig.cronogramaSiAdicionales.titulo, SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        projectConfig.cronogramaSiAdicionales.tiemposExtra.forEach(tiempo => {
            checkSpace(SPACING.subItemGap);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${tiempo.servicio}: ${tiempo.tiempo}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
        });

        if (projectConfig.cronogramaSiAdicionales.nota) {
            yPos += SPACING.subItemGap;
            doc.setFont("helvetica", "italic");
            doc.text(projectConfig.cronogramaSiAdicionales.nota, SPACING.margin, yPos);
        }
    }

    // ============ RESUMEN FINANCIERO ============
    checkSpace(50);
    addDivider();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("RESUMEN FINANCIERO", SPACING.margin, yPos);
    yPos += SPACING.sectionGap;

    // Caja de resumen financiero
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.rect(SPACING.margin, yPos, SPACING.pageWidth, 40);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);

    const financialData = [
        { label: "Precio base del proyecto:", value: `${projectConfig.precioBase}€`, colorR: 80, colorG: 80, colorB: 80 },
        ...(savings > 0 ? [{ label: "Descuentos aplicados:", value: `-${savings}€`, colorR: 40, colorG: 167, colorB: 69 }] : []),
        ...(extras > 0 ? [{ label: "Servicios adicionales:", value: `+${extras}€`, colorR: 220, colorG: 53, colorB: 69 }] : [])
    ];

    let tempY = yPos + SPACING.itemGap;
    financialData.forEach(item => {
        doc.setTextColor(item.colorR, item.colorG, item.colorB);
        doc.text(item.label, SPACING.margin + 10, tempY);
        doc.text(item.value, SPACING.margin + SPACING.pageWidth - 40, tempY);
        tempY += SPACING.itemGap;
    });

    // Total final destacado
    tempY += 3;
    doc.setDrawColor(24, 48, 82);
    doc.setLineWidth(1);
    doc.line(SPACING.margin + 10, tempY, SPACING.margin + SPACING.pageWidth - 10, tempY);
    tempY += SPACING.itemGap;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(24, 48, 82);
    doc.text("PRECIO TOTAL:", SPACING.margin + 10, tempY);
    doc.text(`${total}€`, SPACING.margin + SPACING.pageWidth - 40, tempY);

    yPos += 45;

    if (monthly > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(214, 158, 46);
        doc.text(`* Servicios mensuales estimados: ${monthly}€/mes`, SPACING.margin, yPos);
        yPos += SPACING.itemGap;
    }

    // ============ EJEMPLOS DE COSTES MENSUALES ============
    if (commonConfig?.ejemplosCostesMenuales) {
        checkSpace(60);
        addDivider();
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text(commonConfig.ejemplosCostesMenuales.titulo, SPACING.margin, yPos);
        yPos += SPACING.sectionGap;

        commonConfig.ejemplosCostesMenuales.casos.forEach(caso => {
            checkSpace(20);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`${caso.nombre}:`, SPACING.margin, yPos);
            yPos += SPACING.itemGap;

            caso.componentes.forEach(componente => {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                doc.text(`${componente.concepto}: ${componente.coste}`, SPACING.margin + 5, yPos);
                yPos += SPACING.subItemGap;
            });

            doc.setFont("helvetica", "bold");
            doc.text(`Total: ${caso.total}`, SPACING.margin + 5, yPos);
            yPos += SPACING.paragraphGap;
        });

        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.text(commonConfig.ejemplosCostesMenuales.nota, SPACING.margin, yPos);
        yPos += SPACING.sectionGap;
    }

    // ============ NUEVA PÁGINA - SERVICIOS ADICIONALES ============
    newPage();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("SERVICIOS ADICIONALES DISPONIBLES", SPACING.margin, yPos);
    yPos += SPACING.subItemGap;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("(Desarrollo web únicamente)", SPACING.margin, yPos);
    yPos += SPACING.sectionGap;

    // Agrupar servicios por sección
    const allServices = [...(commonConfig.serviciosExtra || []), ...(projectConfig.serviciosExtra || [])];
    const servicesBySecciones = allServices.reduce((acc, service) => {
        if (!acc[service.seccion]) {
            acc[service.seccion] = [];
        }
        acc[service.seccion].push(service);
        return acc;
    }, {} as Record<string, typeof allServices>);

    // Renderizar cada sección
    Object.entries(servicesBySecciones).forEach(([seccion, services]) => {
        checkSpace(20);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(24, 48, 82);
        doc.text(seccion.toUpperCase(), SPACING.margin, yPos);
        yPos += SPACING.titleGap;

        services.forEach(service => {
            checkSpace(SPACING.titleGap);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            doc.text(`• ${service.titulo}`, SPACING.margin + 5, yPos);
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(service.descripcion, SPACING.margin + 8, yPos + 5);
            
            doc.setFont("helvetica", "bold");
            if (service.tipo === 'ahorro') {
                doc.setTextColor(40, 167, 69);
                doc.text(`${service.precio}€`, SPACING.margin + SPACING.pageWidth - 30, yPos);
            } else {
                doc.setTextColor(220, 53, 69);
                doc.text(`+${service.precio}€`, SPACING.margin + SPACING.pageWidth - 30, yPos);
            }
            
            yPos += SPACING.titleGap;
        });
        yPos += SPACING.itemGap;
    });

    // ============ NUEVA PÁGINA - FORMA DE PAGO ============
    newPage();

    // FORMA DE PAGO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(24, 48, 82);
    doc.text("FORMA DE PAGO", SPACING.margin, yPos);
    yPos += SPACING.titleGap;

    if (commonConfig?.formaPago) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(`• ${commonConfig.formaPago.porcentajes.inicio}% al inicio del proyecto: ${Math.round(total * commonConfig.formaPago.porcentajes.inicio / 100)}€`, SPACING.margin, yPos);
        yPos += SPACING.lineHeight + 1;
        doc.text(`• ${commonConfig.formaPago.porcentajes.produccion}% al finalizar: ${Math.round(total * commonConfig.formaPago.porcentajes.produccion / 100)}€`, SPACING.margin, yPos);
        yPos += SPACING.lineHeight + 1;
        doc.text(`• Formas de pago: ${commonConfig.formaPago.metodos.join(' o ')}`, SPACING.margin, yPos);
        yPos += SPACING.sectionGap;
    }

    addDivider();

    // ACLARACIONES IMPORTANTES
    if (commonConfig?.aclaraciones) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("ACLARACIONES IMPORTANTES", SPACING.margin, yPos);
        yPos += SPACING.sectionGap;

        // Lo que incluye
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("LO QUE INCLUYE EL PRECIO BASE:", SPACING.margin, yPos);
        yPos += SPACING.paragraphGap;

        commonConfig.aclaraciones.incluido.forEach(item => {
            checkSpace(SPACING.subItemGap);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${item}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
        });
        yPos += SPACING.itemGap;

        // Lo que NO incluye
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("NO INCLUIDO (servicios adicionales):", SPACING.margin, yPos);
        yPos += SPACING.paragraphGap;

        commonConfig.aclaraciones.noIncluido.forEach(item => {
            checkSpace(SPACING.subItemGap);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${item}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
        });
        yPos += SPACING.paragraphGap;

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
            checkSpace(SPACING.sectionGap);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(aclaracion.titulo, SPACING.margin, yPos);
            yPos += SPACING.lineHeight;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(`Incluido: ${aclaracion.incluido}`, SPACING.margin + 5, yPos);
            yPos += 4;
            doc.text(`NO incluido: ${aclaracion.noIncluido}`, SPACING.margin + 5, yPos);
            yPos += SPACING.itemGap;
        });
    }

    // ============ SIGUIENTE PASO Y CONTACTO ============
    if (commonConfig?.siguientePaso) {
        checkSpace(40);
        addDivider();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(24, 48, 82);
        doc.text("SIGUIENTE PASO", SPACING.margin, yPos);
        yPos += SPACING.titleGap;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(commonConfig.siguientePaso.titulo, SPACING.margin, yPos);
        yPos += SPACING.itemGap;

        commonConfig.siguientePaso.objetivos.forEach(objetivo => {
            checkSpace(SPACING.subItemGap);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(`• ${objetivo}`, SPACING.margin + 5, yPos);
            yPos += SPACING.subItemGap;
        });

        yPos += SPACING.paragraphGap;

        // Información de contacto destacada
        doc.setFillColor(245, 248, 255);
        doc.rect(SPACING.margin, yPos, SPACING.pageWidth, 25, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(24, 48, 82);
        doc.text("CONTACTO", SPACING.margin + 10, yPos + 8);
        yPos += SPACING.sectionGap;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text(`Teléfono: ${commonConfig.contacto.telefono}`, SPACING.margin + 10, yPos);
        yPos += SPACING.lineHeight;
        doc.text(`Email: ${commonConfig.contacto.email}`, SPACING.margin + 10, yPos);

        yPos += SPACING.sectionGap;

        // Información final
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`• Presupuesto válido: ${commonConfig?.validezPresupuesto || '30 días'}`, SPACING.margin, yPos);
        yPos += SPACING.subItemGap;
        doc.text(`• Tiempo de ejecución: ${projectConfig.tiempo}`, SPACING.margin, yPos);
        yPos += SPACING.subItemGap;
        doc.text("• Servicios adicionales: Se pueden contratar durante o después del desarrollo", SPACING.margin, yPos);
    }

    // Footer en todas las páginas
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Página ${i} de ${totalPages}`, SPACING.margin, 285);
        doc.text(`Generado automáticamente - ${new Date().toLocaleDateString('es-ES')}`, SPACING.margin + 50, 285);
        doc.text(`${commonConfig.contacto.telefono} | ${commonConfig.contacto.email}`, SPACING.margin + 120, 285);
    }

    // Descargar con nombre profesional
    const clientName = projectConfig.empresa.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');
    const fileName = `Presupuesto-${clientName}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
}