import './App.css'
import type { Trip } from './models/types'
import { calculateStatics } from './utils/calculations'

function App() {
  // Datos de prueba (Hardcoded) para ver que la estructura funciona
  const exampleTrip: Trip = {
    initKm: 10000,
    loads: [
      { km: 10400, liters: 30 },
      { km: 10850, liters: 35 }
    ]
  };

  const results = calculateStatics(exampleTrip);

  return (
    <div className='bg-gray-200 min-h-screen flex items-center justify-center p-6 font-sans'>
      <div className="w-full max-w-6xl flex gap-6">
        <div className="w-1/2 bg-white p-6 rounded-2xl shadow">

          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Registro de Carga
          </h1>

          <form id="calc-form" className="flex flex-col gap-4">

            <div>
              <label className="text-sm text-gray-600">Kilometraje inicial</label>
              <input id="km-inicio" type="number" min="0" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Kilometraje actual</label>
              <input id="km-actual" type="number" min="0" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Litros cargados</label>
              <input id="litros" type="number" step="0.01" min="0.01" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
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
            <label className="w-full flex flex-row align-center justify-start mb-1">Movil Inicia con: <span className="px-4 font-bold">{exampleTrip.initKm?.toFixed(2)} km</span></label>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2">KM</th>
                  <th className="p-2">Litros</th>
                </tr>
              </thead>
              <tbody id="tabla-historial">

                {/* SEGUNDA INYECCION DE JS: utilizamos la funcion de array ".map" y retornamos elementos HTML para cada uno de los items en el array de cargas*/}
                {exampleTrip.loads.map((load, index) => (

                  <tr key={index} className="border-b">
                    <td className="p-2 text-gray-600">{load.km} km</td>
                    <td className="p-2 text-gray-600">{load.liters} L</td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>

          {/* Sección de Resultados */}
          {results && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
              {/* TERCERA INYECCION DE JS: obtenemos los valores de distancia y promedio desde nuestro variable results */}
              <p>Distancia: {results.totalDistance} km</p>
              <p>Promedio: {results.averageConsumption.toFixed(2)} L/100km</p>
            </div>
          )}
          <div className="mt-4 flex gap-2">
            <button id="btn-calcular" type="button" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Calcular Viaje
            </button>
            <button id="btn-reset" type="button" className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition">
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App