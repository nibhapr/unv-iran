import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/Home";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'uniview Security Solutions',
  description: 'uniview Security Solutions',
}
export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
    </>
  );
}
