import './App.css'

function App() {
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

          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Historial de Cargas
          </h2>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2">KM</th>
                  <th className="p-2">Litros</th>
                </tr>
              </thead>
              <tbody id="tabla-historial"></tbody>
            </table>
          </div>
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