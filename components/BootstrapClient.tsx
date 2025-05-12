'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // Import Bootstrap JS on the client side only
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .catch(err => console.error('Error loading Bootstrap JS:', err));
  }, []);
  
  return null;
}
