import Image from "next/image";
import { useState } from "react";

import { withPublic } from "../hook/route"
import LoginButton from "@/components/auth/LoginButton";


const Login = ({ auth }: { auth: any }) => {
    const [widestButtonWidth, setWidestButtonWidth] = useState<HTMLElement | null>(null)

    const { user, error, handleGoogleSignIn, handleAppleSignIn, handleMicrosoftSignIn, handleFacebookSignIn, handleEmailPassRegister, handleEmailPassSignIn, handleResetPassword } = auth

    const providers = [{ name: 'google', onClickFunction: () => handleGoogleSignIn(), background: "bg-white", color: 'text-[#757575]' }, { name: 'apple', onClickFunction: () => handleAppleSignIn(), background: "bg-black", color: 'text-white' }, { name: 'microsoft', onClickFunction: () => handleMicrosoftSignIn(), background: "bg-[#2F2F2F]", color: 'text-white' } /*{ name: 'facebook', onClickFunction: () => handleFacebookSignIn(), background: "bg-[#3b5998]", color: 'text-white' }, */]

    return (
        <div className="h-[100%] w-[100%] flex self-center justify-center">
            <div className=" h-full w-[70%] md:w-[40%] lg:w-[25%] xl:w-[20%] 2xl:w-[17%] flex flex-col self-center justify-center">
                <Image
                    src="/arg.png"
                    width={55}
                    height={55}
                    className="self-center "
                    alt="Pluma Icon"
                />
                <h2 className="text-center mt-2 text-2xl">
                    Prode Elecciones Generales Argentinas 2023
                </h2>

                <div className="self-center py-12">
                    {
                        providers.map((provider, index) => (
                            <LoginButton
                                key={index}
                                providerName={provider.name}
                                handleSignIn={provider.onClickFunction}
                                background={provider.background}
                                color={provider.color}
                                widestButtonWidth={widestButtonWidth}
                                setWidestButtonWidth={setWidestButtonWidth}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default withPublic(Login);
