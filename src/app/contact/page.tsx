import Contact from "./contact";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contact Uniview Iran | تماس با یونی ویو ایران',
    description: 'Contact Uniview Iran for professional security solutions and surveillance systems. Get expert consultation and support for your security needs. | تماس با یونی ویو ایران برای راهکارهای امنیتی و سیستم‌های نظارتی حرفه‌ای',
    keywords: 'contact uniview iran, security solutions contact, surveillance systems support, uniview support iran, تماس یونی ویو ایران, پشتیبانی دوربین مداربسته, تماس با ما',
    openGraph: {
        title: 'Contact Uniview Iran | تماس با یونی ویو ایران',
        description: 'Get in touch with Uniview Iran for professional security solutions and expert support.',
        url: 'https://www.uniview-iran.ir/contact',
        type: 'website',
        locale: 'fa_IR',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/contact',
        languages: {
            'en-US': '/en/contact',
            'fa-IR': '/fa/contact',
        }
    }
}

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <Contact />
            <Footer />
        </>
    )
}

