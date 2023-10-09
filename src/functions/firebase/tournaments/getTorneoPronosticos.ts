import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Get current results of predictions for a tournament
export const getTorneoPronosticos = async (torneoId: string) => {
    try {
        // Implement the logic to retrieve the current results of predictions for a tournament
        // This may depend on your specific data structure and requirements
    } catch (error) {
        console.error("Error al obtener los pronósticos del torneo:", error);
        throw error;
    }
};