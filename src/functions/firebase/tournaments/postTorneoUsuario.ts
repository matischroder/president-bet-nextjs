import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Add or update a user in a tournament
export const postTorneoUsuario = async (torneoId: string, userId: string) => {
    try {
        const torneoRef = doc(db, "torneos", torneoId);

        // Set 'delete' field to false to mark the user as active in the tournament
        await updateDoc(torneoRef, {
            [`usuarios.${userId}.delete`]: false,
        });
    } catch (error) {
        console.error("Error al agregar o actualizar usuario en el torneo:", error);
        throw error;
    }
};
