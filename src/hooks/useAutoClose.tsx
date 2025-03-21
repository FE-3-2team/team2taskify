import { useState, useEffect, useRef } from "react";

export function useAutoClose(initialState: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return { ref, isOpen, setIsOpen };
}
