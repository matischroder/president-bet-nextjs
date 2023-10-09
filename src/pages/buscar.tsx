import { getTorneoById } from '@/functions/firebase/tournaments/getTorneoById';
import { withProtected } from '@/hook/route';
import React, { use, useState } from 'react';

type Torneo = {
    nombre: string;
};

const BuscarTorneos: React.FC = () => {
    const [torneoId, setTorneoId] = useState('');
    const [torneo, setTorneo] = useState<Torneo | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTorneoId(e.target.value);
    };

    const handleSearchClick = async () => {
        try {
            const torneo = await getTorneoById(torneoId)
            setTorneo(torneo);
        } catch (error) { }
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
                        className="p-2 border rounded w-full text-black"
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
                <div >
                    {
                        torneo &&
                        <div className="pt-5">
                            Torneo: {torneo.nombre}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default withProtected(BuscarTorneos);
