import React, { useEffect, useState } from 'react';

const UseProductGroup = (ref: any, initialState: any) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.addEventListener('click', pageClickEvent);
    };
  }, [isOpen, ref]);
  return [isOpen, setIsOpen];
};

export default UseProductGroup;
