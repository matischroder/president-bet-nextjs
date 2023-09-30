import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Create a new tournament and return a random ID
export const postTorneo = async (nombre: string) => {
    try {
        const torneosRef = collection(db, "torneos");
        const newTorneoRef = doc(torneosRef);

        // Generate a random ID for the new tournament
        const newTorneoId = newTorneoRef.id;

        await setDoc(newTorneoRef, { nombre });

        return newTorneoId;
    } catch (error) {
        console.error("Error al crear el torneo:", error);
        throw error;
    }
};