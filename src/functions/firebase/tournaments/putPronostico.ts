import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";

function isAccessAllowed() {
    const currentTime = new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }); // Obtén la hora actual de Argentina
    const accessTime = new Date('2023-10-22T10:00:00Z').toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' });

    const currentTimeTimestamp = new Date(currentTime).getTime();
    const accessTimeTimestamp = new Date(accessTime).getTime();

    return currentTimeTimestamp <= accessTimeTimestamp;
}


// Update a user's prediction
export const putPronostico = async (torneoId: string, userId: string, pronostico: Number[]) => {
    try {
        if (!isAccessAllowed()) {
            // Si no se permite el acceso, muestra un mensaje de error
            console.error("Acceso a la API no permitido en este momento");
            toast.error("No se pueden realizar más modifiaciones");
            return;
        }

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