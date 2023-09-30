// pages/NuevoTorneo.tsx

import { withProtected } from '@/hook/route';
import React, { useState } from 'react';

const NuevoTorneo: React.FC = () => {
    const [nombreTorneo, setNombreTorneo] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombreTorneo(e.target.value);
    };

    const handleCrearClick = () => {
        // Implementa la lógica para crear un nuevo torneo aquí
        console.log(`Creando un nuevo torneo con el nombre: ${nombreTorneo}`);
        // Puedes hacer una solicitud a tu servidor o realizar cualquier otra acción necesaria.
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Crear Nuevo Torneo</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre del Torneo:
                </label>
                <div className="flex">
                    <input
                        type="text"
                        className="p-2 border rounded w-full"
                        placeholder="Nombre del torneo"
                        value={nombreTorneo}
                        onChange={handleInputChange}
                    />
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
                        onClick={handleCrearClick}
                    >
                        Crear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withProtected(NuevoTorneo);
