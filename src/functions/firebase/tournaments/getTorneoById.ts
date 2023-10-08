import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

type Torneo = {
    nombre: string;
};
// Get tournament details by ID
export const getTorneoById = async (torneoId: string) => {
    try {
        const torneoRef = doc(db, "torneos", torneoId);
        const docSnap = await getDoc(torneoRef);

        if (docSnap.exists()) {
            const torneo: Torneo = docSnap.data() as Torneo;
            return torneo;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el torneo por ID:", error);
        throw error;
    }
};