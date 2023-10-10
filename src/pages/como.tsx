// pages/ComoJugar.tsx

import React from 'react';

const ComoJugar: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Cómo Jugar</h1>

            <h2 className="text-xl font-semibold mb-2">Reglas del Juego</h2>
            <p>
                El juego se basa en las próximas elecciones presidenciales de Argentina. Las opciones para las elecciones son Milei, Massa, Bullrich, Bregman, Schiaretti y Voto en Blanco. Cada jugador de un torneo debe predecir los porcentajes de votos que obtendrá cada candidato.
            </p>
            <br />
            <p>
                Las reglas son:
            </p>
            <ol className=" mt-2">
                <li>
                    <strong>1. Pronóstico de Porcentajes:</strong> Cada jugador proporciona su pronóstico para el porcentaje de votos que obtendrá cada candidato en las elecciones.
                </li>
                <li>
                    <strong>2. Cálculo de Diferencias:</strong> Una vez que se celebran las elecciones y se conocen los resultados reales, se comparan los pronósticos con los resultados reales.

                </li>
                <li>
                    <strong>3. Puntuación: </strong>Se calculan las diferencias absolutas entre los pronósticos y los resultados reales para cada candidato, y se suman para obtener una puntuación total para cada jugador.

                </li>
                <li>
                    <strong>4. Resta de Puntos por Coincidencia de Posición: </strong>Si un jugador acierta no solo el porcentaje, sino también la posición exacta de un candidato, se le resta un punto a su puntuación total por cada coincidencia.

                </li>
                <li>
                    <strong>5. Determinación del Ganador: </strong>Gana el participante con la menor puntuación total. Un puntaje más bajo indica que los pronósticos fueron más precisos y se acercaron más a los resultados reales.
                </li>
            </ol>

            <h2 className="text-xl font-semibold mb-2 mt-4">Ejemplo</h2>
            <p>
                Para ilustrar las reglas, aquí tienes un ejemplo:
            </p>

            <p>
                Supongamos que en un torneo, los resultados reales de las elecciones presidenciales son los siguientes:
            </p>

            <ul className="list-disc pl-6 mt-2">
                <li>Milei: 35%</li>
                <li>Massa: 25%</li>
                <li>Bullrich: 20%</li>
                <li>Bregman: 10%</li>
                <li>Schiaretti: 8%</li>
                <li>Voto en Blanco: 2%</li>
            </ul>

            <p>
                Ahora, dos jugadores, Carlos y Ana, proporcionaron sus pronósticos antes de las elecciones:
            </p>

            <h3 className="text-lg font-semibold mt-2">Pronósticos de Carlos:</h3>
            <ul className="list-disc pl-6 mt-2">
                <li>Milei: 30%</li>
                <li>Massa: 28%</li>
                <li>Bullrich: 21%</li>
                <li>Bregman: 12%</li>
                <li>Schiaretti: 9%</li>
                <li>Voto en Blanco: 2%</li>
            </ul>

            <h3 className="text-lg font-semibold mt-2">Pronósticos de Ana:</h3>
            <ul className="list-disc pl-6 mt-2">
                <li>Milei: 33%</li>
                <li>Massa: 22%</li>
                <li>Bullrich: 19%</li>
                <li>Bregman: 11%</li>
                <li>Schiaretti: 7%</li>
                <li>Voto en Blanco: 4%</li>
            </ul>

            <p>
                Para calcular los puntajes de Carlos y Ana, primero calculamos las diferencias entre sus pronósticos y los resultados reales para cada candidato. Luego sumamos estas diferencias:
            </p>

            <h3 className="text-lg font-semibold mt-2">Puntajes de Carlos:</h3>
            <ul className="list-disc pl-6 mt-2">
                <li>Milei: |30% - 35%| = 5%</li>
                <li>Massa: |28% - 25%| = 3%</li>
                <li>Bullrich: |21% - 20%| = 1%</li>
                <li>Bregman: |12% - 10%| = 2%</li>
                <li>Schiaretti: |9% - 8%| = 1%</li>
                <li>Voto en Blanco: |2% - 2%| = 0%</li>
            </ul>

            <p>
                Puntaje total de Carlos: 5% + 3% + 1% + 2% + 1% + 0% = 12%
            </p>

            <h3 className="text-lg font-semibold mt-2">Puntajes de Ana:</h3>
            <ul className="list-disc pl-6 mt-2">
                <li>Milei: |33% - 35%| = 2%</li>
                <li>Massa: |22% - 25%| = 3%</li>
                <li>Bullrich: |19% - 20%| = 1%</li>
                <li>Bregman: |11% - 10%| = 1%</li>
                <li>Schiaretti: |7% - 8%| = 1%</li>
                <li>Voto en Blanco: |4% - 2%| = 2%</li>
            </ul>

            <p>
                Puntaje total de Ana: 2% + 3% + 1% + 1% + 1% + 2% = 10%
            </p>

            <p>
                En este caso, Ana es la ganadora ya que obtuvo un puntaje total más bajo (10%) que Carlos (12%).
            </p>

            <small>Ejemplos creados con ChatGPT</small>
        </div>
    );
};

export default ComoJugar;
