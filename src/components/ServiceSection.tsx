// app/components/ServiceSection.tsx
const services = [
    {
      id: 1,
      title: 'ให้คำปรึกษา'
    },
    {
      id: 2,
      title: 'ประเมินราคาเบื้องต้นได้ด้วยตนเอง'
    },
    {
      id: 3,
      title: 'ประกอบและติดตั้งงาน'
    },
    {
      id: 4,
      title: 'รับประกัน 1 ปี พร้อมบริการหลังการขาย'
    }
  ];
  
  export function ServiceSection() {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#004D9F] mb-12">
            บริการของเรา
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-[#004D9F] flex items-center justify-center mb-4 transition-transform hover:scale-105 cursor-pointer shadow-lg">
                  <p className="text-white text-center px-4 text-ml font-medium">
                    {service.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }