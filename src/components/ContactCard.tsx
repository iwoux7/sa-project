// src/components/ContactCard.tsx
import React, { useState } from 'react';
import phone from '@/assets/phoneBlack.png';
import letter from '@/assets/envelopeBlack.png';
import pin from '@/assets/locationBlack.png';
import Image from 'next/image';
import { Modal } from './Modal';

const ContactCard = () => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleFirstConfirm = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  return (
    <>
      <div className="business-card">
        <h2 className="company-name">Tech Lifestyle</h2>
        <div className="contact-info">
          <div className="contact-item-card">
            <Image
              src={phone}
              alt='phone'
              width={25}
              height={25}
            />
            098-943-2278 หรือ 065-621-7887
          </div>
          <div className="contact-item-card">
            <Image
              src={letter}
              alt='letter'
              width={25}
              height={25}
            />
            msnntb@gmail.com
          </div>
          <div className="contact-item-card">
            <Image
              src={pin}
              alt='location'
              width={25}
              height={25}
            />
            248 ซ.พิบูลสงคราม 22 แยก 11/2
            <br />ตำบลบางเขน อำเภอเมือง นนทบุรี
            <br />11000
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;