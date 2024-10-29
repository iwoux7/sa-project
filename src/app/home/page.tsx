// src/app/home/page.tsx
"use client";
import { Navbar } from '@/layouts/Navbar';
import { Footer} from '@/layouts/Footer';
import Image from 'next/image';
import solar from '@/assets/solar.jpg';
import { ProductSection } from '@/components/ProductSection';
import { ServiceSection } from '@/components/ServiceSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Added wrapper div with min-h-screen */}
      <Navbar />
      <main className="flex-grow"> {/* Added flex-grow to push footer to bottom */}
        {/* Hero Section */}
        
        <section className="hero-section">
        <div className="hero-background ">
          <Image
            src={solar}
            alt="Solar Panels"
            className="w-full h-full object-cover"
          />
        </div>
        
        
        <div className="hero-content">
          <h1 className="hero-title">Tech Lifestyle</h1>
          <p className="hero-subtitle">ให้บริการประกอบและติดตั้งโซลาร์ไฟฟ้า โซลาเซลล์ และแบตเตอรี่</p>
          
          <div className="hero-buttons">
            <a href="/contact">
              <button className="buttonemerald">
                <b>ติดต่อเรา</b>
              </button>
            </a>
            <a href="/service">
              <button className="buttonyellow">
                <b>ทดลองประเมินราคาเบื้องต้น</b>
              </button>
            </a>
          </div>
        </div>
      </section>


        {/* Products Section */}

          <ProductSection />

          <ServiceSection />

        

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;