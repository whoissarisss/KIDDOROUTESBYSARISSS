# 🚌✨ Kiddo Routes | Rutas Seguras Kids Dashboard

**Kiddo Routes** es un panel de control interactivo (Dashboard) diseñado para la gestión y monitoreo de rutas escolares infantiles. Combina una interfaz visualmente agradable, de estilo *tierno* y tonos pastel, con una logica bastante efectiva.

El sistema permite a los administradores crear nuevas rutas, inscribir estudiantes, asignar estudiantes a rutas y gestionar la capacidad de los autobuses, todo mientras se visualiza el clima en tiempo real para garantizar viajes seguros.

---
## 🎀 Características y Funcionalidades Principales

### 🚍 Gestión de Rutas (CRUD Completo)
* **Creación:** Formularios modales para crear nuevas rutas indicando nombre, nombre del conductor y hora de salida y clima inicial.
* **Edición:** Posibilidad de modificar el nombre de la ruta, el conductor y la hora directamente desde cada tarjeta de ruta.
* **Eliminación:** Borra rutas completas con actualización inmediata de la interfaz.
* **Control de Capacidad:** Cada ruta tiene un límite estricto de 10 estudiantes. El sistema alerta visualmente (cambio de color a rojo) cuando una ruta está llena e impide asignar más estudiantes.

### 👧👦 Administración de Estudiantes
* **Inscripción con validación correspondiente:** Registro de nuevos estudiantes con protección contra respuestas inválidas (evita números o campos vacíos).
* **Bandeja de Pendientes:** Los alumnos recién creados pasan a una lista de "Estudiantes Pendientes" hasta que se les asigne una ruta específica.
* **Asignación y Reasignación:** Menú interactivo para asignar estudiantes pendientes a las rutas disponibles.
* **Edición y Eliminación Individual:** Capacidad de editar el nombre de un alumno o bajarlo de una ruta con un solo clic.

### 🌤️ Integración de API Externa (Clima en Tiempo Real)
* Consumo asíncrono (`fetch` y `async/await`) de la API de **OpenWeather**.
* Muestra la temperatura y condición climática actual de la ciudad, integrando un icono descriptivo en el panel de estadísticas y en las tarjetas de los autobuses.

### 💾 Persistencia de Datos
* Uso estratégico de `LocalStorage` para mantener el estado de la aplicación.
* Si el usuario recarga o cierra el navegador, las rutas creadas, los estudiantes asignados y los estudiantes pendientes se conservan intactos.

### 🔔 Sistema de Notificaciones UI
* Notificaciones flotantes animadas que se muestran al usuario tras cada acción (ej. estudiante creado, ruta llena, errores de validación).

---

## 🛠️ Stack Tecnológico

Este proyecto está construido puramente con tecnologías nativas de la web (Vanilla), demostrando un dominio del DOM y las hojas de estilo sin depender de frameworks.

### HTML5 (`index.html`)
* **Semántica:** Estructuración limpia usando etiquetas como `<aside>`, `<main>`, `<section>` y `<nav>`.
* **Modales Ocultos:** Uso de capas modales flotantes controladas a través de clases CSS inyectadas por JavaScript.

### CSS3 (`estilitos.css`)
* **Diseño Responsivo:** Implementación de Media Queries para adaptar el dashboard a pantallas de escritorio (1440px y 1200px), tablets (768px) y dispositivos móviles (480px).
* **Variables CSS (Custom Properties):** Paleta de colores centralizada en `:root` (ej. `--pastel-pink`, `--bg-soft`) para un control estético uniforme y fácil mantenimiento.
* **Tipografías Personalizadas:** Integración de fuente externa (`KGPerfectPenmanship`) mediante `@font-face`.
* **Animaciones y Transiciones:** Uso intensivo de `transform`, `cubic-bezier`, y `box-shadow` para crear interacciones táctiles y efectos *hover* envolventes.

### Vanilla JavaScript (`javita.js`)
* **Web Components (Custom Elements):** Creación del componente encapsulado `<route-card>` extendiendo `HTMLElement`. Utiliza **Shadow DOM** para aislar los estilos de las tarjetas y evitar conflictos con el CSS global.
* **Manejo de Eventos Customizados:** Comunicación entre el Shadow DOM y el DOM principal usando `CustomEvent` (ej. `alumnoEliminado`, `rutaEditada`) con propagación (`bubbles: true`).
* **Programación Asíncrona:** Manejo de la API de OpenWeather con promesas y bloques `try/catch` para la gestión de errores.
* **Manipulación del DOM:** Filtrado de búsqueda en tiempo real (barra de búsqueda de rutas) e creación dinámica de elementos (`createElement`, `innerHTML`).

---

## 🚀 Guía de Instalación (Cualquier persona puede ejecutar este proyecto.)

**1. Clona el repositorio:**
```bash
git clone [https://github.com/TU-USUARIO/kiddo-routes.git](https://github.com/TU-USUARIO/kiddo-routes.git)
2. Navega al directorio del proyecto:
Bash
cd kiddo-routes
3. Ejecuta el proyecto:
Opción A: Abre directamente el archivo index.html en tu navegador web.
Opción B (Recomendada): Si usas Visual Studio Code, instala la extensión Live Server y haz clic en "Go Live" en la barra inferior para levantar un servidor de desarrollo local.

📝 Nota sobre la API del Clima: El proyecto incluye una clave de API pública de prueba en javita.js (1ddafd8c6e081646bed43c59c2eeb005). si deseas modificar la ciudad (actualmente configurada en Bucaramanga), te sugiero generar tu propia API Key gratuita en OpenWeatherMap y reemplazarla en el código.

📂 Estructura

kiddo-routes/
├── index.html       # Estructura de la aplicación y modales
├── estilitos.css    # Estilos globales, variables y Media Queries
├── javita.js        # Lógica de la app, Web Components y llamadas fetch
├── fonts/           # Fuente personalizadas (KGPerfectPenmanship)
└── img/             # Logos estáticos (isotipos, avatares, fondos)

✨ Diseñado y desarrollado con dedicación, combinando lógica estructurada con una estética visual muy cuidada.
Desarrollado por: Sara Sofia Ramirez Pedraza
***