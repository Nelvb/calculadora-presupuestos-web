/* 
types.ts - Tipos TypeScript para la calculadora de presupuestos
Definición centralizada de interfaces para proyectos, servicios, mantenimiento
y configuración general. Garantiza tipado estricto y reutilizable.
*/

// =============================
// Partidas y desglose
// =============================

export interface BreakdownItem {
    concepto: string;
    descripcion: string;
    precio: number;
}

export interface ProjectBreakdown {
    categoria: string;
    precio: number;
    items?: BreakdownItem[];
}

// =============================
// Servicios adicionales
// =============================

export interface ServiceItem {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    tipo: "ahorro" | "extra"; // descuento o servicio adicional
    seccion: string; // categoría del servicio (ej. Diseño, Contenidos…)
}

// =============================
// Mantenimiento
// =============================

export interface MaintenanceItem {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number; // precio mensual
    detalles?: string[];
}

export interface MaintenancePackage {
    nombre: string;
    descripcion: string;
    servicios: string[]; // IDs de servicios incluidos
    precioMensual: number;
    ahorro?: number;
    recomendadoPara: string;
}

export interface HostingOption {
    tipo: string;
    proveedor: string;
    precio: string;
    incluye: string[];
    recomendadoPara: string;
}

export interface MaintenanceConfig {
    serviciosMantenimiento: MaintenanceItem[];
    paquetesRecomendados: MaintenancePackage[];
    costesHosting: {
        opciones: HostingOption[];
    };
    aclaracionesMantenimiento: {
        soportePostEntrega: string;
        noIncluidoEnSoporte: string[];
        politicaMantenimiento: string;
    };
}

// =============================
// Información de contacto
// =============================

export interface ContactInfo {
    telefono: string;
    email: string;
    whatsapp?: string;
    direccion?: string;
}

// =============================
// Cronograma
// =============================

export interface CronogramaFase {
    semana: number;
    tareas: string;
    entregables: string;
}

// =============================
// Infraestructura técnica
// =============================

export interface EmailOption {
    tipo: string;
    nombre: string;
    descripcion: string;
    coste: string;
}

export interface SistemaEmails {
    descripcion: string;
    opciones: EmailOption[];
    configuracion: string;
}

export interface HostingOpcion {
    tipo: string;
    nombre: string;
    coste: string;
    incluye: string[];
    recomendadoPara: string;
}

export interface HostingServidores {
    descripcion: string;
    opciones: HostingOpcion[];
    decision: {
        titulo: string;
        opciones: string[];
    };
}

export interface InfraestructuraTecnica {
    sistemaEmails: SistemaEmails;
    hostingServidores: HostingServidores;
}

// =============================
// Ejemplos de costes
// =============================

export interface ComponenteCoste {
    concepto: string;
    coste: string;
}

export interface CasoCosteEjemplo {
    nombre: string;
    componentes: ComponenteCoste[];
    total: string;
}

export interface EjemplosCostesMenuales {
    titulo: string;
    casos: CasoCosteEjemplo[];
    nota: string;
}

// =============================
// Páginas y funcionalidades
// =============================

export interface PaginaPrincipal {
    nombre: string;
    descripcion: string;
}

export interface PaginasYFuncionalidades {
    paginasPrincipales: PaginaPrincipal[];
    integracionesTecnicas: string[];
}

// =============================
// Cronograma con adicionales
// =============================

export interface TiempoExtra {
    servicio: string;
    tiempo: string;
}

export interface CronogramaSiAdicionales {
    titulo: string;
    tiemposExtra: TiempoExtra[];
    nota: string;
}

// =============================
// Siguiente paso
// =============================

export interface SiguientePaso {
    titulo: string;
    objetivos: string[];
}

// =============================
// Aclaraciones ampliadas
// =============================

export interface AclaracionDetallada {
    incluido: string;
    noIncluido: string;
}

export interface AclaracionesAmpliadas {
    incluido: string[];
    noIncluido: string[];
    sobreRedesSociales: AclaracionDetallada;
    sobreAnalytics: AclaracionDetallada;
    sobreSEO: AclaracionDetallada;
    sobreMantenimiento: {
        incluido: string;
        noIncluido: string;
    };
    sobreMarketing: {
        noOfrecemos: string;
        recomendacion: string;
    };
}

// =============================
// Configuración de proyectos
// =============================

export interface ProjectConfig {
    id: string;
    empresa: string;
    precioBase: number;
    tecnologia: string;
    tiempo: string;
    descripcion: string;
    resumenEjecutivo?: {
        proyecto: string;
        tiempoEstimado: string;
        precio: string;
    };
    alcanceDelProyecto?: string[];
    paginasYFuncionalidades?: PaginasYFuncionalidades;
    cronogramaSiAdicionales?: CronogramaSiAdicionales;
    desglose: ProjectBreakdown[];
    serviciosExtra: ServiceItem[];
    contacto?: ContactInfo;
    cronograma: CronogramaFase[];
}

// =============================
// Configuración común
// =============================

export interface CommonConfig {
    formaPago: {
        descripcion: string;
        porcentajes: {
            inicio: number;
            produccion: number;
        };
        metodos: string[];
    };
    contacto: ContactInfo;
    infraestructuraTecnica?: InfraestructuraTecnica;
    ejemplosCostesMenuales?: EjemplosCostesMenuales;
    aclaraciones?: AclaracionesAmpliadas;
    queNecesitamosDelCliente?: string[];
    validezPresupuesto?: string;
    notaImportante?: string;
    siguientePaso?: SiguientePaso;
    cronograma?: CronogramaFase[];
    serviciosExtra: ServiceItem[];
}

// =============================
// Otros
// =============================

export interface TokenConfig {
    project: string;
    token: string;
    client: string;
    expires?: string;
    active: boolean;
}

export interface CalculatorState {
    precioBase: number;
    ahorros: number;
    extras: number;
    mantenimientoMensual: number;
    serviciosSeleccionados: ServiceItem[];
    mantenimientoSeleccionado: MaintenanceItem[];
}

export interface ExportData {
    proyecto: ProjectConfig;
    calculadora: CalculatorState;
    fecha: string;
    cliente?: string;
}
