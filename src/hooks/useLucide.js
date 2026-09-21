import { useEffect } from 'react';
import { createIcons, icons } from 'lucide-react';

// Note: With React we prefer <Icon /> components from lucide-react.
// This hook is for any dynamically injected HTML using data-lucide.
export function useLucide() {
  useEffect(() => {
    // no-op placeholder: real icons are rendered as React components
  }, []);
}

export { icons };