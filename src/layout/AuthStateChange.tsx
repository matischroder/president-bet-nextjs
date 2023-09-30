import React, { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import useAuth from "@/hook/auth";
import Image from "next/image";


export default function AuthStateChanged({ children }) {

    const { setUser } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <div className="bg-black h-screen flex self-center justify-center">

            </div>
        )
    }


    return children
} 