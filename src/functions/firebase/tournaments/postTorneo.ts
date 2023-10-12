class UserNotFoundError extends Error {
    constructor() {
        super("User not found");
        this.name = "UserNotFoundError";
    }
}

class TournamentLimitReachedError extends Error {
    constructor() {
        super("You have reached the limit of 25 tournaments");
        this.name = "TournamentLimitReachedError";
    }
}

class TournamentCreationError extends Error {
    constructor() {
        super("An error occurred while creating the tournament");
        this.name = "TournamentCreationError";
    }
}

import { db } from "@/firebaseConfig";
import { collection, doc, setDoc, updateDoc, getDoc, addDoc } from "firebase/firestore";
import { User, getAuth } from "firebase/auth";
import { arrayUnion, increment } from "firebase/firestore";

// Function to check if the user can create a new tournament
async function canCreateTournament(userId: string): Promise<boolean> {
    const usuariosRef = collection(db, "users");
    const userDoc = await getDoc(doc(usuariosRef, userId));

    if (!userDoc.exists()) {
        throw new UserNotFoundError();
    }

    const userData = userDoc.data();
    const torneosCount = userData.torneos ? userData.torneos.length : 0;

    return torneosCount < 25;
}

// Function to create the "pronosticos" subcollection
async function createPronosticosSubcollection(torneoId: string, user: User) {
    const pronosticosRef = collection(db, "torneos", torneoId, "pronosticos");
    const pronosticosDocRef = doc(pronosticosRef, user.uid);

    // Initialize the "pronostico" array with five elements set to zero
    await setDoc(pronosticosDocRef, {
        pronostico: [0, 0, 0, 0, 0],
        userId: user.uid,
        userName: user.displayName,
        isDeleted: false,
    });
}

// Create a new tournament and return a random ID
export const postTorneo = async (nombre: string) => {
    try {
        // Get the authenticated user's UID
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated");
        }
        const userId = user.uid;

        // Check if the user can create a new tournament
        const canCreate = await canCreateTournament(userId);
        if (!canCreate) {
            throw new TournamentLimitReachedError();
        }

        const torneosRef = collection(db, "torneos");
        const usuariosRef = collection(db, "users");
        const newTorneoRef = doc(torneosRef);

        // Generate a random ID for the new tournament
        const newTorneoId = newTorneoRef.id;

        // Create the "pronosticos" subcollection inside the new tournament document
        await createPronosticosSubcollection(newTorneoId, user);

        // Update the user's 'torneos' array with the new tournament ID
        await updateDoc(doc(usuariosRef, userId), {
            torneos: arrayUnion(newTorneoId),
            contadorTorneosCreados: increment(1),
        });

        // Create the new tournament with the 'nombre' field
        await setDoc(newTorneoRef, { nombre });

        return newTorneoId;
    } catch (error) {
        console.error("Error al crear el torneo:", error);
        if (error instanceof UserNotFoundError) {
            throw new Error("User not found");
        } else if (error instanceof TournamentLimitReachedError) {
            throw new Error("You have reached the limit of 25 tournaments");
        } else {
            throw new TournamentCreationError();
        }
    }
};
