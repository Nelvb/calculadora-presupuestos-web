/*
 * App.tsx
 * Aplicación principal de la calculadora de presupuestos.
 *
 * - Gestiona autenticación mediante tokens en URL.
 * - Carga la configuración del proyecto según parámetros.
 * - Renderiza la calculadora o una vista de error según corresponda.
 */

import React from "react";
import { isValidAccess, getUrlParams } from "./config/tokens";
import "./styles/index.css";
import type { TokenConfig } from "./config/types";
import BudgetCalculator from "./components/calculator/BudgetCalculator";
import UnauthorizedView from "./components/common/UnauthorizedView";
import LoadingSpinner from "./components/common/LoadingSpinner";

interface AccessValidation {
  valid: boolean;
  config?: TokenConfig;
  error?: string;
}

function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [accessValidation, setAccessValidation] =
    React.useState<AccessValidation>({
      valid: false,
    });

  React.useEffect(() => {
    // Simular carga para mejorar la UX
    const timer = setTimeout(() => {
      const validation = isValidAccess();
      setAccessValidation(validation);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!accessValidation.valid) {
    return <UnauthorizedView error={accessValidation.error} />;
  }

  const { project } = getUrlParams();

  if (!project || !accessValidation.config) {
    return <UnauthorizedView error="Configuración inválida" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BudgetCalculator
        projectType={project}
        tokenConfig={accessValidation.config}
      />
    </div>
  );
}

export default App;
