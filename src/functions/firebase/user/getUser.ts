import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { saveUser } from "./saveUser";

// Add a new document with a generated id.

export const getUser = async (userData: any) => {
    try {
        const docRef = doc(db, "users", userData.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return;
        } else {
            await saveUser(userData);
        }
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
    }
};
