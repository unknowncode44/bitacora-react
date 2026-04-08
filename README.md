# React + TypeScript + Vite

## Rama de funcionalidad, etapa 2.

En esta etapa, conectaremos los inputs de la "Bitácora" con el estado de React. Aprenderemos a usar ```useState``` para los datos y un ```useEffect``` inteligente para que la persistencia en ```localStorage``` sea automática.

### Paso 1: Inicialización del Estado con Persistencia
En lugar de variables globales, usaremos useState. Lo inicializaremos con una función (Lazy Initializer) para recuperar los datos guardados apenas cargue la app.

1- Importamos los hooks useState y useEffect de la libreria react
2- Dentro de la funcion ```App``` definimos el estado principal. Si hay datos guardados en el ```localStorage``` los obtenemos, si no definimos nuestro objeto como nulo y el array como vacio.
3- Definimos los estados locales para los inputs, es decir les asignamos valor por ahora y escuchamos cuando cambian
4- Usamos ```useEffect``` para realizar guardados automaticos cada vez que detectemos cambios en la variable de estado ```trip```

App.tsx despues de estas implementaciones
```
import './App.css'
import { useState, useEffect } from 'react';
import type { CalcResult, Load, Trip } from './models/types'
import { calculateStatics } from './utils/calculations'

function App() {
  // variable reactiva y parte del estado: trip
  const [trip, setTrip] = useState<Trip>(() => {
    const savedRecords = localStorage.getItem('bitacora_viaje');
    return savedRecords ? JSON.parse(savedRecords) : { initKm: 0, loads: [] };
  });

  // variable reactiva y parte del estado: results
  const [results, setResults] = useState<CalcResult | null>(() => {
    const initResults = calculateStatics(trip)
    return initResults
  })


  // Estados locales para los inputs (controlados)

  // Estado para el input de km inicial
  const [initKmInput, setInitKmInput] = useState<string>(trip.initKm?.toString() || '0');

  // Estado inputs kms durante la carga y litros
  const [kmInput, setKmInput] = useState<string>('');
  const [litersInput, setLitersInput] = useState<string>('');


  // Persistencia Automática: Cada vez que 'trip' cambie, se guarda solo.
  useEffect(() => {
    localStorage.setItem('bitacora_viaje', JSON.stringify(trip));
    setResults(calculateStatics(trip))
  }, [trip]);

  const addLoad = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newLoad: Load = {
      km: Number(kmInput),
      liters: Number(litersInput)
    };

    // Actualizamos el estado creando un nuevo objeto (Inmutabilidad)
    setTrip(prev => ({
      ...prev,
      loads: [...prev.loads, newLoad]
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



  return (
    <div className='bg-gray-200 min-h-screen flex items-center justify-center p-6 font-sans'>
      <div className="w-full max-w-6xl flex gap-6">
        <div className="w-1/2 bg-white p-6 rounded-2xl shadow">

          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Registro de Carga
          </h1>

          <form onSubmit={addLoad} className="flex flex-col gap-4 justify-center">
            <div className="mb-1 p-2 bg-green-100 rounded-lg border border-green-100">
              <label className="block text-sm font-bold text-green-900">KM Inicial del Vehículo</label>
              <input
                type="number"
                value={initKmInput}
                onChange={(e) => {
                  const valor = Number(e.target.value);
                  setInitKmInput(e.target.value);
                  // Actualizamos el objeto base
                  setTrip(prev => ({ ...prev, initKm: valor }));
                }}
                // Se bloquea si ya hay cargas registradas (regla de negocio)
                disabled={trip.loads.length > 0}
                className={`w-full p-2 border rounded-md outline-none transition-all ${trip.loads.length > 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'bg-white border-green-300 focus:ring-2 focus:ring-green-500'
                  }`}
              />
              {trip.loads.length > 0 && (
                <p className="text-[10px] text-green-600 mt-1 uppercase font-bold">
                  KM Inicial fijado (Limpia el viaje para modificar)
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kilometraje Actual</label>
              <input
                type="number"
                value={kmInput}
                onChange={(e) => setKmInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Ej: 10450"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Litros Cargados</label>
              <input
                type="number"
                value={litersInput}
                onChange={(e) => setLitersInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Ej: 35"
                required
              />
            </div>
            <button type="submit" className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Agregar Carga
            </button>
          </form>
          <div id="resultado" className="mt-8 text-center min-h-12.5 transition-all duration-500">
          </div>
        </div>

        <div className="w-1/2 bg-white p-6 rounded-2xl shadow flex flex-col">

          <h2 className="text-xl font-semibold text-gray-700 mb-1">
            Historial de Cargas
          </h2>

          {/* Mapeo de cargas: Reemplaza al renderTabla() manual */}
          <div className="flex-1 overflow-y-auto">
            {/* PRIMERA INYECCION DE JS: Insertamos los km iniciales */}
            <label className="w-full flex flex-row align-center justify-start mb-1">Movil Inicia con: <span className="px-4 font-bold">{trip.initKm?.toFixed(2)} km</span></label>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2">KM</th>
                  <th className="p-2">Litros</th>
                </tr>
              </thead>
              <tbody id="tabla-historial">

                {/* SEGUNDA INYECCION DE JS: utilizamos la funcion de array ".map" y retornamos elementos HTML para cada uno de los items en el array de cargas*/}
                {trip.loads.map((load, index) => (

                  <tr key={index} className="border-b">
                    <td className="p-2 text-gray-600">{load.km} km</td>
                    <td className="p-2 text-gray-600">{load.liters} L</td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>

          {/* Sección de Resultados */}
          {results ? (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in duration-500">
              <p className="text-green-800"><strong>Distancia total:</strong> {results.totalDistance} km</p>
              <p className="text-green-800"><strong>Consumo promedio:</strong> {results.averageConsumption.toFixed(2)} L/100km</p>
            </div>
          ) : (
            <p className="mt-6 text-center text-gray-400 italic">Completa los datos para ver el cálculo</p>
          )}
          <div className="mt-4 flex gap-2">
            {/* <button id="btn-calcular" type="button" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Calcular Viaje
            </button> */}
            <button id="btn-reset" onClick={resetTrip} type="button" className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition">
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
```