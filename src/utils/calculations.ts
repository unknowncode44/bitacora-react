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