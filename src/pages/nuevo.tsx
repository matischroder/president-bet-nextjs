import CircleSpinner from '@/components/global/Spinner';
import { postTorneo } from '@/functions/firebase/tournaments/postTorneo';
import { withProtected } from '@/hook/route';
import React, { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import { IoShareOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { useRouter } from 'next/router'; // Import the useRouter

const NuevoTorneo: React.FC = () => {
    const [nombreTorneo, setNombreTorneo] = useState('');
    const [idNuevoTorneo, setIdNuevoTorneo] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter(); // Initialize the router

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombreTorneo(e.target.value);
    };

    const handleCrearClick = async () => {
        setIsLoading(true);
        try {
            const id = await postTorneo(nombreTorneo);
            setIdNuevoTorneo(id);
            toast.success('Torneo creado con éxito');
            setIsLoading(false);
        } catch (error) {
            // Handle errors as needed
            setIsLoading(false);
        }
    };

    const shareTorneo = async () => {
        // Share function
    };

    const copyToClipboard = async () => {
        // Copy to clipboard function
    };

    const entrarAlTorneoButton = idNuevoTorneo ? (
        <button
            className="bg-[#4368b8] text-white font-bold py-2 px-4 mt-4 rounded"
            onClick={() => {
                router.push('/'); // Use the router to navigate to the index page
            }}
        >
            Ir a mis torneos
        </button>
    ) : null;

    return (
        <div className="p-4 h-full">
            <h1 className="text-2xl font-bold text-center mb-4">Crear Nuevo Torneo</h1>
            <div className="mb-4 h-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Torneo:</label>
                <div className="flex">
                    <input
                        type="text"
                        className="p-2 border rounded w-full text-black"
                        placeholder="Nombre del torneo"
                        value={nombreTorneo}
                        onChange={handleInputChange}
                    />
                    <button
                        className="bg-green-500 hover.bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
                        onClick={handleCrearClick}
                    >
                        Crear
                    </button>
                </div>
                {isLoading && <CircleSpinner />}
                <div>
                    {idNuevoTorneo && (
                        <div className="pt-5 block">
                            <h2 className="text-xl font-semibold">Información del torneo</h2>
                            <div>
                                Nombre:
                                &nbsp;
                                <strong>{nombreTorneo} </strong>
                            </div>
                            <div>
                                <div className="inline-flex">
                                    Código:
                                    &nbsp;
                                    <strong> {idNuevoTorneo} </strong>
                                </div>
                                &nbsp;
                                <AiOutlineCopy
                                    className="cursor-pointer inline-flex"
                                    color="white"
                                    size={21}
                                    onClick={() => copyToClipboard()}
                                />
                                &nbsp;
                                <IoShareOutline
                                    className="inline-flex cursor-pointer"
                                    color="white"
                                    size={21}
                                    onClick={shareTorneo}
                                />
                            </div>
                        </div>
                    )}
                    {entrarAlTorneoButton}
                </div>
            </div>
        </div>
    );
};

export default withProtected(NuevoTorneo);
