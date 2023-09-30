import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Delete a user from a tournament with logical deletion
export const deleteTorneoUsuario = async (torneoId, userId) => {
    try {
        const torneoRef = doc(db, "torneos", torneoId);

        // Set 'delete' field to true to mark the user as deleted in the tournament
        await updateDoc(torneoRef, {
            [`usuarios.${userId}.delete`]: true,
        });
    } catch (error) {
        console.error("Error al eliminar usuario del torneo:", error);
        throw error;
    }
};