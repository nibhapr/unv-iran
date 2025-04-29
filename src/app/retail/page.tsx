import Retail from "./retail";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Retail Security Solutions | دوربین مداربسته فروشگاه - Uniview Iran',
    description: 'Advanced security solutions for Iranian retail businesses. Comprehensive surveillance systems, theft prevention, and customer analytics by Uniview Iran. Specialized solutions for fashion stores, electronics retailers, and supermarkets. | راهکارهای امنیتی فروشگاه یونی ویو ایران',
    keywords: 'retail security Iran, store surveillance, retail CCTV, loss prevention, customer analytics, inventory security, دوربین مداربسته فروشگاه, سیستم امنیتی فروشگاه, دوربین مداربسته یونی ویو, نظارت تصویری فروشگاه',
    openGraph: {
        title: 'Retail Security Solutions by Uniview Iran | راهکارهای امنیتی فروشگاه یونی ویو ایران',
        description: 'Complete security solutions for Iranian retail businesses including video surveillance, theft prevention, and customer analytics. Trusted by retailers across Iran.',
        images: [
            {
                url: '/retail/Protecting Your Retail Business.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Retail Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/retail',
        languages: {
            'en-US': '/en/retail',
            'fa-IR': '/fa/retail',
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

export default function RetailPage() {
    return (
        <>
            <Navbar />
            <Retail />
            <Footer />
        </>
    )
}




