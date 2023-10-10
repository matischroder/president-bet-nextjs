// DetailsModal.tsx
import React from 'react';
import Torneo from '@/types/torneo';

interface DetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    torneo: Torneo | null; // Pasar el objeto de torneo como prop
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, torneo }) => {
    if (!isOpen || !torneo) {
        return null;
    }

    return (
        <div id="defaultModal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="modal-content">
                <p>Nombre del Torneo: {torneo.nombre}</p>
                <p>ID del Torneo: {torneo.id}</p>
                <h3>Participantes:</h3>
                {/* <ul>
                    {torneo.participantes.map((participante) => (
                        <li key={participante.id}>{participante.nombre}</li>
                    ))}
                </ul> */}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default DetailsModal;
