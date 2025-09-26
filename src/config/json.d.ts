/* 
json.d.ts - Declaraciones de módulos JSON tipados
Permite a TypeScript reconocer e importar los archivos JSON
usando las interfaces definidas en types.ts
*/

import type { CommonConfig, MaintenanceConfig } from "./types";

// Declaración específica para common.json - múltiples patrones para asegurar compatibilidad
declare module "../config/base/common.json" {
    const value: CommonConfig;
    export default value;
}

declare module "./base/common.json" {
    const value: CommonConfig;
    export default value;
}

declare module "src/config/base/common.json" {
    const value: CommonConfig;
    export default value;
}

// Declaración usando patrón wildcard para cualquier common.json
declare module "**/common.json" {
    const value: CommonConfig;
    export default value;
}

// Declaración para cualquier maintenance.json (en cualquier ruta)
declare module "*/maintenance.json" {
    const value: MaintenanceConfig;
    export default value;
}

// Declaración genérica como fallback (no usar en producción salvo necesidad)
declare module "*.json" {
    const value: unknown;
    export default value;
}
