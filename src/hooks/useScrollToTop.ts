import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook untuk scroll ke top setiap kali route berubah
 * Memastikan user selalu melihat bagian atas halaman saat navigasi
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke top dengan smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
};
