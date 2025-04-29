import ShoppingMall from "./shopping-mall";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Shopping Mall Security Solutions | دوربین مداربسته مرکز خرید - Uniview Iran',
    description: 'Advanced security solutions for Iranian shopping malls. Comprehensive surveillance systems, crowd management, and parking security by Uniview Iran. Specialized solutions for enclosed malls, open-air centers, and mixed-use developments. | راهکارهای امنیتی مراکز خرید یونی ویو ایران',
    keywords: 'shopping mall security Iran, mall surveillance, mall CCTV, crowd management, parking security, دوربین مداربسته مرکز خرید, سیستم امنیتی پاساژ, دوربین مداربسته یونی ویو, نظارت تصویری مجتمع تجاری',
    openGraph: {
        title: 'Shopping Mall Security Solutions by Uniview Iran | راهکارهای امنیتی مراکز خرید یونی ویو ایران',
        description: 'Complete security solutions for Iranian shopping malls including video surveillance, crowd management, and emergency response systems. Trusted by major malls across Iran.',
        images: [
            {
                url: '/shopping mall/Shopping mall.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Shopping Mall Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/shopping-mall',
        languages: {
            'en-US': '/en/shopping-mall',
            'fa-IR': '/fa/shopping-mall',
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

export default function ShoppingMallPage() {
    return (
        <>
            <Navbar />
            <ShoppingMall />
            <Footer />
        </>
    )
}

