import Hotel from "./hotel";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Hotel Security Solutions | دوربین مداربسته هتل - Uniview Iran',
    description: 'Advanced security solutions for Iranian hotels. Comprehensive surveillance systems, access control, and guest monitoring by Uniview Iran. Specialized solutions for luxury hotels, resorts, and business properties. | راهکارهای پیشرفته امنیتی برای هتل‌های ایران',
    keywords: 'hotel security Iran, Uniview hotel solutions, hotel surveillance, hotel CCTV, access control hotels, luxury hotel security, resort security systems, دوربین مداربسته هتل, سیستم امنیتی هتل, نظارت تصویری هتل',
    openGraph: {
        title: 'Hotel Security Solutions by Uniview Iran | راهکارهای امنیتی هتل یونی ویو ایران',
        description: 'Complete security solutions for Iranian hotels including video surveillance, access control, and guest monitoring systems. Trusted by luxury hotels and resorts across Iran.',
        images: [
            {
                url: '/hotel/Leading Hotel Security banner.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Hotel Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/hotel',
        languages: {
            'en-US': '/en/hotel',
            'fa-IR': '/fa/hotel',
        }
    },
    robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
    }
}

export default function HotelPage() {
    return (
        <>
            <Navbar />
            <Hotel />
            <Footer />
        </>
    )
}


