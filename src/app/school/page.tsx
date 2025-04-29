import School from "./school";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'School Security Solutions | دوربین مداربسته مدرسه - Uniview Iran',
    description: 'Advanced security solutions for Iranian educational institutions. Comprehensive surveillance systems, access control, and student safety monitoring by Uniview Iran. Specialized solutions for K-12 schools, universities, and training centers. | راهکارهای امنیتی مدارس یونی ویو ایران',
    keywords: 'school security Iran, educational surveillance, school CCTV, campus security, student safety, access control education, دوربین مداربسته مدرسه, سیستم امنیتی دانشگاه, دوربین مداربسته یونی ویو, نظارت تصویری مدارس',
    openGraph: {
        title: 'School Security Solutions by Uniview Iran | راهکارهای امنیتی مدارس یونی ویو ایران',
        description: 'Complete security solutions for Iranian educational institutions including video surveillance, access control, and emergency response systems. Trusted by schools and universities across Iran.',
        images: [
            {
                url: '/school/School banner.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview School Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/school',
        languages: {
            'en-US': '/en/school',
            'fa-IR': '/fa/school',
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

export default function SchoolPage() {
    return (
        <>
            <Navbar />
            <School />
            <Footer />
        </>
    )
}

