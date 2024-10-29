// app/layouts/Footer.tsx
// import Image from 'next/image';
// import Link from 'next/link';
// import logo from '@/assets/logo.png';
// import phone from '@/assets/phone.png';
// import letter from '@/assets/envelope.png';
// import pin from '@/assets/location.png'
// export function Footer() {
//   return (
//     <footer className="bg-[#004D9F] text-white py-12">
//       <div className="max-w-4xl mx-auto px-6">
//         {/* Top Section with Logo */}
//         <div className="mb-12">
//           <Image 
//             src={logo}
//             alt="Tech Lifestyle"
//             width={150}
//             height={150}
//             className="mb-8"
//           />
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Left Column - Contact Info */}
//           <div className="space-y-6">
//             <h3 className="text-2xl font-semibold mb-6">Tech Lifestyle</h3>
            
//             <div className="space-y-4">
//               {/* Phone */}
//               <div className="flex items-start gap-3">
//                 <Image
//                   src={phone}
//                   alt='phone'
//                   width={25}
//                   height={25}
//                 />
//                 <span>098-943-2278 หรือ 065-621-7887</span>
//               </div>
              
//               {/* Email */}
//               <div className="flex items-start gap-3">
//               <Image
//                   src={letter}
//                   alt='letter'
//                   width={25}
//                   height={25}
                
//                 />
//                 <span>msnntb@gmail.com</span>
//               </div>
              
//               {/* Address */}
//               <div className="flex items-start gap-3">
//               <Image
//                   src={pin}
//                   alt='pin'
//                   width={25}
//                   height={25}
//                 />
//                 <span>248 ซ.พิบูลสงคราม 22 แยก 11/2 ตำบลบางเขน อำเภอเมือง จังหวัดนนทบุรี 11000</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Menu */}
//           <div>
//             <h3 className="text-xl font-semibold mb-6">เมนู</h3>
//             <ul className="space-y-3">
//               <li className="hover:translate-x-2 transition-transform">
//                 <Link href="/home" className="block">หน้าหลัก</Link>
//               </li>
//               <li className="hover:translate-x-2 transition-transform">
//                 <Link href="/about" className="block">เกี่ยวกับเรา</Link>
//               </li>
//               <li className="hover:translate-x-2 transition-transform">
//                 <Link href="/service" className="block">บริการของเรา</Link>
//               </li>
//               <li className="hover:translate-x-2 transition-transform">
//                 <Link href="/contact" className="block">ติดต่อเรา</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
// src/layouts/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';
import phone from '@/assets/phone.png';
import letter from '@/assets/envelope.png';
import pin from '@/assets/location.png'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Image 
            src={logo}
            alt="Tech Lifestyle Logo"
          />
        </div>
        
        <div className="footer-contact">
          <h2>Tech Lifestyle</h2>
          <div className="contact-item">
          <Image
              src={phone}
              alt='phone'
              width={25}
              height={25}
            />
            098-943-2278 หรือ 065-621-7887
          </div>
          <div className="contact-item">
          <Image
              src={letter}
              alt='letter'
              width={25}
              height={25}
            
            />
            msnntb@gmail.com
          </div>
          <div className="contact-item">
          <Image
                src={pin}
                alt='pin'
                width={25}
                height={25}
              />
            248 ซ.พิบูลสงคราม 22 แขก 11/2
            <br />
            ตำบลบางเขน อำเภอเมือง นนทบุรี
            <br />
            11000
          </div>
        </div>

        <div className="footer-links">
          <p style={{fontWeight: 'bold', fontSize: '1.5rem'}}>เมนู</p>
          <Link href="/home" className="footer-link">หน้าหลัก</Link>
          <Link href="/about" className="footer-link">เกี่ยวกับเรา</Link>
          <Link href="/service" className="footer-link">บริการของเรา</Link>
          <Link href="/contact" className="footer-link">ติดต่อเรา</Link>
        </div>
      </div>
    </footer>
  );
}