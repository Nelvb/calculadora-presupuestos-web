/*
Tipos TypeScript para la calculadora de presupuestos
Define las interfaces principales para proyectos, servicios y configuración
Permite reutilización entre diferentes tipos de presupuestos (reformas, legal, etc.)
*/

export interface ProjectBreakdown {
    categoria: string;
    precio: number;
    items?: BreakdownItem[];
}

export interface BreakdownItem {
    concepto: string;
    descripcion: string;
    precio: number;
}

export interface ServiceItem {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    tipo: 'ahorro' | 'extra';
    seccion: string;
}

export interface MaintenanceItem {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number; // precio mensual
}

export interface ContactInfo {
    telefono: string;
    email: string;
    whatsapp?: string;
    direccion?: string;
}

export interface ProjectConfig {
    id: string;
    empresa: string;
    precioBase: number;
    tecnologia: string;
    tiempo: string;
    descripcion: string;
    alcanceDelProyecto?: string[];
    desglose: ProjectBreakdown[];
    serviciosExtra: ServiceItem[];
    contacto: ContactInfo;
}

export interface CommonConfig {
    formaPago: {
        descripcion: string;
        porcentajes: {
            inicio: number;
            produccion: number;
        };
    };
    aclaraciones: {
        incluido: string[];
        noIncluido: string[];
        sobreMantenimiento: string;
        sobreSEO: string;
    };
    cronograma: {
        semana: number;
        tareas: string;
        entregables: string;
    }[];
}

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