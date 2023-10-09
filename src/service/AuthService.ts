import { signInWithPopup, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider, OAuthProvider, AuthCredential } from "firebase/auth";
import { auth, googleProvider, appleProvider, microsoftProvider, facebookProvider } from "../firebaseConfig";

type SignInResult = { user: any } | { error: any };

async function handleSignInWithProvider(
    auth: Auth,
    provider: GoogleAuthProvider | OAuthProvider,
): Promise<SignInResult> {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return { user };
    } catch (error: any) {
        if (error.code === "auth/cancelled-popup-request") {
            // Handle the cancelled popup request error
            return { user: null };
        } else {
            return { error };
        }
    }
}

export const AuthService = {
    handleGoogleSignIn: (): Promise<SignInResult> =>
        handleSignInWithProvider(auth, googleProvider),

    handleAppleSignIn: (): Promise<SignInResult> =>
        handleSignInWithProvider(auth, appleProvider),

    handleMicrosoftSignIn: (): Promise<SignInResult> =>
        handleSignInWithProvider(auth, microsoftProvider),

    handleFacebookSignIn: (): Promise<SignInResult> =>
        handleSignInWithProvider(auth, facebookProvider),

    handleEmailPassRegister: async (email: string, password: string, fullName: string): Promise<SignInResult> => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const user = result.user;
            const updatedUser = {
                ...user,
                email: email,
                displayName: fullName
            };
            return { user: updatedUser };
        }
        catch (error) {
            return { error };
        }
    },

    handleEmailPassSignIn: async (email: string, password: string): Promise<SignInResult> => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user;
            return { user };
        }
        catch (error) {
            return { error };
        }
    },

    handleResetPassword: async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email)
        }
        catch (error) {
            return { error };
        }
    },

    logOut: async (): Promise<void> => {
        await auth.signOut();
    },
};
