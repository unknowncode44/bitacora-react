import type { CalcResult, Trip } from "../models/types";

interface Props {
    trip: Trip,
    results: CalcResult | null,
    resetTrip: () => void
}

export const TableResults = ({ trip, results, resetTrip }: Props) => {
    return (
        <>
        <h2 className="text-xl font-semibold text-gray-700 mb-1">
            Historial de Cargas
        </h2>

          {/* Mapeo de cargas: Reemplaza al renderTabla() manual */ }
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

        {/* Sección de Resultados */ }
        {
            results ? (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in duration-500">
                    <p className="text-green-800"><strong>Distancia total:</strong> {results.totalDistance} km</p>
                    <p className="text-green-800"><strong>Consumo promedio:</strong> {results.averageConsumption.toFixed(2)} L/100km</p>
                </div>
            ) : (
                <p className="mt-6 text-center text-gray-400 italic">Completa los datos para ver el cálculo</p>
            )
        }
        <div className="mt-4 flex gap-2">
            {/* <button id="btn-calcular" type="button" className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Calcular Viaje
                </button> */}
            <button id="btn-reset" onClick={resetTrip} type="button" className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition">
                Limpiar
            </button>
        </div>
        </>
    )
}
