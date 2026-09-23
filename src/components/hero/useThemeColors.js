import { useMemo } from 'react';

// Lê os tokens do design system direto do CSS, para a cena 3D nunca ter
// uma segunda paleta hardcoded que possa divergir do resto do site.
export default function useThemeColors(theme) {
  return useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    const read = (token, fallback) => styles.getPropertyValue(token).trim() || fallback;

    return {
      ink: read('--ink', '#0a0d14'),
      ghost: read('--ink-ghost', '#97a1b1'),
      paper: read('--paper', '#f1f4fa'),
    };
    // theme não aparece no corpo, mas é ele que troca os tokens no <html>:
    // sem essa dependência a cena ficaria com a paleta do tema anterior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
}
