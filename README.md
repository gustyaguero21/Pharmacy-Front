# 💊 Pharmacy Front

> Aplicación web frontend para la gestión de una farmacia, desarrollada con ReactJS, JavaScript y Material UI. El sistema consume la API REST desarrollada con Flask para consultar y administrar categorías, medicamentos y empleados.

---

## 👥 Integrantes

* **Gustavo Aguero**
* **Juan Molina**

---

## 📝 Descripción

**Pharmacy Front** es la interfaz web de la plataforma de administración de farmacias.

El proyecto fue desarrollado utilizando **ReactJS** y **JavaScript**, utilizando **Material UI (MUI)** para la construcción de la interfaz gráfica.

El frontend se comunica con la **Pharmacy API**, desarrollada en Flask, para obtener y gestionar la información almacenada en la base de datos MySQL.

La aplicación permite acceder a las principales funcionalidades de administración de la farmacia:

* 📊 **Dashboard:** visualización general de la información del sistema.
* 💊 **Medicamentos:** consulta y gestión de los medicamentos registrados.
* 🗂️ **Categorías:** visualización y administración de las categorías.
* 👥 **Empleados:** consulta y gestión del personal.
* 🔐 **Inicio de sesión:** acceso a la aplicación mediante una pantalla de login.
* 🔗 **Integración con API:** comunicación entre el frontend React y el backend Flask.

---

## 🛠️ Tecnologías utilizadas

| **Tecnología**     | **Descripción**                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **ReactJS**        | Biblioteca utilizada para desarrollar la interfaz de usuario.                              |
| **JavaScript**     | Lenguaje principal utilizado para la lógica del frontend.                                  |
| **Material UI**    | Biblioteca utilizada para construir los componentes visuales y el diseño de la aplicación. |
| **React Hooks**    | Utilizados para manejar estados y comportamientos de los componentes.                      |
| **Vite**           | Herramienta utilizada para crear y ejecutar el proyecto React durante el desarrollo.       |
| **Fetch/API REST** | Utilizado para comunicarse con el backend desarrollado en Flask.                           |

---

## ⚙️ Requisitos previos

Para ejecutar el proyecto es necesario contar con:

* **Node.js**
* **npm**
* **ReactJS**
* **Vite**
* **Pharmacy API** funcionando localmente.

---

## 🚀 Instalación

### 1. Clonar el repositorio

Clonar el repositorio del frontend:

```bash
git clone <repositorio-del-frontend>
```

Ingresar a la carpeta del proyecto:

```bash
cd Pharmacy-Front
```

### 2. Instalar las dependencias

Ejecutar:

```bash
npm install
```

Esto instala las dependencias necesarias para ejecutar la aplicación.

### 3. Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego se puede acceder a la aplicación desde la dirección indicada por Vite, normalmente:

```text
http://localhost:5173
```

---

# 🖥️ Interfaz de usuario

La interfaz fue desarrollada utilizando **Material UI**, permitiendo utilizar componentes prediseñados como:

* `Button`
* `Card`
* `TextField`
* `Typography`
* `Box`
* `IconButton`
* `InputAdornment`
* barras de navegación
* iconos de Material UI

Esto permitió construir una interfaz sencilla y consistente sin tener que crear todos los componentes visuales desde cero.

---

# 🔐 Inicio de sesión

La aplicación cuenta con una pantalla inicial de inicio de sesión.

Esta pantalla fue construida utilizando componentes de Material UI y contiene:

* Campo para usuario.
* Campo para contraseña.
* Iconos identificativos.
* Botón de ingreso.
* Diseño centrado dentro de la pantalla.

El objetivo del login es proporcionar un punto de entrada a la plataforma y separar la pantalla de acceso del resto de las funcionalidades administrativas.

---

# 📊 Dashboard

El **Dashboard** funciona como pantalla principal del sistema.

Su objetivo es mostrar rápidamente un resumen de la información disponible en la farmacia.

Actualmente muestra tarjetas con la cantidad de:

* 💊 Medicamentos.
* 🗂️ Categorías.
* 👥 Empleados.

Cada tarjeta permite identificar rápidamente la cantidad de registros existentes y cuenta con una opción para acceder a la sección correspondiente.

Además, se incorporó una navegación principal para acceder a las diferentes partes de la aplicación:

```text
Dashboard
Medicamentos
Categorías
Empleados
```

### 🎨 Diseño del Dashboard

Se buscó utilizar una apariencia moderna y relacionada con el ámbito farmacéutico.

Se trabajó con:

* Colores claros y cálidos.
* Tarjetas con bordes y sombras.
* Diferentes tonos relacionados con el área de salud.
* Elementos decorativos.
* Animaciones visuales.

También se incorporaron elementos laterales con luces animadas inspiradas en las luces de una ambulancia, utilizando una combinación de colores azul y rojo.

Estas luces se utilizan principalmente como elemento visual para darle mayor dinamismo al Dashboard sin afectar su funcionalidad.

---

# 💊 Medicamentos

La sección de **Medicamentos** está destinada a mostrar y administrar los medicamentos registrados en la farmacia.

La interfaz cuenta con elementos para:

* Mostrar medicamentos.
* Buscar medicamentos.
* Agregar medicamentos.
* Eliminar medicamentos.
* Consultar la información disponible.

Para la búsqueda se utiliza un `TextField` de Material UI acompañado de un icono de búsqueda.

La información mostrada en esta sección proviene de la API desarrollada con Flask.

---

# 🗂️ Categorías

La sección de **Categorías** permite organizar los medicamentos según su clasificación.

Dentro de la interfaz se trabajó con botones para representar diferentes categorías, por ejemplo:

* Todos
* Analgésicos
* Antibióticos
* Antiinflamatorios
* Antialérgicos

Estos elementos permiten organizar y filtrar visualmente los medicamentos según su categoría.

La información definitiva de las categorías se obtiene desde el backend mediante la API.

---

# 👥 Empleados

La sección de **Empleados** permite visualizar y administrar el personal registrado en el sistema.

Desde esta sección se pueden consultar los empleados almacenados en la base de datos y realizar las operaciones correspondientes mediante la API.

La interfaz mantiene el mismo diseño general utilizado en las demás secciones para que toda la aplicación tenga una apariencia uniforme.

---

# 🔗 Comunicación con la API

Uno de los puntos principales del proyecto es la comunicación entre el frontend y el backend.

La arquitectura utilizada es:

```text
┌──────────────────────┐
│    React Frontend    │
│                      │
│ JavaScript + MUI     │
└──────────┬───────────┘
           │
           │ HTTP Requests
           ▼
┌──────────────────────┐
│    Flask API         │
│                      │
│ REST Endpoints       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       MySQL          │
│                      │
│ Categorías           │
│ Medicamentos         │
│ Empleados            │
└──────────────────────┘
```

El frontend realiza solicitudes HTTP a los endpoints de la API para obtener o modificar información.

De esta manera, React se encarga principalmente de la **interfaz y experiencia del usuario**, mientras que Flask se encarga de la **lógica del backend y comunicación con MySQL**.

---

# 🧩 Componentización

El proyecto utiliza el enfoque basado en componentes de React.

Cada parte de la aplicación se puede separar en componentes reutilizables, permitiendo organizar mejor el código.

Entre las principales partes desarrolladas se encuentran:

```text
Login
Dashboard
Medicamentos
Categorías
Empleados
Navbar / navegación
Cards
Formularios
Botones
Campos de búsqueda
```

El uso de componentes permite modificar una parte de la interfaz sin tener que modificar toda la aplicación.

---

# 🎨 Material UI

**Material UI** fue utilizado como biblioteca principal para la construcción visual del frontend.

Algunos de los componentes utilizados son:

```javascript
Box
Card
CardContent
Typography
TextField
Button
IconButton
InputAdornment
```

También se utilizaron los iconos proporcionados por:

```text
@mui/icons-material
```

Por ejemplo, para representar visualmente acciones como búsqueda, usuario y contraseña.

El objetivo fue mantener una interfaz sencilla, moderna y fácil de utilizar.

---

# 📁 Estructura general

La estructura del frontend se organiza de manera modular para separar las diferentes partes de la aplicación.

Una estructura general del proyecto es:

```text
Pharmacy-Front/
├── 📁 src/
│   ├── 📁 components/
│   │   └── Componentes reutilizables
│   │
│   ├── 📁 pages/
│   │   ├── Login
│   │   ├── Dashboard
│   │   ├── Medicamentos
│   │   ├── Categorías
│   │   └── Empleados
│   │
│   ├── 📄 App.jsx
│   ├── 📄 main.jsx
│   └── 📄 ...
│
├── 📄 package.json
├── 📄 vite.config.js
└── 📄 README.md
```

La estructura puede variar según la organización final del proyecto, pero se mantiene la separación entre las páginas, componentes y lógica de la aplicación.

---

# 🔄 Flujo de funcionamiento

El funcionamiento general de la aplicación es:

```text
1. El usuario ingresa al frontend.
              ↓
2. Se muestra la pantalla de Login.
              ↓
3. El usuario accede al sistema.
              ↓
4. Se muestra el Dashboard.
              ↓
5. El Dashboard obtiene información de la API.
              ↓
6. El usuario puede acceder a:
       ├── Medicamentos
       ├── Categorías
       └── Empleados
              ↓
7. React realiza las solicitudes correspondientes.
              ↓
8. Flask procesa las solicitudes.
              ↓
9. Flask consulta/modifica MySQL.
              ↓
10. La respuesta vuelve al frontend.
              ↓
11. React actualiza la interfaz.
```

---

# 🤝 Distribución de tareas

### **Gustavo Aguero**

* Desarrollo y configuración del backend.
* Diseño de la arquitectura de la API.
* Desarrollo de endpoints REST.
* Integración con MySQL.
* Gestión de categorías, medicamentos y empleados desde el backend.

### **Juan Molina**

* Desarrollo del frontend con ReactJS.
* Implementación de la interfaz utilizando Material UI.
* Desarrollo del Dashboard.
* Implementación de la pantalla de Login.
* Desarrollo de las secciones de Medicamentos, Categorías y Empleados.
* Implementación de componentes visuales.
* Integración del frontend con la API Flask.
* Diseño y personalización visual de la aplicación.

---

# 🔗 Integración del proyecto

El sistema completo está dividido en dos partes principales:

### Backend

```text
Pharmacy API
Python + Flask + MySQL
```

Se encarga de la lógica, los datos y los endpoints REST.

### Frontend

```text
Pharmacy Front
ReactJS + JavaScript + Material UI
```

Se encarga de mostrar la información y permitir que el usuario interactúe con el sistema.

Ambos proyectos trabajan conjuntamente para formar la plataforma de administración de la farmacia.

