import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

import { updateUserInformation } from "@/functions/firebase/updateUser";
import { userInfomationCompleted } from "@/functions/firebase/userInformationCompleted";
import { LoadingCircle } from "../global/icons";

export default function UserInformation({ userInfo }: { userInfo: any }) {
    // State for visibility of component
    const [visible, setVisible] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedOption, setSelectedOption] = useState("estudiante");
    const [secondOption, setSecondOption] = useState<string>("");
    const [estudio, setEstudio] = useState<string>("");

    useEffect(() => {
        const verifyUserInfo = async () => {
            const userInfoCompleted = await userInfomationCompleted(userInfo);
            if (!userInfoCompleted) {
                setVisible(true);
            }
        };
        verifyUserInfo();
    }, []);

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
        if (event.target.value !== "abogado" || secondOption !== "estudio") {
            setSecondOption("");
        }
    };

    const handleSecondOption = (event: any) => {
        setSecondOption(event.target.value);
    };

    const handleUpdateUserInformation = async () => {
        if (
            (selectedOption === "estudiante" || selectedOption === "abogado") &&
            secondOption === ""
        ) {
            toast.error("Campos requeridos pendientes");
        } else {
            try {
                setIsLoading(true);
                const userData = {
                    profesion: selectedOption,
                    description: secondOption + " " + estudio,
                };
                const updateUser = await updateUserInformation(
                    userInfo.uid,
                    userData
                );
                if (updateUser === "success") {
                    setVisible(false);
                    toast.success("Usuario actualizado correctamente");
                } else {
                    toast.error("Ha ocurrido un error");
                }
            } catch (err) {
                // console.log(err);
            } finally {
                setIsLoading(false);
                setVisible(false);
            }
        }
    };

    if (visible) {
        return (
            <div className="bg-neutral-900 absolute  bg-opacity-90 h-[110%] w-full flex self-center justify-center">
                <div className="bg-black h-auto py-10 w-[80%] md:w-[50%] lg:w-[25%] flex rounded-xl self-center justify-center border border-gray-500 shadow-lg shadow-neutral-700 ">
                    <div className="w-[90%] h-[80%] flex flex-col self-center justify-start  ">
                        <h2 className="text-center font-medium text-xl">
                            Selecciona la opción que mas te represente
                        </h2>
                        {/* <p className="text-center font-light text-sm mt-[5%] text-neutral-300">
                            Necesitamos saber un poco sobre vos, selecciona la
                            opcion que mas te represente
                        </p> */}
                        <div className="flex self-center justify-center mt-[10%]">
                            <p className="text-center self-center mr-2">
                                Profesión:
                            </p>
                            <select
                                className="rounded-lg bg-neutral-800 text-white px-4 py-2 border border-gray-500 w-[50%] shadow-sm shadow-neutral-700 focus:outline-none"
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                <option value="estudiante">Estudiante</option>
                                <option value="abogado">Abogado</option>
                                <option value="escribano">Escribano</option>
                                <option value="juez">Juez</option>
                                <option value="funcionario del poder judicial">
                                    Funcionario del Poder Judicial
                                </option>
                                <option value="empleado del poder judicial">
                                    Empleado del Poder Judicial
                                </option>
                                <option value="otro">Otro</option>
                                {/* Add more options here as needed */}
                            </select>
                        </div>
                        {selectedOption === "estudiante" ? (
                            <div className="flex self-center justify-center mt-[10%]">
                                <p className="text-center self-center mr-2">
                                    Universidad:
                                </p>
                                <select
                                    className="rounded-lg bg-neutral-800 text-white px-4 py-2 border border-gray-500 w-[100%]  shadow-sm shadow-neutral-700 focus:outline-none"
                                    value={secondOption}
                                    onChange={handleSecondOption}
                                >
                                    <option value=""></option>
                                    <option value="Universidad Católica Argentina">
                                        Universidad Católica Argentina
                                    </option>
                                    <option value="Universidad de Belgrano">
                                        Universidad de Belgrano
                                    </option>
                                    <option value="Universidad del Salvador">
                                        Universidad del Salvador
                                    </option>
                                    <option value="Universidad Católica de Salta">
                                        Universidad Católica de Salta
                                    </option>
                                    <option value="Universidad Torcuato Di Tella">
                                        Universidad Torcuato Di Tella
                                    </option>
                                    <option value="Universidad Católica de Córdoba">
                                        Universidad Católica de Córdoba
                                    </option>
                                    <option value="Universidad Siglo XXI">
                                        Universidad Siglo XXI
                                    </option>
                                    <option value="Universidad Blas Pascal">
                                        Universidad Blas Pascal
                                    </option>
                                    <option value="Universidad Nacional de Buenos Aires">
                                        Universidad Nacional de Buenos Aires
                                    </option>
                                    <option value="Universidad Nacional de Catamarca">
                                        Universidad Nacional de Catamarca
                                    </option>
                                    <option value="Universidad Nacional de Comahue">
                                        Universidad Nacional de Comahue
                                    </option>
                                    <option value="Universidad Nacional de Córdoba">
                                        Universidad Nacional de Córdoba
                                    </option>
                                    <option value="Universidad Nacional de Cuyo">
                                        Universidad Nacional de Cuyo
                                    </option>
                                    <option value="Universidad Nacional de Gral. San Martín">
                                        Universidad Nacional de Gral. San Martín
                                    </option>
                                    <option value="Universidad Nacional de La Pampa">
                                        Universidad Nacional de La Pampa
                                    </option>
                                    <option value="Universidad Nacional de La Patagonia San Juan Bosco">
                                        Universidad Nacional de La Patagonia San
                                        Juan Bosco
                                    </option>
                                    <option value="Universidad Nacional de La Plata">
                                        Universidad Nacional de La Plata
                                    </option>
                                    <option value="Universidad Nacional de La Rioja">
                                        Universidad Nacional de La Rioja
                                    </option>
                                    <option value="Universidad Nacional del Litoral">
                                        Universidad Nacional del Litoral
                                    </option>
                                    <option value="Universidad Nacional de Lomas de Zamora">
                                        Universidad Nacional de Lomas de Zamora
                                    </option>
                                    <option value="Universidad Nacional de Mar del Plata">
                                        Universidad Nacional de Mar del Plata
                                    </option>
                                    <option value="Universidad Nacional de Matanza">
                                        Universidad Nacional de Matanza
                                    </option>
                                    <option value="Universidad Nacional de Misiones">
                                        Universidad Nacional de Misiones
                                    </option>
                                    <option value="Universidad Nacional del Noreste de la Provincia de Buenos Aires">
                                        Universidad Nacional del Noreste de la
                                        Provincia de Buenos Aires
                                    </option>
                                    <option value="Universidad Nacional del Nordeste">
                                        Universidad Nacional del Nordeste
                                    </option>
                                    <option value="Universidad Nacional de Rosario">
                                        Universidad Nacional de Rosario
                                    </option>
                                    <option value="Universidad Nacional de San Juan">
                                        Universidad Nacional de San Juan
                                    </option>
                                    <option value="Universidad Nacional de San Luis">
                                        Universidad Nacional de San Luis
                                    </option>
                                    <option value="Universidad Nacional del Sur">
                                        Universidad Nacional del Sur
                                    </option>
                                    <option value="Universidad Nacional de Tucumán">
                                        Universidad Nacional de Tucumán
                                    </option>
                                    <option value="Universidad Argentina de la Empresa">
                                        Universidad Argentina de la Empresa
                                    </option>

                                    {/* Add more options here as needed */}
                                </select>
                            </div>
                        ) : null}
                        {selectedOption === "abogado" ? (
                            <div className="flex self-center justify-center mt-[10%]">
                                <p className="text-center self-center mr-2">
                                    Lugar:
                                </p>
                                <select
                                    className="rounded-lg bg-neutral-800 text-white px-4 py-2 border border-gray-500 w-[70%]  shadow-sm shadow-neutral-700 focus:outline-none"
                                    value={secondOption}
                                    onChange={handleSecondOption}
                                >
                                    <option value=""></option>
                                    <option value="empresa">Empresa</option>
                                    <option value="estudio">Estudio</option>

                                    {/* Add more options here as needed */}
                                </select>
                            </div>
                        ) : null}

                        {secondOption === "estudio" ||
                            secondOption === "empresa" ? (
                            <div className="relative flex w-[90%] self-center justify-center rounded-xl border border-gray-200  dark:bg-neutral-900 h-[40px]  shadow-lg shadow-neutral-700   mt-[10%]">
                                <input
                                    // ref={inputRef}
                                    // tabIndex={0}
                                    // required
                                    // rows={1}
                                    // autoFocus

                                    value={estudio}
                                    onChange={(e) => setEstudio(e.target.value)}
                                    // onKeyDown={(e) => {
                                    //     if (e.key === "Enter" && !e.shiftKey) {
                                    //     }
                                    // }}
                                    placeholder={`Indica en que ${secondOption}`}
                                    spellCheck={false}
                                    className="w-[90%]  self-center focus:outline-none dark:bg-neutral-900"
                                />
                            </div>
                        ) : null}
                        <button
                            className=" dark:bg-white bg-white self-center mt-[10%] flex w-[90%] lg:w-[30%] rounded-xl border border-neutral-500 flex-col justify-center items-center h-[40px] md:w-[40%] lg:w-[20%] shadow-lg shadow-neutral-700  "
                            onClick={() => {
                                handleUpdateUserInformation();
                            }}
                            disabled={isLoading}
                        >
                            {!isLoading ? (
                                <p className="text-center text-black font-medium ">
                                    Guardar
                                </p>
                            ) : (
                                <LoadingCircle />
                            )}
                        </button>
                    </div>
                </div>
                <Toaster />
            </div>
        );
    } else {
        return;
    }
}
