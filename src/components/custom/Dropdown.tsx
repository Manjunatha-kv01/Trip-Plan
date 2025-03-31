import React from "react";

const Dropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
      {children}
    </div>
  );
};

export default Dropdown;
