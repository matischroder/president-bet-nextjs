import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";


// Get tournament details by ID
export const getTorneoById = async (torneoId: string) => {
    try {
        const torneoRef = doc(db, "torneos", torneoId);
        const docSnap = await getDoc(torneoRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el torneo por ID:", error);
        throw error;
    }
};