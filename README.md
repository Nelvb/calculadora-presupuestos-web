# 📊 Calculadora de Presupuestos Web

Una plataforma web moderna para generar presupuestos dinámicos e interactivos. Sistema modular que permite crear calculadoras personalizadas para diferentes tipos de proyectos (reformas, servicios legales, fontanería, etc.) con autenticación por tokens.

## 🎯 ¿Qué hace la plataforma?

La **Calculadora de Presupuestos Web** es una aplicación React que permite a empresas ofrecer presupuestos interactivos a sus clientes a través de URLs privadas. Los clientes pueden:

- ✅ Visualizar el precio base del proyecto
- ✅ Añadir servicios extras con cálculo automático
- ✅ Aplicar descuentos por seleccionar paquetes de ahorro
- ✅ Elegir planes de mantenimiento mensual
- ✅ Generar y descargar presupuestos en PDF
- ✅ Acceder solo con token válido (seguridad)

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas y Archivos

```
calculadora-presupuestos-web/
├── public/                              # Archivos estáticos
│   └── vite.svg                        # Logo de Vite
├── src/                                 # Código fuente principal
│   ├── components/                      # Componentes React
│   │   ├── calculator/                  # Componentes específicos de la calculadora
│   │   │   ├── BudgetCalculator.tsx    # 🎯 Contenedor principal - orquesta toda la calculadora
│   │   │   ├── BudgetPreview.tsx       # Vista previa del presupuesto (no implementada)
│   │   │   ├── sections/               # Secciones de la calculadora
│   │   │   │   ├── ExtrasSection.tsx   # Servicios adicionales que suman al precio
│   │   │   │   ├── MaintenanceSection.tsx # Planes de mantenimiento mensual
│   │   │   │   └── SavingsSection.tsx  # Servicios de ahorro que descuentan del precio
│   │   │   └── sidebar/                # Componentes del sidebar derecho
│   │   │       ├── BudgetActions.tsx   # Botones de acción (PDF, limpiar, etc.)
│   │   │       ├── BudgetContact.tsx   # Información de contacto de la empresa
│   │   │       ├── BudgetSummary.tsx   # Resumen de servicios seleccionados
│   │   │       └── BudgetTotals.tsx    # Cálculos finales y totales
│   │   └── common/                     # Componentes reutilizables
│   │       ├── LoadingSpinner.tsx      # Indicador de carga
│   │       └── UnauthorizedView.tsx    # Pantalla de acceso denegado
│   ├── config/                         # Configuración del sistema
│   │   ├── base/                       # Configuraciones base reutilizables
│   │   │   ├── common.json            # Forma de pago, cronogramas, aclaraciones
│   │   │   └── maintenance.json       # Servicios de mantenimiento disponibles
│   │   ├── projects/                   # Configuraciones específicas por proyecto
│   │   │   └── reformas.json          # Configuración para proyectos de reforma
│   │   ├── tokens.ts                   # 🔐 Sistema de autenticación por tokens
│   │   └── types.ts                    # Definiciones TypeScript para toda la app
│   ├── hooks/                          # Hooks personalizados de React
│   │   ├── useCalculator.ts            # 🧮 Lógica de cálculos y estado de la calculadora
│   │   └── useConfig.ts                # Carga configuraciones desde JSON
│   ├── styles/                         # Estilos globales
│   │   └── index.css                   # CSS principal con Tailwind
│   ├── utils/                          # Utilidades
│   │   └── pdfGenerator.ts             # 📄 Generación de presupuestos en PDF
│   ├── App.tsx                         # 🚀 Componente principal - maneja autenticación
│   └── main.tsx                        # Punto de entrada de React
├── dist/                               # Build de producción (generado)
├── node_modules/                       # Dependencias (generado)
├── .git/                              # Control de versiones Git
├── .gitignore                         # Archivos ignorados por Git
├── eslint.config.js                   # Configuración del linter
├── index.html                         # Template HTML principal
├── package.json                       # Dependencias y scripts del proyecto
├── package-lock.json                  # Lock de dependencias exactas
├── tsconfig.json                      # Configuración de TypeScript
├── tsconfig.app.json                  # Config TypeScript para la app
└── tsconfig.node.json                 # Config TypeScript para herramientas
```

## 🔧 Componentes Principales

### **App.tsx** - Control de Acceso
- Valida tokens de autenticación en la URL
- Gestiona estados de carga y error
- Renderiza la calculadora o vista de acceso denegado

### **BudgetCalculator.tsx** - Orquestador Principal
- Carga configuración del proyecto usando `useConfig()`
- Inicializa la lógica de cálculos con `useCalculator()`
- Organiza el layout en dos columnas: secciones + sidebar
- Muestra información de la empresa y del cliente

### **Hooks Personalizados**

#### `useCalculator.ts` - Motor de Cálculos
- Mantiene el estado de servicios seleccionados
- Calcula totales, ahorros y extras dinámicamente
- Funciones para agregar/quitar servicios y mantenimiento
- Exporta funciones de cálculo para componentes

#### `useConfig.ts` - Gestor de Configuraciones
- Carga configuraciones JSON basadas en el tipo de proyecto
- Combina configuración base con configuración específica
- Maneja errores de carga y estados de carga

### **Sistema de Autenticación (tokens.ts)**
- Array de tokens válidos con expiración
- Validación de acceso por proyecto específico
- Soporte para múltiples clientes con URLs únicas
- Generación automática de URLs con token

## ⚙️ Configuración Modular

### Tipos de Proyectos Soportados
- **reformas**: Proyectos de reforma y construcción
- **legal**: Servicios jurídicos
- **fontaneria**: Servicios de fontanería
- **demo**: Proyecto de demostración

### Estructura de Configuración JSON
```json
{
  "empresa": "Nombre de la empresa",
  "precioBase": 1500,
  "tecnologia": "React + TypeScript",
  "tiempo": "4-6 semanas",
  "descripcion": "Descripción del servicio",
  "desglose": [/* breakdown de costes */],
  "serviciosExtra": [/* servicios adicionales */],
  "contacto": {/* datos de contacto */}
}
```

## 🎨 Tecnologías Utilizadas

- **React 19** - Framework frontend
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utilitarios
- **Vite** - Build tool y dev server
- **jsPDF** - Generación de PDFs
- **ESLint** - Linter de código

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Verificar código
npm run preview  # Preview del build
```

## 🔒 Sistema de Seguridad

### Autenticación por Tokens
- URLs privadas: `?project=reformas&token=rf_2024_abc123`
- Validación de expiración automática
- Control de acceso por cliente específico
- Tokens desactivables individualmente

### Flujo de Acceso
1. Cliente recibe URL personalizada con token
2. App valida token al cargar
3. Si es válido, carga configuración del proyecto
4. Si es inválido, muestra vista de acceso denegado

## 📊 Funcionalidades de Cálculo

### Tipos de Servicios
- **Ahorros**: Servicios que reducen el precio total (descuentos)
- **Extras**: Servicios adicionales que incrementan el precio
- **Mantenimiento**: Costes recurrentes mensuales

### Cálculo Dinámico
- Precio final = Precio base + Extras + Ahorros
- Ahorros se almacenan como valores negativos
- Mantenimiento se calcula por separado (mensual)
- Actualización en tiempo real al seleccionar servicios

## 📄 Generación de PDFs

### Características
- Diseño profesional con header de empresa
- Desglose completo de servicios seleccionados
- Totales claramente diferenciados
- Información de contacto incluida
- Descarga automática al generar

## 🎯 Casos de Uso

### Para Empresas
- Ofrecer presupuestos interactivos a clientes
- Personalizar servicios por tipo de proyecto
- Control de acceso seguro por cliente
- Generación automática de documentos

### Para Clientes
- Explorar opciones de servicios fácilmente
- Ver impacto en precio en tiempo real
- Descargar presupuesto oficial en PDF
- Acceso privado y seguro a su presupuesto

## 🚀 Extensibilidad

### Añadir Nuevos Proyectos
1. Crear JSON en `src/config/projects/`
2. Añadir token en `src/config/tokens.ts`
3. Configurar servicios específicos del proyecto

### Personalizar Componentes
- Secciones modulares en `/sections/`
- Sidebar configurable en `/sidebar/`
- Estilos con Tailwind CSS
- Tipos TypeScript para seguridad

---

**🎉 Plataforma lista para producción con arquitectura escalable y mantenible.**