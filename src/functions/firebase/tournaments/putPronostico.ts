import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Update a user's prediction
export const putPronostico = async (torneoId: string, userId: string, pronostico: Number[]) => {
    try {
        const pronosticoRef = doc(db, "torneos", torneoId, "pronosticos", userId);

        // Create an object with the pronostico data
        const pronosticoData = {
            pronostico: pronostico,
            // Add other properties if needed
        };

        await setDoc(pronosticoRef, pronosticoData);
    } catch (error) {
        console.error("Error al modificar pronóstico:", error);
        throw error;
    }
};