// pages/ComoJugar.tsx

import React from 'react';

const ComoJugar: React.FC = () => {
    return (
        <div className="py-4 px-5">
            <h1 className="text-2xl font-bold mt-2  text-center">¿Cómo jugar?</h1>
            <h2 className="text-xl font-semibold mt-3 mb-2">Síntesis</h2>

            <p>
                El juego está basado en las próximas <strong>elecciones presidenciales de Argentina 2023</strong>. Para las mismas, cada jugador va a tener que elegir entre los posibles candidatos, Milei, Massa, Bullrich, Bregman, Schiaretti y predecir los porcentajes de votos que obtendrá cada uno de ellos, incluyendo el voto en blanco.
                El gMaríador será el participante que obtenga la <strong>menor puntuación</strong>. Un puntaje más bajo indica que los pronósticos fueron <strong>más precisos</strong> y se acercaron más a los <strong>resultados reales</strong>.
            </p>

            <h2 className="text-xl font-semibold mt-3 mb-2">¿Cómo jugar?</h2>

            <ol className=" mt-2">
                <li>
                    <strong>1. Pronóstico de Porcentajes:</strong> Cada jugador indicará un pronóstico estimado, estableciendo el porcentaje de votos que cree que obtendrá cada uno de los candidatos.
                </li>
                <li>
                    <strong>2. Cálculo de Diferencias:</strong> Una vez celebradas las elecciones, y conocidos resultados, se compararán los pronósticos con los resultados reales.
                </li>
                <li>
                    <strong>3. Puntuación: </strong>para conocer el puntaje se hará una sumatoria entre las diferencias absolutas de los pronósticos y los resultados reales de cada candidato, obteniendo así la puntuación total de cada jugador.
                </li>
                <li>
                    <strong>4. Resta de Puntos por Coincidencia de Posición: </strong>Si un jugador acierta no solo el porcentaje, sino también la posición exacta de un candidato, se le resta un punto a su puntuación total por cada coincidencia.
                </li>
                <li>
                    <strong>5. Determinación del GMaríador: </strong>Habiendo conocido los resultados finales de cada uno, gMaría el jugador que haya obtenido la  menor puntuación posible.
                </li>
            </ol>

            <h2 className="text-xl font-semibold mb-2 mt-4">Ejemplo</h2>
            <p className='mb-1'>Supongamos que en un torneo, los resultados reales de las elecciones presidenciales son los siguientes:</p>
            <style jsx>{`
            th, td {
                text-align: center;
            }
            `}</style>
            <table className="w-full border border-gray-300 bg-black text-white mb-2">
                <thead className="border border-gray-300">
                    <tr>
                        <th>Candidato</th>
                        <th>Resultado Real</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Milei</td>
                        <td>35%</td>
                    </tr>
                    <tr>
                        <td>Massa</td>
                        <td>25%</td>
                    </tr>
                    <tr>
                        <td>Bullrich</td>
                        <td>20%</td>
                    </tr>
                    <tr>
                        <td>Bregman</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>Schiaretti</td>
                        <td>8%</td>
                    </tr>
                    <tr>
                        <td>Voto en Blanco</td>
                        <td>2%</td>
                    </tr>
                </tbody>
            </table>

            <p className='mb-1'>Ahora, dos jugadores, Luis y María, proporcionaron sus pronósticos antes de las elecciones.</p>

            <h3 className="text-lg font-semibold">Pronósticos de Luis:</h3>
            <table className="w-full border border-gray-300 bg-black text-white mb-2">
                <thead className="border border-gray-300">
                    <tr>
                        <th>Candidato</th>
                        <th>Pronóstico de Luis</th>
                        <th>Diferencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Milei</td>
                        <td>30%</td>
                        <td>5%</td>
                    </tr>
                    <tr>
                        <td>Massa</td>
                        <td>28%</td>
                        <td>3%</td>
                    </tr>
                    <tr>
                        <td>Bullrich</td>
                        <td>21%</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>Bregman</td>
                        <td>12%</td>
                        <td>2%</td>
                    </tr>
                    <tr>
                        <td>Schiaretti</td>
                        <td>9%</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>Voto en Blanco</td>
                        <td>2%</td>
                        <td>0%</td>
                    </tr>
                </tbody>
                <tfoot className="border border-gray-300">
                    <tr>
                        <td className="text-center">Diferencia Total</td>
                        <td className="text-center">-</td>
                        <td className="text-center"><strong>12%</strong></td>
                    </tr>
                </tfoot>
            </table>


            <h3 className="text-lg font-semibold">Pronósticos de María:</h3>
            <table className="w-full border border-gray-300 bg-black text-white mb-2">
                <thead className="border border-gray-300">
                    <tr>
                        <th>Candidato</th>
                        <th>Pronóstico de María</th>
                        <th>Diferencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Milei</td>
                        <td>33%</td>
                        <td>2%</td>
                    </tr>
                    <tr>
                        <td>Massa</td>
                        <td>22%</td>
                        <td>3%</td>
                    </tr>
                    <tr>
                        <td>Bullrich</td>
                        <td>19%</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>Bregman</td>
                        <td>11%</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>Schiaretti</td>
                        <td>7%</td>
                        <td>1%</td>
                    </tr>
                    <tr>
                        <td>Voto en Blanco</td>
                        <td>4%</td>
                        <td>2%</td>
                    </tr>
                </tbody>
                <tfoot className="border border-gray-300">
                    <tr>
                        <td className="text-center">Diferencia Total</td>
                        <td className="text-center">-</td>
                        <td className="text-center"><strong>10%</strong></td>
                    </tr>
                </tfoot>
            </table>
            <p className='mt-3'>En este caso, <strong>María es la ganadora</strong> ya que obtuvo la diferencia más baja de 10% que la de Luis que fue de 12%.</p>

            <small>Ejemplos creados con ChatGPT</small>
        </div>
    );
};

export default ComoJugar;
