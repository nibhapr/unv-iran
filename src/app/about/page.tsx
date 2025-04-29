import About from "./about";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About Uniview Iran | درباره یونی ویو ایران',
    description: 'Learn about Uniview Iran - The authorized distributor of Uniview security and surveillance solutions in Iran. Discover our mission, values, and comprehensive security solutions. | درباره یونی ویو ایران - نماینده رسمی محصولات امنیتی و نظارتی یونی ویو در ایران',
}

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <About />
            <Footer />
        </>
    )
}
