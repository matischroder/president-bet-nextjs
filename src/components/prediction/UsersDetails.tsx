import React, { useState } from 'react';
import Image from "next/image";

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

    // Set the target date and time (October 23, 2023, 12:00 PM -3 UTC)
    const targetDate = new Date('2023-10-23T12:00:00-03:00');

    // Get the current date
    const currentDate = new Date();

    // Define the message for users before the target date
    const messageBeforeTargetDate = "No se pueden ver los resultados hasta después de las elecciones";

    return (
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
                {usersData.map((user, index) => (
                    <div key={user.userId} className="py-2 border-b">
                        <div className="flex flex-row justify-between items-center">
                            <p>{index + 1}. {user.userName}</p>
                            <button className="text-blue-400 hover:underline cursor-pointer" onClick={() => handleUserClick(user)}>
                                View Details
                            </button>
                        </div>
                        {selectedUser && selectedUser.userId === user.userId && currentDate >= targetDate && (
                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Pronostico for {user.userName}</h3>
                                <ul>
                                    {user.pronostico.map((item, idx) => (
                                        <li key={idx}>Prediction {idx + 1}: {item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersDetails;
