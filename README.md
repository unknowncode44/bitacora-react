# React + TypeScript + Vite

# Rama de migracion de logica Javascript.

En esta rama solo migregaremos la logica de nuestro script en vanilla y la refactorizaremos para que se adapte a nuestro proyecto de react.

### Tipado Estricto
Como estamos usando Typescript, crearemos los modelos necesarios para trabajar siguiendo las buenas practicas del tipado estricto.

1 - Dentro del directorio ```/src``` creamos la carpeta ```models`` y dentro el archivo ```types.ts```

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
