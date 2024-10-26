// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
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
        maxWidth: '500px',
        textAlign: 'center',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
      }}>
        {children}
        <button 
          onClick={() => {
            onClose(); // Close modal
            window.location.href = '/login'; // Redirect to login page
          }}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 2rem',
            backgroundColor: '#34BE82',
            color: 'black',
            border: '0.5px solid #000000', // Black border stroke
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ตกลง
        </button>
      </div>
    </div>
  );
}
