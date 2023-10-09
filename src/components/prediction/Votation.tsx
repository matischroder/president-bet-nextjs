import React, { useEffect, useState } from 'react';
import Candidate from './votation/Candidate';
import mileiImage from "@/images/milei.png"
import bullrichImage from "@/images/bullrich.png"
import massaImage from "@/images/massa.png"
import schiarettiImage from "@/images/schiaretti.png"
import bregmanImage from "@/images/bregman.png"
import blancoImage from "@/images/blanco.png"
import Image from 'next/image';
import { putPronostico } from '@/functions/firebase/tournaments/putPronostico';
import useAuth from '@/hook/auth';

type Torneo = {
    id: string;
    nombre: string;
    pronostico: [];
    // Add other properties
};

interface VotationProps {
    torneo: Torneo;
    setSelectedTorneo: (torneo: Torneo | null) => void; // Define the prop for setSelectedTorneo
}

interface Candidate {
    name: string;
    percentage: number | string;
    image: string;
    backgroundColor: string[]
}

export default function Votation({ torneo, setSelectedTorneo }: VotationProps) {
    const auth = useAuth()
    const candidates = [
        { name: "Javier Milei", percentage: torneo.pronostico && torneo.pronostico.length > 0 ? torneo.pronostico[0] : 0, image: mileiImage, backgroundColor: ["#b53193", "#a81d3f", "#d56328"] },
        { name: "Patricia Bullrich", percentage: torneo.pronostico && torneo.pronostico.length > 1 ? torneo.pronostico[1] : 0, image: bullrichImage, backgroundColor: ["#f1f0a3", "#fcd009", "#feb808", "#ed5e53", "#f364a9", "#1d128f", "#8cd9ee"] },
        { name: "Sergio Massa", percentage: torneo.pronostico && torneo.pronostico.length > 2 ? torneo.pronostico[2] : 0, image: massaImage, backgroundColor: ["#01b7ff", "#ffffff", "#ffc700", "#ffffff", "#01b7ff"] },
        { name: "Juan Schiaretti", percentage: torneo.pronostico && torneo.pronostico.length > 3 ? torneo.pronostico[3] : 0, image: schiarettiImage, backgroundColor: ["#089fdf", "#0856a3", "#e00b13"] },
        { name: "Myriam Bregman", percentage: torneo.pronostico && torneo.pronostico.length > 4 ? torneo.pronostico[4] : 0, image: bregmanImage, backgroundColor: ["#ee454c", "#ee454c", "#ee454c", "black", "black", "white", "black", "black", "#ee454c", "#ee454c", "#ee454c"] },
        { name: "Voto en Blanco", percentage: torneo.pronostico && torneo.pronostico.length > 5 ? torneo.pronostico[5] : 0, image: blancoImage, backgroundColor: ["white", "white"] }
    ];
    const [candidateStates, setCandidateStates] = useState<Candidate[]>(candidates);

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
            <div className="flex items-center">
                <Image alt='back' src={"/back.png"} width={30} height={30} className="absolute text-blue-500 hover:underline cursor-pointer" onClick={() => setSelectedTorneo(null)} />
                <h2 className="text-xl font-bold text-center w-full">{torneo.nombre}</h2>
            </div>
            <div className='w-full h-full flex flex-col justify-around px-5 py-20' >
                {/* <View style={styles.donut}>
                // <Donut candidates={candidateStates} />
            </View> */}
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
                    Total: {candidateStates.reduce((acc, candidate) => acc + Number(candidate.percentage), 0)}
                </div>
                <button
                    className="bg-gray-800 font-bold py-2 px-4 rounded-lg"
                    onClick={() => {
                        putPronostico(torneo.id, auth.user.uid, candidateStates.map(candidate => Number(candidate.percentage)))
                    }} >
                    Guardar
                </button>
            </div>
        </div>
    );
}

