import { Html, Head, Main, NextScript } from "next/document";

const DOMAINS = [
    "https://president-bet-nextjs.vercel.app",
];

export default function Document() {

    const ogImageUrl = `${DOMAINS[0]}/argentina.png`;

    return (
        <Html lang="es" className="bg-[#0f0e0e]">
            <Head>
                <meta name="application-name" content="Prode Elecciones" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="apple-mobile-web-app-title" content="Prode Elecciones Argentinas" />
                <meta name="description" content="Prode para las Elecciones Argentinas" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#000000" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#000000" />

                <link rel="apple-touch-icon" href="/argentina.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/argentina.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/argentina.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="argentina.png" />

                <link rel="icon" type="image/png" sizes="32x32" href="argentina.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="argentina.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="argentina.png" color="transparent" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="twitter:card" content="Prode para las Elecciones Argentinas" />
                <meta name="twitter:title" content="Prode Elecciones Argentinas" />
                <meta name="twitter:description" content="Prode para las Elecciones Argentinas" />
                <meta name="twitter:creator" content="@matischroder" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Prode Elecciones Argentinas" />
                <meta property="og:description" content="Prode para las Elecciones Argentinas" />
                <meta property="og:site_name" content="Prode Elecciones Argentinas" />

                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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

