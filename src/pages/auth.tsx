import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


// import useAuth from "@/hook/auth";
import { withPublic } from "../hook/route"
import LoginButton from "@/components/auth/LoginButton";
import { toast } from "sonner";


function Login({ auth }: { auth: any }) {
    const router = useRouter();
    const { slug: id } = router.query; // Retrieve the slug from router query
    const { user, error, handleGoogleSignIn, handleAppleSignIn, handleMicrosoftSignIn, handleFacebookSignIn } = auth
    const [torneoId, setTorneoId] = useState<string>("");

    useEffect(() => {
        if (id)
            setTorneoId(id as string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const providers = [
        {
            name: 'google',
            onClickFunction: async () => {
                const loginResponse = await handleGoogleSignIn()
                console.log(loginResponse)
                if (loginResponse) {
                    if (torneoId !== "") {
                        console.log("passed here")
                        router.push(`/buscar/${torneoId}`)
                    }
                } else {
                    toast.error("No se pudo conectar, intente nuevamente")
                }

            },
            background: "bg-white",
            color: 'text-[#757575]'
        },
        // {
        //     name: 'apple',
        //     onClickFunction: () => handleAppleSignIn(),
        //     background: "bg-black",
        //     color: 'text-white'
        // },
        // {
        //     name: 'microsoft',
        //     onClickFunction: () => handleMicrosoftSignIn(),
        //     background: "bg-[#2F2F2F]",
        //     color: 'text-white'
        // },
        /*{ name: 'facebook', onClickFunction: () => handleFacebookSignIn(), background: "bg-[#3b5998]", color: 'text-white' }, */]

    return (
        <main className="flex h-screen">
            <div className="h-[100%] w-[100%] flex self-center justify-center">
                <div className=" h-full w-[70%] flex flex-col self-center justify-center">
                    <Image
                        src="/argentina.png"
                        width={55}
                        height={55}
                        className="self-center "
                        alt="Pluma Icon"
                    />
                    <h2 className="text-center mt-2 text-2xl tracking-wide">
                        Prode de las Elecciones Argentinas
                    </h2>
                    <p className="text-center my-5">
                        Inicie sesión con su cuenta para continuar
                    </p>
                    <div className="h-2/5 self-center">
                        {
                            providers.map((provider, index) => (
                                <LoginButton
                                    key={index}
                                    providerName={provider.name}
                                    handleSignIn={provider.onClickFunction}
                                    background={provider.background}
                                    color={provider.color}
                                />
                            ))
                        }
                    </div>

                </div>
            </div>
        </main>
    );
}

export default withPublic(Login);
