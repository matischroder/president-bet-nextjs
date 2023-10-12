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
            if (error instanceof Error) {
                // Handle the specific error types here
                if (error.message === "User not found") {
                    toast.error('Usuario no encontrado');
                    // Handle the "User not found" error
                    // Display an appropriate error message to the user
                } else if (error.message === "You have reached the limit of 25 tournaments") {
                    toast.error('Has alcanzado el límite de 25 torneos');
                    // Handle the "Tournament limit reached" error
                    // Display an appropriate error message to the user
                } else {
                    toast.error('Error al crear el torneo');
                    // Handle other errors, such as "An error occurred while creating the tournament"
                    // Display a generic error message to the user
                }
            } else {
                toast.error('Error al crear el torneo');
                // Handle unexpected errors here
                // Display a generic error message to the user
            }
            setIsLoading(false);
        }
    };

    const shareTorneo = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Detalles del Torneo',
                    text: `Te invito a mi torneo!! Nombre del Torneo: ${nombreTorneo}, Hacé click en el siguiente enlace para unirte: ${process.env.NEXT_PUBLIC_URL}/buscar/${idNuevoTorneo}`,
                });
            } catch (error) {
                toast.error('Error al compartir')
                console.error('Error sharing:', error);
            }
        } else {
            toast.error('No se puede compartir desde este dispositivo')
            console.log('Web Share API is not supported in this browser.');
        }
    };

    const copyToClipboard = async () => {
        try {
            const textToCopy = idNuevoTorneo;
            await navigator.clipboard.writeText(textToCopy);
            toast.success('Identificador copiado');
        } catch (error) {
            console.error('Failed to copy text: ', error);
            toast.error('Error al copiar');
        }
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
