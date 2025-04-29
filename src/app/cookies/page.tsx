import Cookies from "./cookies";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cookie Policy | سیاست کوکی - Uniview Iran',
    description: 'Learn about Uniview Iran\'s cookie policy and how we use cookies to enhance your security solutions browsing experience. | سیاست کوکی یونی ویو ایران و نحوه استفاده از کوکی ها برای بهبود تجربه کاربری',
    keywords: 'cookie policy uniview iran, website cookies, privacy policy, security solutions cookies, دوربین مداربسته, کوکی های وب سایت, حریم خصوصی',
    openGraph: {
        title: 'Cookie Policy | سیاست کوکی - Uniview Iran',
        description: 'Understanding how Uniview Iran uses cookies to enhance your security solutions experience.',
        url: 'https://www.uniview-iran.ir/cookies',
        type: 'website',
        locale: 'fa_IR',
    },
    alternates: {
        canonical: 'https://www.uniview-iran.ir/cookies',
        languages: {
            'en-US': '/en/cookies',
            'fa-IR': '/fa/cookies',
        }
    }
}

export default function CookiesPage() {
    return (
        <>
            <Navbar />
            <Cookies />
            <Footer />
        </>
    )
}
