import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/hook/auth";
import { useState } from "react";
import Navbar from "@/components/global/Navbar";
import { Toaster } from "sonner";
import AuthStateChanged from "@/layout/AuthStateChange";

export default function App({ Component, pageProps }: AppProps) {
  // logic to open navbar
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);


  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const windowWidth = window.innerWidth;

    if (isOpen && diffX < -40) {
      // Close the navbar if swiped left
      setIsOpen(false);
      setStartX(null);
    } else if (!isOpen && diffX > 80 && diffX) {
      // Open the navbar if swiped right (within the width of the navbar)
      setIsOpen(true);
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  return (
    <AuthProvider>
      <AuthStateChanged>
        <div className="bg-[#0f0e0e] text-white absolute inset-0  max-w-md m-auto">
          <div
            className={`w-full h-full`}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Navbar
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <Component className="blur-lg" {...pageProps} />
            <Toaster />
          </div>
        </div>
      </AuthStateChanged>
    </AuthProvider>
  );
}
