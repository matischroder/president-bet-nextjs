import CircleSpinner from "@/components/global/Spinner";
import Votation from "@/components/prediction/Votation";
import { getTorneosByUsuario } from "@/functions/firebase/tournaments/getTorneoByUsuario";
import useAuth from "@/hook/auth";
import { withProtected } from "@/hook/route";
import { useEffect, useState } from "react";
import Torneo from "@/types/torneo";

const Root = () => {
  const auth = useAuth();
  const [torneos, setTorneos] = useState<Torneo[] | null>(null);
  const [selectedTorneo, setSelectedTorneo] = useState<Torneo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!torneos) {
      setIsLoading(true)
      const fetchTorneos = async () => {
        try {
          const torneosData = await getTorneosByUsuario(auth.user.uid);
          setTorneos(torneosData); // Store torneos in state
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching torneos:", error);
          setIsLoading(false);
        }
      };
      fetchTorneos();
    }
  }, [auth, torneos]);

  const handleEditClick = (torneo: Torneo) => {
    setSelectedTorneo(torneo); // Set the selected torneo for editing
  };

  return (
    <div className="p-4 h-full">
      <h1 className="text-2xl font-bold text-center mb-4">Mis Torneos</h1>
      {isLoading && <CircleSpinner />}
      {selectedTorneo ?
        <Votation
          torneo={selectedTorneo}
          setSelectedTorneo={setSelectedTorneo}
          setTorneos={setTorneos}
        />
        :
        <>

          <ul className="space-y-2 py-2">
            {torneos && torneos.length === 0 &&
              <p className="text-center text-slate-600">No estás en ningún torneo.</p>
            }
            {torneos && torneos.map((torneo) => (
              <li
                key={torneo.id}
                className="bg-gray-800 shadow-md p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{torneo.nombre}</h2>
                </div>
                <button className="px-3 py-1 bg-[#5a7ed1] text-white font-bold rounded-lg"
                  onClick={() => handleEditClick(torneo)} // Pass the selected torneo
                >
                  Ver
                </button>
              </li>
            ))}
          </ul>
        </>
      }
    </div>
  );
};

export default withProtected(Root);
