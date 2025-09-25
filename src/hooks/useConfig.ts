/*
Hook personalizado para cargar y gestionar la configuración de proyectos
Combina configuración común, específica del proyecto y servicios de mantenimiento
Proporciona datos centralizados para toda la aplicación
*/

import { useState, useEffect } from 'react';
import type { ProjectConfig, CommonConfig, MaintenanceItem } from '../config/types';
import commonConfig from '../config/base/common.json';
import maintenanceConfig from '../config/base/maintenance.json';

interface UseConfigReturn {
    projectConfig: ProjectConfig | null;
    commonConfig: CommonConfig;
    maintenanceItems: MaintenanceItem[];
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

                // Cargar configuración específica del proyecto
                let config;
                switch (projectType) {
                    case 'reformas':
                        config = await import('../config/projects/reformas.json');
                        break;
                    case 'legal':
                        // Para futuros proyectos
                        throw new Error('Configuración legal no disponible aún');
                    case 'fontaneria':
                        // Para futuros proyectos  
                        throw new Error('Configuración fontanería no disponible aún');
                    case 'demo':
                        // Usar configuración de reformas como demo
                        config = await import('../config/projects/reformas.json');
                        break;
                    default:
                        throw new Error(`Tipo de proyecto no válido: ${projectType}`);
                }

                setProjectConfig(config.default as ProjectConfig);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                console.error('Error cargando configuración:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (projectType) {
            loadProjectConfig();
        }
    }, [projectType]);

    // Convertir servicios de mantenimiento al formato esperado
    const maintenanceItems: MaintenanceItem[] = maintenanceConfig.serviciosMantenimiento.map(service => ({
        id: service.id,
        titulo: `${service.titulo} (${service.precio}€/mes)`,
        descripcion: service.descripcion,
        precio: service.precio
    }));

    return {
        projectConfig,
        commonConfig: commonConfig as CommonConfig,
        maintenanceItems,
        isLoading,
        error
    };
};