import { createContext, useContext, useState } from "react";
import { AuthService } from "@/service/AuthService";
import { getAnalytics, logEvent } from "firebase/analytics";
import { saveUser } from "@/functions/firebase/user/saveUser";
import { getUser } from "@/functions/firebase/user/getUser";
const authContext = createContext();

export default function useAuth() {
    return useContext(authContext);
}

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const handleSignIn = async (signInFunction, method) => {
        const { user, error } = await signInFunction();
        setUser(user ?? null);
        setError(error ?? "");
        if (user && !error) {
            const existsUser = getUser(user)
            if (!existsUser)
                saveUser(user)
            const analytics = getAnalytics();
            logEvent(analytics, 'signed-in', { method });
            return true
        }
        else
            return false

    };

    const handleGoogleSignIn = async () => {
        return await handleSignIn(AuthService.handleGoogleSignIn, "Google");
    };

    const handleAppleSignIn = async () => {
        await handleSignIn(AuthService.handleAppleSignIn, "Apple");
    };

    const handleMicrosoftSignIn = async () => {
        await handleSignIn(AuthService.handleMicrosoftSignIn, "Microsoft");
    };

    const handleFacebookSignIn = async () => {
        await handleSignIn(AuthService.handleFacebookSignIn, "Facebook");
    };

    const handleEmailPassRegister = async (email, password, name, lastName) => {
        await handleSignIn(() => AuthService.handleEmailPassRegister(email, password, name, lastName), "Email");
    };

    const handleEmailPassSignIn = async (email, password) => {
        await handleSignIn(() => AuthService.handleEmailPassSignIn(email, password), "Email");
    };

    const handleResetPassword = async (email) => {
        AuthService.handleResetPassword(email)
    };

    const handleLogout = async () => {
        await AuthService.logOut();
        setUser(null);
    };

    const value = {
        user,
        setUser,
        error,
        handleGoogleSignIn,
        handleAppleSignIn,
        handleMicrosoftSignIn,
        handleFacebookSignIn,
        handleEmailPassRegister,
        handleEmailPassSignIn,
        handleResetPassword,
        handleLogout,
    };

    return <authContext.Provider value={value} {...props} />;
};
