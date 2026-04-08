# React + TypeScript + Vite

## Rama de funcionalidad, etapa 2.

En esta etapa, conectaremos los inputs de la "Bitácora" con el estado de React. Aprenderemos a usar ```useState``` para los datos y un ```useEffect``` inteligente para que la persistencia en ```localStorage``` sea automática.

### Paso 1: Inicialización del Estado con Persistencia
En lugar de variables globales, usaremos useState. Lo inicializaremos con una función (Lazy Initializer) para recuperar los datos guardados apenas cargue la app.

1- Importamos los hooks useState y useEffect de la libreria react
2- Dentro de la funcion ```App``` definimos el estado principal. Si hay datos guardados en el ```localStorage``` los obtenemos, si no definimos nuestro objeto como nulo y el array como vacio.
3- Definimos los estados locales para los inputs, es decir les asignamos valor por ahora y escuchamos cuando cambian
4- Usamos ```useEffect``` para realizar guardados automaticos cada vez que detectemos cambios en la variable de estado ```trip```


App.tsx:
```
// ## 1 ##
import { useState, useEffect } from 'react';

import { Viaje, Carga } from './types/viaje';
import { calcularEstadisticas } from './utils/calculos';


function App() {
  // ## 2 ##  
  // Estado principal: reemplaza a let viajeActual del script.js
  const [trip, setTrip] = useState<Trip>(() => {
    const savedRecords = localStorage.getItem('bitacora_viaje');
    return savedRecords ? JSON.parse(savedRecords) : { initKm: null, loads: [] };
  });
  // ## 3 ##
  // Estados locales para los inputs (controlados)
  const [kmInput, setKmInput] = useState<string>('');
  const [litersInput, setLitersInput] = useState<string>('');

  // ## 4 ##
  // Persistencia Automática: Cada vez que 'trip' cambie, se guarda solo.
  useEffect(() => {
    localStorage.setItem('bitacora_viaje', JSON.stringify(trip));
  }, [trip]);
  
  // ... sigue en el paso 2
```
### Paso 2: Lógica de Negocio (Agregar Carga)
Refactorizamos la función que antes escuchaba el evento submit. Ahora, simplemente actualizamos el estado usando el operador spread (...) para mantener la inmutabilidad.

Añade estas funciones dentro de App():
```
const addLoad = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const nuevaCarga: Load = {
      km: Number(kmInput),
      liters: Number(litersInput)
    };

    // Actualizamos el estado creando un nuevo objeto (Inmutabilidad)
    setTrip(prev => ({
      ...prev,
      cargas: [...prev.loads, nuevaCarga]
    }));

    // Limpiamos los inputs
    setKmInput('');
    setLitersInput('');
  };

  const resetTrip = () => {
    if (confirm('¿Deseas borrar toda la bitácora?')) {
      setTrip({ initKm: null, loads: [] });
    }
  };
```

