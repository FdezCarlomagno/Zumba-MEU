'use client';

import Image from "next/image";
import WhatsappLogo from '../public/logos/Whatsapp.svg'
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '61432050042';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        <div
          className={`absolute inset-0 bg-green-400 rounded-full blur-xl transition-all duration-500 ${
            isHovered ? 'opacity-75 scale-110' : 'opacity-0 scale-100'
          }`}
        />

        <div
          className={`relative flex items-center bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-lg transition-all duration-300 ${
            isHovered ? 'pr-5 pl-4 py-3 gap-3' : 'p-4 '
          }`}
        >
          <div
            className={`transition-transform duration-300 ${
              isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
            }`}
          >
            <Image src={WhatsappLogo} alt="Whatsapp Logo" width={28} height={28} />
          </div>

          <span
            className={`font-medium text-sm sm:text-base whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isHovered ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            Chat with me!
          </span>
        </div>

        <div
          className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full transition-all duration-300 ${
            isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100 animate-ping'
          }`}
        />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
      </div>
    </a>
  );
}