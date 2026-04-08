# React + TypeScript + Vite

# Rama de migracion de logica Javascript.

En esta rama solo migregaremos la logica de nuestro script en vanilla y la refactorizaremos para que se adapte a nuestro proyecto de react.

### Tipado Estricto
Como estamos usando Typescript, crearemos los modelos necesarios para trabajar siguiendo las buenas practicas del tipado estricto.

1 - Dentro del directorio ```/src``` creamos la carpeta ```models``` y dentro el archivo ```types.ts```

2 - Dentro del el archivo crearemos las dos interfaces necesarias para trabajar. Por un lado el el objeto que representará las cargas, y el objeto que representará los viajes:

```
// src/types.ts
export interface Load {
    km: number;
    liters: number;
}

export interface Trip {
    initKm: number | null;
    loads: Load[];
}

export interface CalcResult {
    totalDistance: number;
    totalLiters: number;
    averageConsumption: number;
}
```
### Logica

Como vimos anteriormente, toda la logica que estamos usando en cualquier proyecto de vanilla javascript se coloca toda junta en un mismo archivo script. Se mezclan las referencias a los elementos del DOM junto con los calculos o variables inherentes a nuestra logica pura. Como esto puede ser confuso, separemos toda la logica que haga "los calculos" en un archivo separado. De esta manera podremos mantener y testear el codigo de manera aislada y ordenada. Una vez listo solo lo importaremos a nuestro componente de react.

1 -  Dentro del directorio ```/src``` creamos la carpeta utils y dentro el archivo ```calculations.ts```

2 - Importamos nuestros modelos (```Trip``` y ```CalcResult```) de nuestro archivo ```types.ts```. Luego creamos logica y validaciones dentro de este archivo que luego exportaremos para ser utilizado en nuestro componente de react

```
import type { Trip, CalcResult } from '../models/types'

export const calculateStatics = (trip: Trip) : CalcResult | null => {
    if(trip.loads.length === 0 || trip.initKm === null) {
        return null
    }

    // sumamos los litros de todas las cargas realizadas
    // usamos la funcion de Array reduce. Info en: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce 
    const totalLiters = trip.loads.reduce((acc, load) => acc + load.liters, 0);

    // El último KM registrado en la última carga

    // calculamos el ultimo elemento del array para obtener el km final
    const finalKm = trip.loads[trip.loads.length - 1].km;
    // la distancia total es igual a la diferencia entre km finales y km iniciales
    const totalDistance = finalKm - trip.initKm;

    // validamos que la distancia sea mayor a cero
    if (totalDistance <= 0) return null;

    // calculamos el consumo cada 100km
    const averageConsumption = (totalLiters / totalDistance) *100;

    // retornamos nuestro objeto CalcResult
    return {
        totalDistance,
        totalLiters,
        averageConsumption
    }

}
```

### Manipulacion del DOM
Ahora que tenemos la logica para realizar las operaciones necesarias, trabajamos en el archivo  ```App.tsx```.
1- Importamos nuestra funcion ```calculateStatics``` para realizar los calculos y el modelo ```Trip``` para el tipado estricto, esto lo hacemos antes de la funcion ```App()``:
```
import type { Trip } from './models/types'
import { calculateStatics } from './utils/calculations'

App(){...}
```

2- Dentro de nuestra funcion ```App()```, antes del ```return```, creamos datos ejemplo para ver el funcionamiento de nuestra logica de calculo:

```
function App() {
// Datos de prueba (Hardcoded) para ver que la estructura funciona
  const exampleTrip: Trip = {
    initKm: 10000,
    loads: [
      { km: 10400, liters: 30 },
      { km: 10850, liters: 35 }
    ]
  };

  return (...)
  ```

3- Luego deberemos ubicar que partes de nuestro codigo HTML deberia ser manipulada para insertar la logica que disparara los efectos en el DOM. Como react nos permite inyectar codigo javascript en nuestro HTML y retornar fragmentos de codigo HTML usamos esta caracteristica para realizar las manipulaciones deseadas. Puntualmente nuestro objetivo es crear filas en una tabla con cada uno de los items de nuestro array dentro del objeto ```exampleTrip```:

a- Primera Inyeccion de js: Ubicamos la tabla y creamos un elemento HTML para indicar los KM iniciales, para esto inyectamos javascript usando las llaves ```{}``` y obtenemos el valor de ```initKM``` de nuestro objeto ```exampleTrip```
```
<label className="w-full flex flex-row align-center justify-start mb-1">
    Movil Inicia con: <span className="px-4 font-bold">{exampleTrip.initKm?.toFixed(2)} km</span>
</label>
```
b- Segunda Inyeccion de js: Ubicamos el cuerpo de la tabla e insertamos filas de tabla (```<tr>```) por cada item presente en el array ```loads``` de nuestro objeto ```exampleTrip``` usando la funcion de array ```.map()``` (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
```
<tbody id="tabla-historial">

    {exampleTrip.loads.map((load, index) => (

    <tr key={index} className="border-b">
    <td className="p-2 text-gray-600">{load.km} km</td>
    <td className="p-2 text-gray-600">{load.liters} L</td>
    </tr>

    ))}

</tbody>
```
c- Tercera Inyeccion de js: ubicamos la seccion de resultados y pasamos los valores de ```finalDistance``` y ```averageConsumption``` de nuestro objeto ```results```
```
{results && (
    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm">
        {/* TERCERA INYECCION DE JS: obtenemos los valores de distancia y promedio desde nuestro variable results */}
        <p>Distancia: {results.totalDistance} km</p>
        <p>Promedio: {results.averageConsumption.toFixed(2)} L/100km</p>
    </div>
)}
```