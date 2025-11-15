# Trabajo3Ionic

Aplicación móvil desarrollada con Ionic React para gestión de votaciones y encuestas.

## Descripción del Proyecto

Este proyecto es una aplicación móvil desarrollada como trabajo académico. La aplicación permite gestionar instancias de votación y encuestas, con funcionalidades para crear, editar y visualizar resultados. La aplicación funciona completamente con datos mock (simulados) y no requiere conexión a un servidor backend.

## Tecnologías Utilizadas

- **Ionic React**: Framework para desarrollo de aplicaciones móviles híbridas
- **Capacitor**: Para integrar la app web con plataformas nativas (Android)
- **TailwindCSS v4**: Framework de utilidades CSS
- **FlyonUI**: Biblioteca de componentes UI basada en TailwindCSS
- **React Router**: Para navegación entre páginas
- **TypeScript**: Lenguaje de programación

## Requisitos Previos

Antes de instalar y ejecutar el proyecto, necesitas tener instalado:

- **Node.js** versión 16 o superior (recomendado usar nvm para gestionar versiones)
- **npm** (viene con Node.js)
- **Android Studio** (para desarrollo y pruebas en Android)
- **Java JDK** 8 o superior

## Instalación

1. Clona o descarga el proyecto
2. Abre una terminal en la carpeta del proyecto
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

### Desarrollo Web

Para ejecutar la aplicación en el navegador durante el desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilar para Producción

Para generar los archivos compilados:

```bash
npm run build
```

Esto crea la carpeta `dist/` con los archivos listos para producción.

### Vista Previa de Producción

Para probar la versión compilada:

```bash
npm run preview
```

## Desarrollo Android

### Configuración Inicial

1. Construye la aplicación:
   ```bash
   npm run build
   ```

2. Sincroniza con Android:
   ```bash
   npx cap sync android
   ```

3. Abre en Android Studio:
   ```bash
   npx cap open android
   ```

### Ejecutar en Emulador o Dispositivo

Una vez abierto en Android Studio:
- Crea un emulador desde AVD Manager (si no tienes uno)
- Conecta un dispositivo físico con USB y habilita depuración USB
- Haz clic en el botón "Run" en Android Studio

## Problemas Enfrentados y Soluciones

### Problema 1: Versión de Node.js incompatible

**Error**: `Unsupported engine for @ionic/cli@7.2.1: wanted: {"node":">=16.0.0"}`

**Solución**: Cambiar la versión de Node.js usando nvm:
```bash
nvm install 22
nvm use 22
```

### Problema 2: Ionic CLI no reconocido

**Error**: `ionic : El término 'ionic' no se reconoce...`

**Solución**: Instalar Ionic CLI globalmente:
```bash
npm install -g @ionic/cli
```

### Problema 3: Plataforma Android no encontrada

**Error**: `Could not find the android platform`

**Solución**: Instalar el paquete de Capacitor para Android:
```bash
npm install @capacitor/android
npx cap add android
```

### Problema 4: Iconos no encontrados en ionicons

**Error**: `Module '"ionicons/icons"' has no exported member 'ballot'`

**Solución**: Reemplazar iconos inexistentes por otros disponibles:
- `ballot` → `clipboard`
- `documentText` → `document`

### Problema 5: Integración de TailwindCSS y FlyonUI

**Solución**: 
- Agregar el plugin de TailwindCSS en `vite.config.ts`
- Importar estilos en `src/styles/global.css`
- Configurar FlyonUI con tema light

## Estructura del Proyecto

```
Trabajo3Ionic/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Páginas de la aplicación
│   ├── utils/           # Utilidades (rutas, cookies, datos mock)
│   ├── styles/          # Estilos globales
│   └── App.tsx          # Componente principal
├── android/             # Proyecto nativo Android (generado por Capacitor)
├── dist/                # Archivos compilados (se genera con npm run build)
└── package.json         # Dependencias del proyecto
```

## Datos Mock

La aplicación utiliza datos simulados almacenados en `src/utils/mockData.ts`. Todas las funciones de API en `src/utils/routes.ts` devuelven estos datos mock en lugar de hacer llamadas reales a un servidor. Esto permite que la aplicación funcione completamente sin backend.

## Funcionalidades Principales

- **Autenticación**: Login simulado (acepta cualquier email/password)
- **Gestión de Usuarios**: Ver y gestionar usuarios
- **Instancias de Votación**: Crear, editar y ver instancias de votación
- **Encuestas**: Crear, editar y ver encuestas
- **Balance**: Visualizar créditos de encuestas y votaciones
- **Resultados**: Ver resultados de instancias y encuestas finalizadas

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo
npm run build            # Compilar para producción
npm run preview          # Vista previa de producción

# Testing
npm run test.unit        # Tests unitarios
npm run test.e2e         # Tests end-to-end
npm run lint             # Verificar código

# Capacitor
npx cap sync android     # Sincronizar cambios con Android
npx cap copy android     # Copiar solo archivos web
npx cap open android     # Abrir en Android Studio
```

## Notas Importantes

- Siempre ejecuta `npm run build` antes de `npx cap sync android` para incluir los últimos cambios
- La aplicación está configurada para usar solo el tema light
- Todos los datos son simulados y no se guardan permanentemente
- El login acepta cualquier email y contraseña (solo para demostración)

Desarrollado como trabajo académico.
