import Stadium from "./stadium";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Stadium Security Solutions | راهکارهای امنیتی استادیوم - Uniview Iran',
    description: 'Advanced stadium security solutions by Uniview Iran. Comprehensive surveillance systems for sports venues, concert halls, and multi-purpose arenas. Expert implementation of crowd management, access control, and incident detection systems. | راهکارهای امنیتی پیشرفته استادیوم توسط یونی ویو ایران',
    keywords: 'Uniview Iran, stadium security, venue security, sports venue security, concert hall security, crowd management, access control, CCTV stadium, surveillance systems Iran, یونی ویو ایران, دوربین مداربسته استادیوم, سیستم امنیتی ورزشگاه, مدیریت جمعیت, کنترل دسترسی',
    openGraph: {
        title: 'Stadium Security Solutions by Uniview Iran | راهکارهای امنیتی استادیوم یونی ویو ایران',
        description: 'Complete security solutions for stadiums and large venues. Leading provider of surveillance and security systems in Iran.',
        images: [
            {
                url: '/stadium/Stadium Security Banner.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Stadium Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
        siteName: 'Uniview Iran',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/stadium',
        languages: {
            'en-US': '/en/stadium',
            'fa-IR': '/fa/stadium',
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

export default function StadiumPage() {
    return (
        <>
            <Navbar />
            <Stadium />
            <Footer />
        </>
    )
}


