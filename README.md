## React + TypeScript + Vite

# Rama de instalacion

1. Requisitos Previos
Antes de comenzar, asegúrate de tener instalada la versión de Node.js recomendada para este curso.

Node.js: Versión 22.x (LTS recomendada).

Gestor de paquetes: npm (viene incluido con Node).

Editor: Visual Studio Code.


2. Creación del Proyecto con Vite
Vite es una herramienta de construcción (build tool) que nos permite trabajar de forma extremadamente rápida. A diferencia de los métodos antiguos, Vite solo carga lo que necesitas en cada momento.

Ejecuta el siguiente comando en tu terminal para iniciar el asistente:

Bash
```
npm create vite@latest bitacora-viaje-react -- --template react-ts

```

Explicación de los flags:
bitacora-viaje-react: Es el nombre de la carpeta de nuestro proyecto.

--template react-ts: Le indica a Vite que queremos configurar el entorno específicamente para React utilizando TypeScript.

3. Instalación de Dependencias
Una vez creada la estructura, debemos movernos a la carpeta e instalar los módulos necesarios:

Bash
```
# Entrar a la carpeta
cd bitacora-viaje-react

# Instalar dependencias iniciales
npm install
```

4. Ejecución del Entorno de Desarrollo
Para ver nuestro proyecto en vivo y aprovechar el Hot Module Replacement (que actualiza la vista apenas guardamos un cambio), ejecutamos:

Bash
```
npm run dev

```
Esto nos devolverá una URL local (usualmente http://localhost:5173). ¡Ya estamos listos para empezar a codear!