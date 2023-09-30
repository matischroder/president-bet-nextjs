// pages/ComoJugar.tsx

import { withProtected, withPublic } from '@/hook/route';
import React from 'react';

const ComoJugar: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Cómo Jugar</h1>
            <p>
                Aquí puedes proporcionar una explicación detallada de las reglas del juego.
                Describe cómo se juega, cuáles son los objetivos, las reglas básicas y cualquier
                información importante que los jugadores necesiten conocer.
            </p>
            <p>
                También puedes incluir ejemplos, imágenes o videos para hacer las reglas más claras
                y comprensibles.
            </p>
        </div>
    );
};

export default withPublic(ComoJugar);
