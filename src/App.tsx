import './App.css'
import { useState, useEffect } from 'react';
import type { CalcResult, Load, Trip } from './models/types'
import { calculateStatics } from './utils/calculations'
import { ConsumptionForm } from './components/ConsumptionForm';
import { TableResults } from './components/TableResults';


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

          <form className="flex flex-col gap-4 justify-center">
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
          </form>

          <ConsumptionForm
            onAddLoad={addLoad}
            kmInput={kmInput}
            setKmInput={setKmInput}
            litersInput={litersInput}
            setLitersInput={setLitersInput}
          />
        </div>

        <div className="w-1/2 bg-white p-6 rounded-2xl shadow flex flex-col">
          <TableResults
            trip={trip}
            results={results}
            resetTrip={resetTrip}
          />
        </div>
      </div>
    </div>
  )
}

export default App