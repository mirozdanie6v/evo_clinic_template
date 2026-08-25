import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./p1.css";
export const metadata: Metadata = { title: "EVO Beauty Space · Nha Trang", description: "EVO Beauty Space mini app: real Altegio cosmetology catalog, specialists and booking." };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f4f0e8" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
