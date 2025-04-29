import Bank from "./bank";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Bank Security Solutions | امنیت بانکی یونی ویو ایران',
    description: 'Advanced security camera solutions for Iranian banks and financial institutions. Comprehensive surveillance systems, access control, and fraud detection by Uniview Iran. | راهکارهای پیشرفته دوربین مداربسته برای بانک‌ها و موسسات مالی ایران',
    keywords: 'bank security Iran, Uniview bank solutions, banking surveillance, financial security systems, ATM monitoring, vault security, bank CCTV Iran, دوربین مداربسته بانک, سیستم امنیتی بانک, نظارت تصویری بانک',
    openGraph: {
        title: 'Bank Security Solutions by Uniview Iran | راهکارهای امنیتی بانکی یونی ویو ایران',
        description: 'Complete security solutions for Iranian banks including video surveillance, access control, and fraud detection systems. | راهکارهای جامع امنیتی برای بانک‌های ایرانی',
        images: [
            {
                url: '/bank/Bank banner.webp',
                width: 1200,
                height: 630,
                alt: 'Uniview Bank Security Solutions',
            }
        ],
        locale: 'fa_IR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/bank',
    }
}

export default function BankPage() {
    return (
        <>
            <Navbar />
            <Bank />
            <Footer />
        </>
    )
}
