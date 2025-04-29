import SmartIntrusionPrevention from "./smart-Intrusion-Prevention";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Smart Intrusion Prevention | دوربین مداربسته هوشمند - Uniview Iran',
    description: 'Advanced AI-powered security solutions for Iranian businesses. Smart surveillance systems with intrusion detection, multi-sensor integration, and automated response by Uniview Iran. | راهکارهای امنیتی هوشمند یونی ویو ایران',
    keywords: 'smart security Iran, AI surveillance, intrusion prevention, edge computing, smart analytics, دوربین مداربسته هوشمند, سیستم امنیتی هوشمند, نظارت تصویری هوشمند, دوربین مداربسته یونی ویو',
    openGraph: {
        title: 'Smart Intrusion Prevention Solutions by Uniview Iran | راهکارهای امنیتی هوشمند یونی ویو ایران',
        description: 'Complete AI-powered security solutions including smart analytics, multi-sensor integration, and automated response systems. Leading provider of intelligent security solutions in Iran.',
        images: [
            {
                url: '/smart/Advanced Security Camera Solutions.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Smart Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/smart-Intrusion-Prevention',
        languages: {
            'en-US': '/en/smart-Intrusion-Prevention',
            'fa-IR': '/fa/smart-Intrusion-Prevention',
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

export default function SmartIntrusionPreventionPage() {
    return (
        <>
            <Navbar />
            <SmartIntrusionPrevention />
            <Footer />
        </>
    )
}


