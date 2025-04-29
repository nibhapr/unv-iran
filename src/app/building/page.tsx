import Building from "./building";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Building Security Solutions | امنیت ساختمان یونی ویو ایران',
    description: 'Advanced security solutions for Iranian buildings. Comprehensive surveillance systems, access control, and perimeter protection by Uniview Iran. | راهکارهای پیشرفته امنیتی برای ساختمان‌های ایران',
    keywords: 'building security Iran, Uniview building solutions, commercial security, residential security, access control Iran, CCTV building, دوربین مداربسته ساختمان, سیستم امنیتی ساختمان',
    openGraph: {
        title: 'Building Security Solutions by Uniview Iran | راهکارهای امنیتی ساختمان یونی ویو ایران',
        description: 'Complete security solutions for Iranian buildings including video surveillance, access control, and perimeter protection systems.',
        images: [
            {
                url: '/buildings/Securing_What_Matters_Most[1].webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Building Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/building',
        languages: {
            'en-US': '/en/building',
            'fa-IR': '/fa/building',
        }
    }
}

export default function BuildingPage() {
    return (
        <>
            <Navbar />
            <Building />
            <Footer />
        </>
    )
}
