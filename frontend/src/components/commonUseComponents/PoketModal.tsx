import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 타입스크립트 타입 프롭받을 타입 정의
interface CartItem {
  title: string;
  price: number; // Assuming price is a number and not a formatted string
}

// Define the props for PoketModal
interface PoketModalProps {
  cartItems: CartItem[];
}

const PoketModal: React.FC<PoketModalProps> = ({ cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Shopping Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-30 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center" // Ensure the button is a flex container
        style={{ width: '4rem', height: '4rem' }} // Set a fixed width and height for the button
      >
        <img src='/ProfileIcon.png' className="w-6 h-6" /> {/* Control the size of the image with width and height classes */}
      </button>

      {/* Shopping Cart Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed bottom-8 right-8 z-20 w-64 p-6 bg-white rounded-lg shadow-xl"
        >
          <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
          <ul className="divide-y divide-gray-200 overflow-y-auto" style={{ maxHeight: '60vh' }}>
            {cartItems.map((item: string, index: number) => (
              <li key={index} className="py-4 flex justify-between items-center">
                <span className="text-sm">{item.title}</span>
                <span className="font-bold">{`₩ ${item.price.toLocaleString()}`}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default PoketModal;