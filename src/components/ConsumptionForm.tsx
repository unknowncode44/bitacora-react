import React from "react";

interface Props {
    onAddLoad: (e: React.SubmitEvent<HTMLFormElement>) => void;
    kmInput: string,
    setKmInput: (val: string) => void;
    litersInput: string;
    setLitersInput: (val: string) => void;
}

export const ConsumptionForm = ({
    onAddLoad, kmInput, setKmInput, litersInput, setLitersInput }: Props) => {
    return (
        <form onSubmit={onAddLoad} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    KM en el momento de la carga
                </label>
                <input
                    type="number"
                    value={kmInput}
                    onChange={(e) => setKmInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ej: 10450"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Litros cargados
                </label>
                <input
                    type="number"
                    value={litersInput}
                    onChange={(e) => setLitersInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ej: 35"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-bold"
            >
                Registrar Carga
            </button>
        </form>
    )
}