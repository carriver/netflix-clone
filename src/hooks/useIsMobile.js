import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH_PX = 700;

const isMobileWidth = () => window.innerWidth < MOBILE_MAX_WIDTH_PX;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(isMobileWidth);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(isMobileWidth());
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  return isMobile;
}
