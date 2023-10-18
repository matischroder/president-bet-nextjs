import React from 'react';
import { IoShareOutline } from 'react-icons/io5'
import { SlOptionsVertical } from 'react-icons/sl'
import { LuPlusSquare } from 'react-icons/lu'

interface ModalProps {
    setModal: (hide: boolean) => void;
    // setShowModalAlways: (hide: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setModal }) => {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur">
            <div className="bg-black p-4 rounded-lg shadow-lg w-96 border border-gray-700">
                <h1 className="text-2xl font-semibold mb-4 text-center">¡Mejore su experiencia!</h1>

                <p className="text-justify mb-4">
                    Para una experiencia óptima, le recomendamos agregar esta aplicación web a la pantalla de inicio de su teléfono.

                </p>

                <h2 className="text-lg font-semibold mb-2">En iPhone:</h2>
                <ol className="list-decimal pl-6 mb-4">
                    <li>Toque el icono <IoShareOutline className='inline-flex' /> en la parte inferior de la pantalla.</li>
                    <li>Desplácese hacia abajo y seleccione &apos;Añadir a pantalla de inicio <LuPlusSquare className='inline-flex' />&apos;.</li>
                    <li>Toque en &apos;Agregar&apos; en la esquina superior derecha.</li>
                </ol>
                <h2 className="text-lg font-semibold mb-2">En Android:</h2>
                <ol className="list-decimal pl-6 mb-4">
                    <li>Toque <SlOptionsVertical className='inline-flex' /> en la esquina superior derecha de la pantalla.</li>
                    <li>Seleccione &apos;Añadir a pantalla de inicio&apos; en el menú desplegable.</li>
                    <li>Toque &apos;Agregar&apos;.</li>
                </ol>


                <button
                    className="mt-4 float-right top-2 right-2 py-1 px-2 rounded bg-[#4368b8]"
                    onClick={() => setModal(false)}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
