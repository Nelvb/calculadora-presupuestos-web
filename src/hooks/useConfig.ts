/*
Hook personalizado para cargar y gestionar la configuración de proyectos
Combina configuración común, específica del proyecto y servicios de mantenimiento
Proporciona datos centralizados para toda la aplicación
*/

import { useState, useEffect } from "react";
import type {
    ProjectConfig,
    CommonConfig,
    MaintenanceItem,
    MaintenanceConfig,
    ServiceItem,
} from "../config/types";

import commonConfig from "../config/base/common.json";
import maintenanceConfig from "../config/base/maintenance.json";

interface UseConfigReturn {
    projectConfig: ProjectConfig | null;
    commonConfig: CommonConfig;
    maintenanceConfig: MaintenanceConfig;
    maintenanceItems: MaintenanceItem[];
    extrasComunes: ServiceItem[];
    ahorrosComunes: ServiceItem[];
    extrasProyecto: ServiceItem[];
    isLoading: boolean;
    error: string | null;
}

export const useConfig = (projectType: string): UseConfigReturn => {
    const [projectConfig, setProjectConfig] = useState<ProjectConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjectConfig = async () => {
            try {
                setIsLoading(true);
                setError(null);

                let config;
                switch (projectType) {
                    case "reformas":
                        config = await import("../config/projects/reformas.json");
                        break;
                    case "demo":
                        config = await import("../config/projects/reformas.json");
                        break;
                    case "legal":
                        throw new Error("Configuración legal no disponible aún");
                    case "fontaneria":
                        throw new Error("Configuración fontanería no disponible aún");
                    default:
                        throw new Error(`Tipo de proyecto no válido: ${projectType}`);
                }

                setProjectConfig(config.default as ProjectConfig);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Error desconocido";
                setError(errorMessage);
                console.error("Error cargando configuración:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (projectType) {
            loadProjectConfig();
        }
    }, [projectType]);

    // Normalizar servicios de mantenimiento
    const maintenanceItems: MaintenanceItem[] =
        maintenanceConfig.serviciosMantenimiento.map((service) => ({
            id: service.id,
            titulo: service.titulo,
            descripcion: service.descripcion,
            precio: service.precio,
        }));

    // Separar extras/ahorros comunes
    const extrasComunes: ServiceItem[] =
        ((commonConfig as unknown as CommonConfig).serviciosExtra || []).filter(
            (s: ServiceItem) => s.tipo === "extra"
        );

    const ahorrosComunes: ServiceItem[] =
        ((commonConfig as unknown as CommonConfig).serviciosExtra || []).filter(
            (s: ServiceItem) => s.tipo === "ahorro"
        );

    // Extras específicos del proyecto
    const extrasProyecto: ServiceItem[] =
        projectConfig?.serviciosExtra || [];

    return {
        projectConfig,
        commonConfig: commonConfig as unknown as CommonConfig,
        maintenanceConfig: maintenanceConfig as unknown as MaintenanceConfig,
        maintenanceItems,
        extrasComunes,
        ahorrosComunes,
        extrasProyecto,
        isLoading,
        error,
    };
};
