// Importa tu instancia de Firebase Firestore
import { db } from "@/firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 


// Add a new document with a generated id.

export const saveUser = async (userData: any) => {
    try {
        await setDoc(doc(db, "users", userData.uid), {
            displayName: userData?.displayName,
            email: userData?.email,
            creationTime: userData?.metadata.creationTime,
            uid: userData?.uid,
          });
        //   console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };