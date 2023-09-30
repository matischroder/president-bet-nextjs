import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Get a user's current prediction
export const getPronostico = async (torneoId: string, userId: string) => {
    try {
        const pronosticoRef = doc(db, "torneos", torneoId, "pronosticos", userId);
        const docSnap = await getDoc(pronosticoRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener pronóstico:", error);
        throw error;
    }
};