// DetailsModal.tsx
import React from 'react';
import Torneo from '@/types/torneo';
import { toast } from 'sonner';
import { IoShareOutline } from 'react-icons/io5'
import { AiOutlineCopy } from 'react-icons/ai'

interface DetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    torneo: Torneo | null; // Pasar el objeto de torneo como prop
}



const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, torneo }) => {
    const url = "http://localhost:3000/"

    const copyToClipboard = async () => {
        try {
            if (torneo) {
                const textToCopy = torneo.id;
                await navigator.clipboard.writeText(textToCopy);
                toast.success('Identificador copiado');
            }
        } catch (error) {
            console.error('Failed to copy text: ', error);
            toast.error('Error al copiar');
        }
    };

    const shareTorneo = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Detalles del Torneo',
                    text: `Te invito a mi torneo!! Nombre del Torneo: ${torneo?.nombre}, Hacé click en el siguiente enlace para unirte: ${url}/buscar/${torneo?.id}`,
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

    if (!isOpen || !torneo) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-md m-auto p-5 h-screen flex bg-black/80 justify-center items-center">
            <div id="defaultModal" tabIndex={-1} aria-hidden="true" className=" p-4 max-w-2xl w-full rounded-lg">
                <div className="relative rounded-lg shadow bg-slate-900">
                    <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-900">
                        <h3 className="text-xl font-semibold text-white">
                            Datos del Torneo
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Cerrar</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed">
                            <p className='text-gray-400 inline-flex'>Nombre del Torneo: </p><p className='text-white inline-flex'>&nbsp;{torneo.nombre}</p>
                        </p>
                        <p className="text-base leading-relaxed text-gray-400 flex items-center">
                            <p className='text-gray-400 inline-flex'>Id: </p><p className='text-white inline-flex'>&nbsp;{torneo.id}</p>&nbsp;
                            &nbsp;
                            <AiOutlineCopy
                                className='cursor-pointer inline-flex'
                                color='white'
                                size={21}
                                onClick={() => copyToClipboard()}
                            />
                            &nbsp;
                            <IoShareOutline className='inline-flex cursor-pointer'
                                color='white'
                                size={21}
                                onClick={shareTorneo} />
                        </p>
                    </div>
                    <div
                        className="flex items-center p-4 space-x-2 border-t rounded-b border-gray-600"
                    >
                        <button
                            onClick={onClose}

                            data-modal-hide="defaultModal"
                            type="button"
                            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#4368b8] focus:ring-blue-800"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;