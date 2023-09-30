// import { db } from "@/firebaseConfig";
// import { query, collection, where, getDocs } from "firebase/firestore";

// type Torneo = {
//     id: string;
//     // Define other properties here as needed
//     nombre: string;
//     pronostico: []
//     // Add other properties
// };

// export const getTorneosByUsuario = async (userId: string) => {
//     try {
//         const userTorneos: Torneo[] = []

//         const querySnapshot = await getDocs(collection(db, "torneos"))
//         querySnapshot.forEach(async (doc) => {
//             const docData = doc.data()
//             const querySnapshot1 = await getDocs(collection(db, "torneos", doc.id, "pronosticos"))
//             querySnapshot1.forEach(async (doc1) => {
//                 const doc1Data = doc1.data()
//                 if (doc1Data.userId === userId && !doc1Data.deleted) {
//                     userTorneos.push({ id: doc.id, nombre: docData.name, pronostico: doc1Data.pronostico })
//                 }
//             })
//         })

//         return userTorneos;
//     } catch (error) {
//         console.error("Error al obtener los torneos del usuario:", error);
//         throw error;
//     }
// };


import { db } from "@/firebaseConfig";
import { query, collection, where, getDocs } from "firebase/firestore";

type Torneo = {
    id: string;
    // Define other properties here as needed
    nombre: string;
    pronostico: []
    // Add other properties
};

export const getTorneosByUsuario = async (userId: string) => {
    try {
        const userTorneos: Torneo[] = [];
        const torneosQuery = query(collection(db, "torneos"));

        const querySnapshot = await getDocs(torneosQuery);

        const promises = querySnapshot.docs.map(async (doc) => {
            const docData = doc.data();
            const pronosticosQuery = query(collection(db, "torneos", doc.id, "pronosticos"), where("userId", "==", userId));

            const pronosticosSnapshot = await getDocs(pronosticosQuery);

            pronosticosSnapshot.forEach((doc1) => {
                const doc1Data = doc1.data();
                if (!doc1Data.deleted) {
                    userTorneos.push({ id: doc.id, nombre: docData.nombre, pronostico: doc1Data.pronostico });
                }
            });
        });

        await Promise.all(promises);

        return userTorneos;
    } catch (error) {
        console.error("Error al obtener los torneos del usuario:", error);
        throw error;
    }
};
