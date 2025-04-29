import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import { FiHome, FiCamera } from 'react-icons/fi';
import Navbar from './Components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col justify-center items-center px-4 py-8">
      <Navbar />
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center mb-4 mt-20">
          <Image 
            src={logo.src}
            alt="Uniview Logo"
            width={100}
            height={100}
            className="w-24 h-24 object-contain transform hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border-t-4 border-blue-600">
          <h1 className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 sm:mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
            Oops! The page you&apos;re looking for seems to have wandered off into the lens. 
            Don&apos;t worry, we&apos;ll help you find your way back.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/" 
              className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                         px-6 py-3 sm:px-7 sm:py-4 rounded-full 
                         hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group shadow-md hover:shadow-lg"
            >
              <FiHome className="mr-2 sm:mr-3 group-hover:animate-bounce" size={20} />
              Go Home
            </Link>
            
            <Link 
              href="/products" 
              className="flex items-center justify-center bg-gray-100 text-gray-700 
                         px-6 py-3 sm:px-7 sm:py-4 rounded-full 
                         hover:bg-gray-200 transition-all duration-300 group shadow-md hover:shadow-lg"
            >
              <FiCamera className="mr-2 sm:mr-3 group-hover:rotate-12" size={20} />
              View Products
            </Link>
          </div>
        </div>
        
        <div className="text-center text-gray-500">
          <p className="text-xs sm:text-sm">
            Need help? <Link href="/contact" className="text-blue-600 hover:underline font-semibold">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 