import Terms from "./terms";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Terms of Service | شرایط استفاده - Uniview Iran',
    description: 'Official terms and conditions for Uniview Iran security solutions. Comprehensive terms of service for security camera systems, surveillance solutions, and related services. | شرایط و ضوابط استفاده از خدمات یونی ویو ایران',
    keywords: 'Uniview Iran terms, security solutions terms, surveillance systems terms, CCTV terms, شرایط استفاده یونی ویو ایران, قوانین دوربین مداربسته, شرایط خدمات نظارتی',
    openGraph: {
        title: 'Terms of Service - Uniview Iran | شرایط استفاده - یونی ویو ایران',
        description: 'Read our comprehensive terms of service for security solutions and surveillance systems. | شرایط و ضوابط استفاده از خدمات امنیتی و نظارتی',
        images: [
            {
                url: '/logo.svg',
                width: 1200,
                height: 630,
                alt: 'Uniview Iran Terms of Service',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
        siteName: 'Uniview Iran',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/terms',
        languages: {
            'en-US': '/en/terms',
            'fa-IR': '/fa/terms',
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

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <Terms />
            <Footer />
        </>
    )
}
