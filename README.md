# React + TypeScript + Vite

# Rama de instalación de TailwindCSS

En esta versión, Tailwind se integra de forma nativa con Vite mediante un plugin oficial, lo que hace que el proceso sea más limpio y rápido.

1. Instalación de dependencias
Ejecutamos el comando para instalar Tailwind v4 y su motor de optimización para Vite:

Bash
```
npm install tailwindcss @tailwindcss/vite
```

2. Configuración del Plugin en Vite
Debemos avisarle a Vite que use el motor de Tailwind. Para esto, abre el archivo vite.config.ts y modifícalo de la siguiente manera:

TypeScript
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // [!code ++]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // [!code ++]
  ],
})
```

3. Importación en el CSS Global
A diferencia de la v3, ahora solo necesitamos una única línea en nuestro archivo de estilos principal.

Abre src/index.css, borra todo su contenido y pega lo siguiente:

CSS
```
@import "tailwindcss";
```

4. Prueba de funcionamiento (Smoke Test)
Para asegurarnos de que todo está bien antes de empezar con el verdadero código, vamos a limpiar el archivo App.tsx y añadir unas clases de prueba.

Archivo: src/App.tsx

TypeScript
```
function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-cyan-500">
        <h1 className="text-3xl font-bold text-slate-800">
          Tailwind <span className="text-cyan-600">v4</span> funcionando 🚀
        </h1>
        <p className="mt-2 text-slate-600">
          Node 22 + Vite + React + TS
        </p>
        <button className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
          Probar botón
        </button>
      </div>
    </div>
  )
}

export default App
```
