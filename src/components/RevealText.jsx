import { createElement } from 'react';
import useReveal from '../hooks/useReveal';

// Revela um título/parágrafo palavra por palavra conforme entra na tela.
// Cada palavra fica numa máscara (overflow hidden) e sobe de baixo pra cima
// com um pequeno atraso escalonado — some por completo com reduced-motion.
export default function RevealText({ text, as: Element = 'span', className = '', staggerMs = 28 }) {
  const [ref, isVisible] = useReveal();
  const words = text.split(' ');
  const children = words.map((word, index) => (
    <span className="reveal-word-mask" key={`${word}-${index}`}>
      <span
        className={`reveal-word ${isVisible ? 'is-visible' : ''}`}
        style={{ transitionDelay: `${index * staggerMs}ms` }}
      >
        {word}
      </span>
    </span>
  )).reduce((acc, element, index) => {
    if (index === 0) return [element];
    return [...acc, ' ', element];
  }, []);

  return createElement(Element, { ref, className: `reveal-text ${className}` }, children);
}
