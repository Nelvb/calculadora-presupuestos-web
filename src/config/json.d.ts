/* 
json.d.ts - Declaraciones de módulos JSON tipados
Permite a TypeScript reconocer e importar los archivos JSON
usando las interfaces definidas en types.ts
*/

import type { CommonConfig, MaintenanceConfig } from "./types";

// Declaración para cualquier common.json (en cualquier ruta)
declare module "*/common.json" {
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
