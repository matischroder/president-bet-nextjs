// pages/NuevoTorneo.tsx

import { postTorneo } from '@/functions/firebase/tournaments/postTorneo';
import { withProtected } from '@/hook/route';
import React, { useState } from 'react';

const NuevoTorneo: React.FC = () => {
    const [nombreTorneo, setNombreTorneo] = useState('');
    const [idNuevoTorneo, setIdNuevoTorneo] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombreTorneo(e.target.value);
    };

    const handleCrearClick = async () => {
        try {
            const id = await postTorneo(nombreTorneo);
            setIdNuevoTorneo(id);
        } catch (error) {
            if (error instanceof Error) {
                // Handle the specific error types here
                if (error.message === "User not found") {
                    // Handle the "User not found" error
                    // Display an appropriate error message to the user
                } else if (error.message === "You have reached the limit of 25 tournaments") {
                    // Handle the "Tournament limit reached" error
                    // Display an appropriate error message to the user
                } else {
                    // Handle other errors, such as "An error occurred while creating the tournament"
                    // Display a generic error message to the user
                }
            } else {
                // Handle unexpected errors here
                // Display a generic error message to the user
            }
        }
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
                        className="p-2 border rounded w-full text-black"
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
                <div >
                    {
                        idNuevoTorneo &&
                        <div className="pt-5">
                            Código: {idNuevoTorneo}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default withProtected(NuevoTorneo);
