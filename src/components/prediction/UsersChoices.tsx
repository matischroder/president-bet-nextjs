import React, { useState } from 'react';
import Image from "next/image";

type UsersData = {
    userName: string;
    pronostico: number[];
    isDeleted: boolean;
    userId: string;
};

interface UsersDetailsProps {
    resultados: number[];
    userData: UsersData;
    setSelectedUser: React.Dispatch<React.SetStateAction<UsersData | null>>;
}

const UsersChoices = ({ resultados, userData, setSelectedUser }: UsersDetailsProps) => {

    const handleUserClick = (user: UsersData) => {
        setSelectedUser(null);
    };

    // Set the target date and time (October 23, 2023, 12:00 PM -3 UTC)
    const targetDate = new Date('2023-10-23T12:00:00-03:00');

    return (
        <div className="bg-gray-800 text-white rounded-lg p-1 shadow-md">
            <div className="flex items-center relative mb-4">
                <Image
                    alt="back"
                    src="/back.png"
                    width={30}
                    height={30}
                    className="absolute hover:underline cursor-pointer"
                    onClick={() => setSelectedUser(null)}
                />
                <h2 className="text-xl font-bold text-center w-full">{userData.userName}</h2>
            </div>
            <div className="w-full h-full flex flex-col">
                <table className="w-full border border-gray-300 bg-black text-white mb-2 text-center">
                    <thead className="border border-gray-300">
                        <tr>
                            <th>Candidato</th>
                            <th>Resultados</th>
                            <th>Pronóstico</th>
                            <th>Diferencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Milei</td>
                            <td>{resultados[0]}</td>
                            <td>{userData.pronostico[0]}</td>
                            <td>{Math.abs(userData.pronostico[0] - resultados[0]).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Bullrich</td>
                            <td>{resultados[1]}</td>
                            <td>{userData.pronostico[1]}</td>
                            <td>{Math.abs(userData.pronostico[1] - resultados[1]).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Massa</td>

                            <td>{resultados[2]}</td>
                            <td>{userData.pronostico[2]}</td>
                            <td>{Math.abs(userData.pronostico[2] - resultados[2]).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Schiaretti</td>
                            <td>{resultados[3]}</td>
                            <td>{userData.pronostico[3]}</td>
                            <td>{Math.abs(userData.pronostico[3] - resultados[3]).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Bregman</td>
                            <td>{resultados[4]}</td>
                            <td>{userData.pronostico[4]}</td>
                            <td>{Math.abs(userData.pronostico[4] - resultados[4]).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Blanco</td>
                            <td>{resultados[5]}</td>
                            <td>{userData.pronostico[5] || 0}</td>
                            <td>{Math.abs(userData.pronostico[5] - resultados[5] || 0).toFixed(2)}</td>
                        </tr>
                    </tbody>
                    <tfoot className="border border-gray-300">
                        <tr>
                            <td className="text-center">Diferencia Total</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                            <td className="text-center"><strong>{
                                userData.pronostico.map((pronostico, index) => Math.abs(pronostico - resultados[index])).reduce((prev, current) => prev + current).toFixed(2)
                            }</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default UsersChoices;
