# Trabajo3Ionic

Aplicación móvil desarrollada con Ionic React para gestión de votaciones y encuestas.

## Descripción del Proyecto

Este proyecto es una aplicación móvil desarrollada como trabajo académico. La aplicación permite gestionar instancias de votación y encuestas, con funcionalidades para crear, editar y visualizar resultados. La aplicación funciona completamente con datos mock (simulados) y no requiere conexión a un servidor backend.

## Enfoque de Desarrollo

El desarrollo de esta aplicación se realizó siguiendo una arquitectura basada en componentes React con Ionic React. Se priorizó:

1. **Componentes Reutilizables**: Se crearon componentes comunes como `Toast`, `HomeSummary`, `Menu`, y `ProtectedRoute` para mantener el código DRY (Don't Repeat Yourself).

2. **Datos Mock**: Para facilitar el desarrollo y las pruebas, toda la lógica de datos se implementó con funciones mock que simulan llamadas a una API real, almacenadas en `src/utils/mockData.ts`.

3. **Componentes de Ionic**: Se utilizaron componentes nativos de Ionic para aprovechar las mejores prácticas de diseño móvil:
   - **IonModal**: Implementado en la página de Usuarios para mostrar detalles del usuario seleccionado en un modal interactivo
   - **IonRefresher**: Añadido en las páginas de Instancias y Encuestas para permitir actualizar los datos mediante el gesto de pull-to-refresh, mejorando la experiencia de usuario móvil

4. **Integración de Estilos**: Se combinó TailwindCSS v4 con FlyonUI para crear una interfaz moderna y consistente, manteniendo compatibilidad con los componentes de Ionic.

5. **Enrutamiento Protegido**: Se implementó un componente `ProtectedRoute` que verifica la autenticación del usuario antes de permitir el acceso a rutas protegidas.

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

## Compilar APK (Sin Firma)

Para generar el archivo APK de la aplicación **sin firma** (no firmado), tienes dos opciones:

### Método 1: Usando Android Studio (Recomendado)

1. **Compila el proyecto web**:
   ```bash
   npm run build
   ```

2. **Sincroniza con Capacitor**:
   ```bash
   npx cap sync android
   ```

3. **Abre el proyecto en Android Studio**:
   ```bash
   npx cap open android
   ```

4. **En Android Studio**:
   - Ve a `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Selecciona la variante `debug` (no requiere firma)
   - El APK se generará en: `android/app/build/outputs/apk/debug/app-debug.apk`

### Método 2: Usando Línea de Comandos (Gradle) - Más Rápido

1. **Compila y sincroniza** (todo en uno):
   ```bash
   npm run build:android
   ```

2. **Navega a la carpeta Android y compila el APK de debug** (sin firma):
   ```bash
   cd android
   .\gradlew assembleDebug
   ```

3. **El APK estará en**:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Método 3: Todo en un solo comando (Windows PowerShell)

```powershell
npm run build; npx cap sync android; cd android; .\gradlew assembleDebug
```

Luego el APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

### Notas Importantes

- **APK de Debug**: No requiere firma, perfecto para pruebas. Puede instalarse directamente en dispositivos Android.
- **Instalación**: Para instalar el APK, habilita "Orígenes desconocidos" en la configuración de seguridad de tu dispositivo Android.
- **Ubicación del APK**: Después de compilar, busca el archivo `app-debug.apk` en la ruta mencionada arriba.

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

### Problema 6: Integración de componentes nuevos de Ionic

**Contexto**: Al añadir los nuevos componentes `IonModal` e `IonRefresher`, fue necesario:

**IonModal**:
- Asegurar que el estado del modal se maneje correctamente con `isOpen` y `onDidDismiss`
- Configurar el slot del botón de cierre correctamente en el `IonToolbar`
- Gestionar el estado del usuario seleccionado para evitar errores cuando el modal se cierra

**IonRefresher**:
- Implementar la función `handleRefresh` que recibe un `CustomEvent`
- Completar el refresher correctamente usando `complete()` en el elemento target
- Extraer la lógica de carga de datos a funciones separadas para reutilización

**Solución**: 
- Refactorizar las funciones de carga de datos (`loadInstances`, `loadSurveys`) para que puedan ser llamadas tanto en `useEffect` como en el manejador de refresh
- Usar TypeScript correctamente para tipar los eventos (`CustomEvent`, `HTMLIonRefresherElement`)
- Añadir el slot `"fixed"` al `IonRefresher` para que funcione correctamente con el contenido scrolleable

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

## Componentes de Ionic Utilizados

La aplicación utiliza varios componentes de Ionic React para crear una experiencia móvil nativa:

### Componentes Básicos
- `IonApp`: Contenedor principal de la aplicación
- `IonPage`: Páginas individuales de la aplicación
- `IonHeader`, `IonToolbar`, `IonTitle`: Barra de navegación
- `IonContent`: Área de contenido principal
- `IonMenu`, `IonMenuToggle`: Menú lateral deslizable
- `IonList`, `IonItem`, `IonLabel`, `IonIcon`: Listas y elementos de menú

### Componentes Nuevos Añadidos
1. **IonModal**: Implementado en la página de Usuarios para mostrar detalles completos del usuario seleccionado. Permite ver información detallada sin navegar a otra página, mejorando la usabilidad.

2. **IonRefresher**: Añadido en las páginas de Instancias de Votación y Encuestas. Permite actualizar los datos deslizando hacia abajo (pull-to-refresh), una interacción estándar en aplicaciones móviles modernas.

## Funcionalidades Principales

- **Autenticación**: Login simulado (acepta cualquier email/password)
- **Gestión de Usuarios**: Ver y gestionar usuarios con modal de detalles
- **Instancias de Votación**: Crear, editar y ver instancias de votación con actualización pull-to-refresh
- **Encuestas**: Crear, editar y ver encuestas con actualización pull-to-refresh
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

# Compilar APK (sin firma)
npm run build:android    # Compilar y sincronizar (todo en uno)
cd android               # Ir a carpeta Android
.\gradlew assembleDebug  # Generar APK de debug (sin firma)
```

## Notas Importantes

- Siempre ejecuta `npm run build` antes de `npx cap sync android` para incluir los últimos cambios
- La aplicación está configurada para usar solo el tema light
- Todos los datos son simulados y no se guardan permanentemente
- El login acepta cualquier email y contraseña (solo para demostración)

Desarrollado como trabajo académico.
