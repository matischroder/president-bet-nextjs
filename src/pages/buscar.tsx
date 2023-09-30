import { withProtected } from '@/hook/route';
import React, { useState } from 'react';

const BuscarTorneos: React.FC = () => {
    const [torneoId, setTorneoId] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTorneoId(e.target.value);
    };

    const handleSearchClick = () => {
        // Implementa la lógica para buscar el torneo por su ID aquí
        console.log(`Buscando torneo por ID: ${torneoId}`);
        // Puedes hacer una solicitud a tu servidor o realizar cualquier otra acción necesaria.
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Buscar Torneo</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Buscar Torneo por identificador:
                </label>
                <div className="flex">
                    <input
                        type="text"
                        className="p-2 border rounded w-full"
                        placeholder="ID del torneo"
                        value={torneoId}
                        onChange={handleInputChange}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
                        onClick={handleSearchClick}
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withProtected(BuscarTorneos);
