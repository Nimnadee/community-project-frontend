import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
    title: {
        default: "Frumos",
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head />
        <body
            className={clsx(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="relative flex flex-col h-screen">
                {/* Uncomment the Navbar if needed */}
                {/* <Navbar /> */}
                <main className="container px-0 flex-grow">
                    {children}
                </main>

                {/*<footer className="w-full flex items-center justify-center py-3">*/}
                {/*    <Link*/}
                {/*        isExternal*/}
                {/*        className="flex items-center gap-1 text-current"*/}
                {/*        href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"*/}
                {/*        title="nextui.org homepage"*/}
                {/*    >*/}
                {/*        <span className="text-default-600">Powered by</span>*/}
                {/*        <p className="text-primary">Sabra</p>*/}
                {/*    </Link>*/}
                {/*</footer>*/}
            </div>
        </Providers>
        </body>
        </html>
    );
}