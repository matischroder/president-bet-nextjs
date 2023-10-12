import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";

// Update a user's prediction
export const putPronostico = async (torneoId: string, userId: string, pronostico: Number[]) => {
    try {
        const pronosticoRef = doc(db, "torneos", torneoId, "pronosticos", userId);

        const pronosticoData = {
            pronostico: pronostico,
        };

        await updateDoc(pronosticoRef, pronosticoData);
        toast.success("Pronóstico guardado")

    } catch (error) {
        console.error("Error al modificar pronóstico:", error);
        toast.error("Error al modificar pronóstico")
        throw error;
    }
};