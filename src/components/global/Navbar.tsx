import useAuth from '@/hook/auth';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}
//example to use interface
const Navbar = ({ isOpen, setIsOpen }: Props) => {
    const auth = useAuth();
    const navRef = useRef<HTMLDivElement | null>(null);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (
                isOpen &&
                navRef.current &&
                !navRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isOpen, setIsOpen]);

    return (
        <nav
            className={`${isOpen ? 'bg-black/95 w-64 z-50 fixed h-full' : `bg-transparent w-20 absolute top-0 left-0`
                } p-4 transition-all duration-300 overflow-x-hidden`}
            ref={navRef}

        >
            <div className="container mx-auto block ">
                <button
                    className="hover:text-gray-300"
                    onClick={toggleNavbar}

                >
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isOpen ? (
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        )}
                    </svg>
                </button>
                <div
                    className={`lg:flex ${isOpen ? 'block opacity-100' : 'hidden opacity-0'
                        } mt-4 lg:mt-0`}
                >
                    <ul className="">
                        {
                            auth.user && (
                                <>
                                    <Link href="/" onClick={() => setIsOpen(false)}>
                                        <li className="mb-4 lg:mb-0 whitespace-nowrap text-2xl" >Mis Torneos</li>
                                    </Link>
                                    <Link href="/buscar" onClick={() => setIsOpen(false)}>

                                        <li className="mb-4 lg:mb-0 whitespace-nowrap text-2xl">Buscar Torneos</li>
                                    </Link>
                                    <Link href="/nuevo" onClick={() => setIsOpen(false)}>

                                        <li className="mb-4 lg:mb-0 whitespace-nowrap text-2xl">Crear Torneo</li>
                                    </Link>
                                </>)
                        }
                        {
                            !auth.user && (
                                <>
                                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                                        <li className="mb-4  lg:mb-0 whitespace-nowrap text-2xl">Iniciar Sesión</li>
                                    </Link>
                                </>
                            )
                        }

                        <Link href="/como" onClick={() => setIsOpen(false)}>
                            <li className="mb-4 lg:mb-0 whitespace-nowrap text-2xl">Como Jugar</li>
                        </Link >
                        {
                            auth.user &&
                            <li className="mb-4 lg:mb-0 whitespace-nowrap text-2xl cursor-pointer" onClick={() => {
                                auth.handleLogout()
                                setIsOpen(false)
                            }}>
                                Cerrar Sesión
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
