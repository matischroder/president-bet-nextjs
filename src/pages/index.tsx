import Home from "@/components/Home";
import Votation from "@/components/prediction/Votation";
import { getTorneosByUsuario } from "@/functions/firebase/tournaments/getTorneoByUsuario";
import useAuth from "@/hook/auth";
import { withProtected } from "@/hook/route";
import { useEffect, useState } from "react";

type Torneo = {
  id: string;
  nombre: string;
  pronostico: [];
  // Add other properties
};

const Root = () => {
  const auth = useAuth();
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [selectedTorneo, setSelectedTorneo] = useState<Torneo | null>(null);

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const torneosData = await getTorneosByUsuario(auth.user.uid);
        setTorneos(torneosData); // Store torneos in state
      } catch (error) {
        console.error("Error fetching torneos:", error);
      }
    };

    fetchTorneos();
  }, [auth]);

  const handleEditClick = (torneo: Torneo) => {
    setSelectedTorneo(torneo); // Set the selected torneo for editing
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Mis Torneos</h1>
      {selectedTorneo ?
        <Votation
          torneo={selectedTorneo}
          setSelectedTorneo={setSelectedTorneo}
        />
        :
        <>
          <ul className="space-y-2">
            {torneos.map((torneo) => (
              <li
                key={torneo.id}
                className="bg-gray-800 shadow-md p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{torneo.nombre}</h2>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleEditClick(torneo)} // Pass the selected torneo
                >
                  Editar
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
