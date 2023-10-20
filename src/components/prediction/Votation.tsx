import React, { useEffect, useState } from 'react';
import Candidate from './votation/Candidate';
import mileiImage from "@/images/milei.png"
import bullrichImage from "@/images/bullrich.png"
import massaImage from "@/images/massa.png"
import schiarettiImage from "@/images/schiaretti.png"
import bregmanImage from "@/images/bregman.png"
import blancoImage from "@/images/blanco.png"
import Image, { StaticImageData } from 'next/image';
import { putPronostico } from '@/functions/firebase/tournaments/putPronostico';
import useAuth from '@/hook/auth';
import Torneo from "@/types/torneo";
import DetailsModal from './votation/DetailsModal';
import { getUsuariosTorneos } from '@/functions/firebase/tournaments/getUsuariosTorneos';
import { get } from 'http';
import UsersDetails from './UsersDetails';

interface VotationProps {
    torneo: Torneo;
    setSelectedTorneo: React.Dispatch<React.SetStateAction<Torneo | null>>;
    setTorneos: React.Dispatch<React.SetStateAction<Torneo[] | null>>;
}

interface Candidate {
    name: string;
    percentage: number | string;
    image: StaticImageData;
    backgroundColor: string[]
}

type usersData = {
    userName: string,
    pronostico: number[],
    isDeleted: boolean,
    userId: string
}

export default function Votation({ torneo, setSelectedTorneo, setTorneos }: VotationProps) {
    const auth = useAuth()
    const candidates = [
        { name: "Javier Milei", percentage: torneo.pronostico && torneo.pronostico.length > 0 ? torneo.pronostico[0] : "0", image: mileiImage, backgroundColor: ["#b53193", "#a81d3f", "#d56328"] },
        { name: "Patricia Bullrich", percentage: torneo.pronostico && torneo.pronostico.length > 1 ? torneo.pronostico[1] : "0", image: bullrichImage, backgroundColor: ["#f1f0a3", "#fcd009", "#feb808", "#ed5e53", "#f364a9", "#1d128f", "#8cd9ee"] },
        { name: "Sergio Massa", percentage: torneo.pronostico && torneo.pronostico.length > 2 ? torneo.pronostico[2] : "0", image: massaImage, backgroundColor: ["#01b7ff", "#ffffff", "#ffc700", "#ffffff", "#01b7ff"] },
        { name: "Juan Schiaretti", percentage: torneo.pronostico && torneo.pronostico.length > 3 ? torneo.pronostico[3] : "0", image: schiarettiImage, backgroundColor: ["#089fdf", "#0856a3", "#e00b13"] },
        { name: "Myriam Bregman", percentage: torneo.pronostico && torneo.pronostico.length > 4 ? torneo.pronostico[4] : "0", image: bregmanImage, backgroundColor: ["#ee454c", "#ee454c", "#ee454c", "black", "black", "white", "black", "black", "#ee454c", "#ee454c", "#ee454c"] },
        { name: "Voto en Blanco", percentage: torneo.pronostico && torneo.pronostico.length > 5 ? torneo.pronostico[5] : "0", image: blancoImage, backgroundColor: ["white", "white"] }
    ];

    const [candidateStates, setCandidateStates] = useState<Candidate[]>(candidates);
    const [details, setDetails] = useState<boolean>(false);
    const [showUsersDetails, setShowUsersDetails] = useState<boolean>(false);
    const [usersDetails, setUsersDetails] = useState<usersData[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuariosTorneos: usersData[] = await getUsuariosTorneos(auth.user.uid, torneo.id);
                setUsersDetails(usuariosTorneos);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCandidateState = (index: number, value: number | string) => {
        setCandidateStates(prevCandidates => {
            const updatedCandidates = [...prevCandidates];
            updatedCandidates[index] = {
                ...updatedCandidates[index],
                percentage: value
            };
            return updatedCandidates;
        });
    };

    return (
        <div>
            {
                showUsersDetails ?
                    <UsersDetails nombre={torneo.nombre} usersData={usersDetails} setShowUsersDetails={setShowUsersDetails} /> :
                    <>
                        <div className="flex items-center relative select-none">
                            <Image alt='back' src={"/back.png"} width={30} height={30} className="absolute hover:underline cursor-pointer"
                                onClick={() => setSelectedTorneo(null)}
                            />
                            <h2 className="text-xl font-bold text-center w-full">{torneo.nombre}</h2>
                            <Image alt='back' src={"/details.png"} width={30} height={30} className="absolute right-0 hover:underline cursor-pointer"
                                data-modal-target="defaultModal"
                                data-modal-toggle="defaultModal"
                                onClick={() => setDetails(true)}
                            />
                        </div>
                        <DetailsModal isOpen={details} onClose={() => setDetails(false)} torneo={torneo} />
                        <div className='w-full h-full flex flex-col justify-around px-5 py-10' >
                            {
                                candidateStates.map((candidate, index) => (
                                    <Candidate
                                        key={index}
                                        candidateName={candidate.name}
                                        percentage={candidateStates[index].percentage}
                                        image={candidate.image}
                                        backgroundColor={candidate.backgroundColor}
                                        setPercentage={(value) => handleCandidateState(index, value)}
                                    />
                                ))
                            }
                            <div className='text-end font-semibold mt-3 mb-2'>
                                Total: {candidateStates.reduce((acc, candidate) => acc + Number(candidate.percentage), 0).toFixed(2)}
                            </div>
                            <div className="flex">
                                <div className="flex-1 m-1">
                                    <button
                                        className="w-full bg-[#4368b8] font-bold py-2 px-2 rounded-lg items-center"
                                        onClick={() => {
                                            setShowUsersDetails(true)
                                        }}
                                    >
                                        Ver participantes
                                    </button>
                                </div>

                                <div className="flex-1 m-1">
                                    <button
                                        className="w-full bg-[#4368b8] font-bold py-2 px-2 rounded-lg items-center"
                                        onClick={() => {
                                            putPronostico(torneo.id, auth.user.uid, candidateStates.map(candidate => Number(candidate.percentage)))
                                            setTorneos((torneosActuales) => {
                                                if (!torneosActuales) {
                                                    return null;
                                                }
                                                const indiceTorneoAActualizar = torneosActuales.findIndex((torneoActual) => torneoActual.id === torneo.id);
                                                if (indiceTorneoAActualizar !== -1) {
                                                    torneosActuales[indiceTorneoAActualizar].pronostico = candidateStates.map(candidate => Number(candidate.percentage));
                                                }
                                                return torneosActuales;
                                            });
                                        }}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </>
            }
        </div>
    );
}

