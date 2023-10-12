import { db } from "@/firebaseConfig";
import { doc, getDoc, where, getDocs } from "firebase/firestore";

import Torneo from "@/types/torneo";

export const getTorneosByUsuario = async (userId: string) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        let torneosId = []
        let torneosPromises = [];

        if (userData && userData.torneos) {
            torneosId = userData.torneos
            torneosPromises = torneosId.map(async (torneoId: string) => {
                const nameRef = doc(db, "torneos", torneoId);
                const nameSnap = await getDoc(nameRef);
                const nameData = nameSnap.data();

                const docRef = doc(db, "torneos", torneoId, "pronosticos", userId);
                const docSnap = await getDoc(docRef);
                const pronosticoData = docSnap.data()

                return { id: torneoId, nombre: nameData?.nombre, pronostico: pronosticoData?.pronostico }
            }
            )
        }

        const torneos: Torneo[] = await Promise.all(torneosPromises)
        return torneos;


    } catch (error) {
        console.error("Error al obtener los torneos del usuario:", error);
        throw error;
    }
};
