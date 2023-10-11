import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

// Check if a user is in a tournament
export const isUserInTorneo = async (torneoId: string, userId: string): Promise<boolean> => {
    try {
        const torneoRef = doc(db, "torneos", torneoId);
        const torneoDoc = await getDoc(torneoRef);
        const torneoData = torneoDoc.data();

        // Check if the user exists in the tournament
        return torneoData?.usuarios?.[userId]?.delete === false;
    } catch (error) {
        console.error("Error al verificar la presencia del usuario en el torneo:", error);
        throw error;
    }
};

// Add or update a user in a tournament
export const postTorneoUsuario = async (torneoId: string, userId: string): Promise<void> => {
    try {
        // Check if the user is already in the tournament
        const isUserAlreadyInTorneo = await isUserInTorneo(torneoId, userId);

        if (!isUserAlreadyInTorneo) {
            // User is not in the tournament, so update their status
            const torneoRef = doc(db, "torneos", torneoId);
            await updateDoc(torneoRef, {
                [`usuarios.${userId}.delete`]: false,
            });
            toast.success("Se ha unido exitosamente al torneo")
        } else {
            toast.success("Usted ya está en el torneo")
        }
    } catch (error) {
        console.error("Error al agregar o actualizar usuario en el torneo:", error);
        throw error;
    }
};
