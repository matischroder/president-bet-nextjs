import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const updateUserInformation = async (
    userData: any,
    userInformation: any
) => {
    try {
        // console.log(userData.trim())
        const userRef = doc(db, "users", userData);
        // console.log(userRef)
        // Prepare the data to be added or updated
        const newData = {
            profesion: userInformation?.profesion,
            description: userInformation?.description,
        };
        // Merge the new data with the existing document without overwriting
        await setDoc(userRef, newData, { merge: true });
        return "success";
        // console.log("User data updated successfully.");
    } catch (error) {
        // console.error("Error updating user data:", error);
        return "error";
    }
};
