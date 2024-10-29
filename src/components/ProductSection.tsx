// app/components/ProductSection.tsx
import Image from 'next/image';
import meterTou from '@/assets/meter_tou.jpg';
import solar from '@/assets/solar2.jpg';
import battery from '@/assets/battery.png';

const products = [
  {
    id: 1,
    name: 'มิเตอร์ไฟฟ้าแบบ TOU (Time of Use)',
    description: 'อัตราค่าไฟฟ้า TOU หรือ อัตราค่าไฟฟ้าตามช่วงเวลาของการใช้งาน (Time of Use) แบ่งเป็น 2 ช่วงเวลา คือ On - Peak (วันจันทร์ - ศุกร์ เวลา 9:00 - 22:00) และ Off-Peak (วันจันทร์ - ศุกร์ เวลา 22:00 - 9:00 และวันเสาร์ - อาทิตย์ เวลา 00:00 - 24:00)',
    image: meterTou,
    // buttonText: 'มิเตอร์ไฟฟ้าแบบบ้านกับมิเตอร์ไฟฟ้าแบบ TOU ต่างกันอย่างไร? >>',
  },
  {
    id: 2,
    name: 'โซลาร์เซลล์ (Solar Cell)',
    description: 'โซลาร์เซลล์ เป็นอุปกรณ์อิเล็กทรอนิกส์ที่เปลี่ยนพลังงานจากแสงอาทิตย์ให้เป็นพลังงานไฟฟ้า ซึ่งสามารถนำไปใช้งานได้ทันที ช่วยให้เราสามารถใช้พลังงานแสงอาทิตย์ที่มีอยู่อย่างไม่จำกัดมาเป็นแหล่งพลังงานไฟฟ้าในการใช้งานต่าง ๆ ได้อย่างมีประสิทธิภาพ',
    image: solar,
  },
  {
    id: 3,
    name: 'แบตเตอรี่ (Battery)',
    description: 'แบตเตอรี่ คือ อุปกรณ์ที่เก็บพลังงานเพื่อไว้ใช้และแปลงพลังงานเคมีเป็นไฟฟ้า สามารถชาร์จและใช้งานซ้ำได้หลายครั้ง แต่ประสิทธิภาพจะอยู่ที่ประมาณ 80% เนื่องจากพลังงานบางส่วนสูญเสียไปในรูปของความร้อนและปฏิกิริยาเคมี แบตเตอรี่มักมีราคาแพงและอายุการใช้งานขึ้นอยู่กับการใช้งานและการบำรุงรักษา',
    image: battery,
  },
];

export function ProductSection() {
  return (
    <section className="product-section pt-24">
      <h2 className="product-title">ผลิตภัณฑ์ของเรา</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <Image
                src={product.image}
                alt={product.name}
                className="product-image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              {/* {product.buttonText && (
                <a href="#" className="product-button">
                  {product.buttonText}
                </a>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}