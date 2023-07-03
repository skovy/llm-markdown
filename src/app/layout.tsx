import classNames from "classnames";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const monospace = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Markdown LLM",
  description:
    "App demo for rendering rich-text (markdown) from a Large Language Model.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          sans.className,
          sans.variable,
          monospace.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
