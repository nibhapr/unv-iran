import Privacy from "./privacy";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Privacy Policy | حریم خصوصی - Uniview Iran',
    description: 'Learn about Uniview Iran\'s privacy policy and how we protect your data. Comprehensive information about data collection, usage, and security measures for our security camera solutions. | سیاست حفظ حریم خصوصی یونی ویو ایران',
    keywords: 'privacy policy uniview iran, data protection, security camera privacy, CCTV privacy, surveillance privacy, دوربین مداربسته, حریم خصوصی, سیاست حفظ اطلاعات',
    openGraph: {
        title: 'Privacy Policy | حریم خصوصی - Uniview Iran',
        description: 'Understanding how Uniview Iran protects your privacy and handles your data. | نحوه حفاظت از اطلاعات شخصی در یونی ویو ایران',
        images: [
            {
                url: '/uniview-privacy-policy.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Iran Privacy Policy',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/privacy',
        languages: {
            'en-US': '/en/privacy',
            'fa-IR': '/fa/privacy',
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

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <Privacy />
            <Footer />
        </>
    )
}
