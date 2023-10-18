import { Html, Head, Main, NextScript } from "next/document";
import Favicons from "@/components/global/Favicon";

const DOMAINS = [
    "https://president-bet-nextjs.vercel.app",
];

export default function Document() {

    const ogImageUrl = `${DOMAINS[0]}/argentina.png`;

    return (
        <Html lang="es">
            <Head>
                <Favicons />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="keywords"
                    content="elecciones, argentina, elecciones presidenciales, apuestas, prode"
                />
                <meta
                    property="og:title"
                    content="Prode Elecciones Argentina" key="title"
                />
                <meta
                    property="og:description"
                    content="Aplicación para que juegues con tus amigos. Crea un nuevo torneo, guarda tu pronóstico e invita a tus amigos."
                />
                <meta
                    property="og:image"
                    content={ogImageUrl}
                />

            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

