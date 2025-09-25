/*
Sistema de autenticación para URLs privadas de presupuestos
Controla qué clientes pueden acceder a qué proyectos específicos
Para añadir nuevos clientes: agregar entrada al array VALID_TOKENS
*/

import type { TokenConfig } from './types';

export const VALID_TOKENS: TokenConfig[] = [
    {
        project: 'reformas',
        token: 'rf_2024_abc123',
        client: 'García Reformas S.L.',
        expires: '2024-12-31',
        active: true
    },
    {
        project: 'legal',
        token: 'lg_2024_xyz789',
        client: 'Bufete López & Asociados',
        expires: '2024-12-31',
        active: true
    },
    {
        project: 'fontaneria',
        token: 'ft_2024_def456',
        client: 'Fontanería Madrid Express',
        expires: '2024-12-31',
        active: true
    },
    // Token genérico para demos (siempre activo)
    {
        project: 'demo',
        token: 'demo_token_2024',
        client: 'Demo - Ejemplo',
        active: true
    }
];

/**
 * Valida si un token es correcto para un proyecto específico
 */
export const validateToken = (project: string, token: string): TokenConfig | null => {
    const validToken = VALID_TOKENS.find(
        t => t.project === project &&
            t.token === token &&
            t.active
    );

    if (!validToken) {
        return null;
    }

    // Verificar expiración si existe
    if (validToken.expires) {
        const expirationDate = new Date(validToken.expires);
        const now = new Date();

        if (now > expirationDate) {
            console.warn(`Token expired for project ${project}`);
            return null;
        }
    }

    return validToken;
};

/**
 * Genera nueva URL con token para un proyecto
 */
export const generateProjectUrl = (project: string, baseUrl: string = window.location.origin): string => {
    const tokenConfig = VALID_TOKENS.find(t => t.project === project && t.active);

    if (!tokenConfig) {
        throw new Error(`No active token found for project: ${project}`);
    }

    return `${baseUrl}?project=${project}&token=${tokenConfig.token}`;
};

/**
 * Extrae parámetros de la URL actual
 */
export const getUrlParams = (): { project?: string; token?: string } => {
    const urlParams = new URLSearchParams(window.location.search);

    return {
        project: urlParams.get('project') || undefined,
        token: urlParams.get('token') || undefined
    };
};

/**
 * Verifica si el acceso actual es válido
 */
export const isValidAccess = (): { valid: boolean; config?: TokenConfig; error?: string } => {
    const { project, token } = getUrlParams();

    if (!project || !token) {
        return {
            valid: false,
            error: 'Missing project or token parameters'
        };
    }

    const config = validateToken(project, token);

    if (!config) {
        return {
            valid: false,
            error: 'Invalid or expired token'
        };
    }

    return {
        valid: true,
        config
    };
};