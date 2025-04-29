import Hospital from "./hospital";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Hospital Security Solutions | دوربین مداربسته بیمارستان - Uniview Iran',
    description: 'Advanced security solutions for Iranian hospitals. Comprehensive surveillance systems, access control, and patient monitoring by Uniview Iran. | راهکارهای پیشرفته امنیتی برای بیمارستان‌های ایران',
    keywords: 'hospital security Iran, Uniview hospital solutions, healthcare surveillance, medical facility security, patient monitoring systems, دوربین مداربسته بیمارستان, سیستم امنیتی بیمارستان, نظارت تصویری بیمارستان',
    openGraph: {
        title: 'Hospital Security Solutions by Uniview Iran | راهکارهای امنیتی بیمارستان یونی ویو ایران',
        description: 'Complete security solutions for Iranian hospitals including video surveillance, access control, and patient monitoring systems. | راهکارهای جامع امنیتی برای بیمارستان‌های ایرانی',
        images: [
            {
                url: '/hospital/Hospital banner.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Hospital Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/hospital',
        languages: {
            'en-US': '/en/hospital',
            'fa-IR': '/fa/hospital',
        }
    }
}

export default function HospitalPage() {
    return (
        <>
            <Navbar />
            <Hospital />
            <Footer />
        </>
    )
}
