import "../styles/globals.css";
import { PropsWithChildren } from "react";

export default function App({ children }: PropsWithChildren<any>) {
  return (
    <html>
      <head>
        <title>Web</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
