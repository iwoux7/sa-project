// src/components/NotificationFrame.tsx
import Image from 'next/image';
import bellBalck from '@/assets/bellBlack.png';

interface NotificationProps {
  timeAgo: string;
  code: string;
  message: string;
  date: string;
}

export default function NotificationFrame({ timeAgo, code, message, date }: NotificationProps) {
  return (
    <div className="notification-frame">
      <div className="notification-content">
        <div className="notification-time">{timeAgo}</div>
        <div className="notification-main">
          <div className="notification-icon">
            <Image
              src={bellBalck}
              alt="notification"
              width={25}
              height={25}
            />
          </div>
          <div className="notification-details">
            <div className="notification-code">{code}</div>
            <div className="notification-message">{message}</div>
          </div>
          <div className="notification-date">{date}</div>
        </div>
      </div>
    </div>
  );
}