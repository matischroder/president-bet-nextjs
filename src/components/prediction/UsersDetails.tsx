import React, { useState } from 'react';
import Image from "next/image";
import UsersChoices from './UsersChoices';

type UsersData = {
    userName: string;
    pronostico: number[];
    isDeleted: boolean;
    userId: string;
};

interface UsersDetailsProps {
    nombre: string;
    usersData: UsersData[];
    setShowUsersDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersDetails = ({ nombre, usersData, setShowUsersDetails }: UsersDetailsProps) => {
    const [selectedUser, setSelectedUser] = useState<UsersData | null>(null);

    const handleUserClick = (user: UsersData) => {
        setSelectedUser(user);
    };

    const resultados = [30.51, 23.61, 35.9, 7.34, 2.62, 1.89]

    // Set the target date and time (October 23, 2023, 12:00 PM -3 UTC)
    const targetDate = new Date('2023-10-23T12:00:00-03:00');

    // Get the current date
    const currentDate = new Date();

    // Define the message for users before the target date
    const messageBeforeTargetDate = "No se pueden ver los resultados hasta después de las elecciones";

    const usersWithSumasTotales = usersData.map((user) => {
        const totales = user.pronostico.map((pronostico, index) => Math.abs(pronostico - resultados[index]));
        const sumasTotales = totales.reduce((prev, current) => prev + current);
        return { user, sumasTotales };
    });

    // 2. Ordena el array de objetos en función de las sumas totales (ascendente).
    usersWithSumasTotales.sort((a, b) => a.sumasTotales - b.sumasTotales);


    return (
        selectedUser ?
            <UsersChoices
                resultados={resultados}
                userData={selectedUser}
                setSelectedUser={setSelectedUser}
            />
            :
            <>
                <div className="bg-gray-800 text-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center relative mb-4">
                        <Image
                            alt="back"
                            src="/back.png"
                            width={30}
                            height={30}
                            className="absolute hover:underline cursor-pointer"
                            onClick={() => setShowUsersDetails(false)}
                        />
                        <h2 className="text-xl font-bold text-center w-full">{nombre}</h2>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        {currentDate < targetDate && (
                            <div className="mt-4">
                                <p>{messageBeforeTargetDate}</p>
                            </div>
                        )}
                        {usersWithSumasTotales.map(({ user, sumasTotales }, index) => (
                            <div key={user.userId} className="py-2 border-b">
                                <div className="flex items-center">
                                    <p>
                                        {index + 1}. {user.userName}
                                    </p>
                                    <div className='flex content-around' style={{ marginLeft: 'auto' }}>
                                        <p>
                                            {sumasTotales.toFixed(2)} pts
                                        </p>
                                        <button className="text-blue-400 hover:underline px-2  cursor-pointer" onClick={() => handleUserClick(user)}>
                                            Ver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </>
    );
};

export default UsersDetails;
