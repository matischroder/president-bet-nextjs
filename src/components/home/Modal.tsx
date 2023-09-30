import React from 'react';

interface ModalProps {
    setModal: (hide: boolean) => void;
    setShowModalAlways: (hide: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setModal, setShowModalAlways }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur">
            <div className="bg-black p-4 rounded-lg shadow-lg w-80 border border-gray-200">
                <p className='text-justify'>Tenga en cuenta que el asistente no recuerda tus mensajes anteriores por el momento.</p>
                <label className="block mt-2 text-sm text-gray-400">
                    <input
                        type="checkbox"
                        className="mr-1 "
                        onChange={() => setShowModalAlways(false)}
                    />
                    No mostrar este mensaje nuevamente
                </label>
                <button
                    className="mt-4 float-right top-2 right-2 p-1 rounded bg-green-500"
                    onClick={() => setModal(false)}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
