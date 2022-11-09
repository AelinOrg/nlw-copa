import "./styles/global.css";
import { PropsWithChildren } from "react";
import { Inter } from "@next/font/google";

const inter = Inter();

export default function App({ children }: PropsWithChildren<any>) {
  return (
    <html className={inter.className}>
      <head>
        <title>Web</title>
      </head>
      <body className="bg-gray-900 text-white bg-app bg-no-repeat">
        <main>{children}</main>
      </body>
    </html>
  );
}
