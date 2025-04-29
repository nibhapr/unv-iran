import Warehouse from "./warehouse";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Warehouse Security Solutions | Uniview',
    description: 'Comprehensive security solutions for warehouses including video surveillance, access control, and customer analytics.',
}

export default function WarehousePage() {
    return (
        <>
            <Navbar />
            <Warehouse />
            <Footer />
        </>
    )
}

