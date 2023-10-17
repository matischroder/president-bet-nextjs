import CircleSpinner from '@/components/global/Spinner';
import { getTorneoById } from '@/functions/firebase/tournaments/getTorneoById';
import { postTorneoUsuario } from '@/functions/firebase/tournaments/postTorneoUsuario';
import useAuth from '@/hook/auth';
import { withProtected } from '@/hook/route';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Torneo = {
    nombre: string;
};

const BuscarTorneos: React.FC = () => {
    const auth = useAuth();
    const [torneoId, setTorneoId] = useState<string>("");
    const [torneo, setTorneo] = useState<Torneo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { slug: id } = router.query; // Retrieve the slug from router query

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTorneoId(e.target.value);
    };

    const searchTorneo = async () => {
        setIsLoading(true);
        try {
            const torneo = await getTorneoById(torneoId);
            if (!torneo)
                toast.error('Torneo no encontrado');
            setTorneo(torneo);
            setIsLoading(false);
        } catch (error) {
            toast.error('Error al buscar el torneo, intenta más tarde');
            setIsLoading(false);
            console.error('Error searching for torneo:', error);
        }
    };

    useEffect(() => {
        if (id) {
            setTorneoId(id as string);
        }
    }, [id]);

    useEffect(() => {
        if (torneoId) {
            searchTorneo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [torneoId]);

    const handlePutUser = async () => {
        try {
            await postTorneoUsuario(torneoId, auth.user);
        } catch (error) {
            toast.error('Error al unirse al torneo, intenta más tarde');
            console.error('Error uniendose al torneo');
        }
    }

    const irAMisTorneosButton = torneo ? (
        <button
            className="bg-[#4368b8] font-bold py-2 px-4 rounded-lg mt-4"
            onClick={() => router.push('/')} // Navigate to the index page
        >
            Ir a mis torneos
        </button>
    ) : null;

    return (
        <div className="p-4 h-[87%]">
            <h1 className="text-2xl font-bold text-center mb-4">Buscar Torneo</h1>
            <div className="mb-4 h-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Buscar Torneo por identificador:
                </label>
                <div className="flex">
                    <input
                        type="text"
                        className="p-2 border rounded w-full text-black selection:text-black"
                        placeholder="ID del torneo"
                        value={torneoId}
                        onChange={handleInputChange}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
                        onClick={() => searchTorneo()}
                    >
                        Buscar
                    </button>
                </div>
                <div className='h-full'>
                    {isLoading && <CircleSpinner />}
                    {
                        torneo &&
                        <div className='w-full h-full flex flex-col px-2'>
                            <div className="py-5">
                                Nombre del Torneo:&nbsp;<strong>{torneo.nombre}</strong>
                            </div>
                            <button
                                className="bg-[#4368b8] font-bold py-2 px-4 rounded-lg"
                                onClick={() => handlePutUser()} >
                                Unirme al torneo
                            </button>
                            {irAMisTorneosButton}
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default withProtected(BuscarTorneos);
