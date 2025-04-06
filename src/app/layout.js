import { Playfair_Display, Concert_One } from "next/font/google";
import "./globals.css";

// Importing the fonts with correct configurations
const headerFont = Playfair_Display({
  variable: "--font-header",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Concert_One({
  variable: "--font-body",
  weight: "400", // Specify the weight
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Talk with Marimo",
  description: "A serene and minimalist space for marimo-inspired messages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${headerFont.variable} ${bodyFont.variable} bg-[var(--background)] text-[var(--foreground)]`}
        style={{
          fontFamily: "var(--font-body)", // Apply body font globally
        }}
      >
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
