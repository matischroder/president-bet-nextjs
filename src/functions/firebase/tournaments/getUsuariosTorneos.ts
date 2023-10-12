import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

type usersData = {
    userName: string,
    pronostico: number[],
    isDeleted: boolean,
    userId: string
}
export const getUsuariosTorneos = async (userId: string, torneoId: string) => {
    try {
        // Create a reference to the "pronosticos" subcollection within the specified "torneos" document.
        const pronosticosRef = collection(db, "torneos", torneoId, "pronosticos");

        // Fetch all documents in the "pronosticos" subcollection.
        const querySnapshot = await getDocs(pronosticosRef);

        const pronosticos: usersData[] = [];

        querySnapshot.forEach((doc) => {
            pronosticos.push(doc.data() as usersData);
        });

        console.log("pronosticos", pronosticos);

        // Return the pronosticos data if needed.
        return pronosticos;
    } catch (error) {
        console.error("Error al obtener los pronosticos del usuario:", error);
        throw error;
    }
};
