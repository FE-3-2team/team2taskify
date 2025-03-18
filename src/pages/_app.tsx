import "@/styles/globals.css";
import "@/styles/color.css";
import "@/styles/font.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
