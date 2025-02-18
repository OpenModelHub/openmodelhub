import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="bg-[#E8EEF1] text-black px-4 py-1 rounded-md hover:bg-[#dadfe1] active:bg-[#ccd4d7]">
      {label}
    </button>
  );
};

export default Button;