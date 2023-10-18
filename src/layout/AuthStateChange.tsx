

import React, { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import useAuth from "@/hook/auth";

type AuthStateChangedProps = {
    children: React.ReactNode;
};

export default function AuthStateChanged({ children }: AuthStateChangedProps) {
    const { setUser } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setIsLoading(false);
        });
    }, [setUser]);

    if (isLoading) {
        return <div className="bg-[#0f0e0e] absolute inset-0 flex self-center justify-center"></div>;
    }

    return <>{children}</>;
}
