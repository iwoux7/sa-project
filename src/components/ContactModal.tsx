// src/components/ContactModal.tsx
import React from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  showButtons?: boolean;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

export function ContactModal({ 
  isOpen, 
  onClose, 
  title,
  showButtons = true,
  onConfirm,
  children 
}: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '600px',
        textAlign: 'center',
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#004D9F'
          
        }}>
          {title}
        </h3>
        
        {children}

        {showButtons ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '1.5rem'
          }}>
            <button 
              onClick={onClose}
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              ยกเลิก
            </button>
            <button 
              onClick={onConfirm}
              style={{
                padding: '8px 24px',
                backgroundColor: '#34BE82',
                color: 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ยืนยัน
            </button>
          </div>
        ) : (
          <button 
            onClick={onClose}
            style={{
              padding: '8px 24px',
              backgroundColor: '#34BE82',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1.5rem'
            }}
          >
            ตกลง
          </button>
        )}
      </div>
    </div>
  );
}