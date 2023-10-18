import React from "react";
import useAuth from "./auth";
import { useRouter } from "next/router";
import CircleSpinner from "@/components/global/Spinner";

export function withPublic(Component) {
    return function WithPublic(props) {
        const auth = useAuth();
        if (auth.user) {
            // 
            // The following return is so that the screen doesn't show a flick
            return (
                <div className="bg-[#0f0e0e] absolute inset-0 self-center justify-center">
                    <CircleSpinner />
                </div>
            );
        }

        return <Component auth={auth} {...props} />;
    };
}

export function withProtected(Component) {
    return function WithProtected(props) {
        const auth = useAuth();
        const router = useRouter();
        if (!auth.user) {
            router.replace("/auth");
            // The following return is so that the screen doesn't show a flick
            return (
                <div className="bg-[#0f0e0e] absolute inset-0 self-center justify-center">
                    <CircleSpinner />
                </div>
            );
        }

        return <Component auth={auth} {...props} />;
    };
}
