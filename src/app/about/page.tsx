"use client";
import { Navbar } from '@/layouts/Navbar';
import { Footer } from '@/layouts/Footer';
import Image from 'next/image';
import solar from '@/assets/solar.jpg';

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-background">
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
                                <button className="hero-button-primary">
                                    <b>ติดต่อเรา</b>
                                </button>
                            </a>
                            <a href="/service">
                                <button className="hero-button-secondary">
                                    <b>ทดลองประเมินราคาเบื้องต้น</b>
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                <div className="about-container">
                    <div className="about-content">
                        <p className="about-text">
                            เราคือผู้เชี่ยวชาญในการประกอบและติดตั้งเซลล์พลังงานโซลาร์เซลล์ และแบตเตอรี่รับรองว่า
                            <br />
                            เพื่อช่วยลดค่าไฟฟ้าภายในครัวเรือนของทุกบ้านอย่างคุ้มค่าและยั่งยืนและสามารถเปลี่ยนพลังงานแสงอาทิตย์เป็นการประหยัดที่คืนทุนได้
                            <br />
                            พร้อมสร้างอนาคตที่ดีกว่าด้วยเทคโนโลยีที่คุณวางใจได้
                        </p>
                    </div>
                </div>

                <section className="location-section">
                    <div className="location-container">
                        <h2 className="location-title">ตำแหน่งที่ตั้ง</h2>
                        <div className="map-container">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8876037839646!2d100.6238083!3d13.7420416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61e2e62e1563%3A0x1d5c9f71108f175b!2s248%20%E0%B8%8B.%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%2022%20%E0%B9%81%E0%B8%A2%E0%B8%81%2011%2F2!5e0!3m2!1sth!2sth!4v1698507234086!5m2!1sth!2sth&markers=color:red%7C13.7420416,100.6238083"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-[400px] rounded-lg shadow-lg"
                            />
                        </div>
                        <p className="address-text text-center mt-4 text-gray-700">
                            248 ซ.พิบูลสงคราม 22 แยก 11/2 ตำบลบางเขน อำเภอเมือง จังหวัดนนทบุรี 11000
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}