import useReveal from '../hooks/useReveal';

// Revela um título/parágrafo palavra por palavra conforme entra na tela.
// Cada palavra fica numa máscara (overflow hidden) e sobe de baixo pra cima
// com um pequeno atraso escalonado — some por completo com reduced-motion.
export default function RevealText({ text, as: Tag = 'span', className = '', staggerMs = 28 }) {
  const [ref, isVisible] = useReveal();
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={`reveal-text ${className}`}>
      {words.map((word, index) => (
        <span className="reveal-word-mask" key={`${word}-${index}`}>
          <span
            className={`reveal-word ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${index * staggerMs}ms` }}
          >
            {word}
          </span>
        </span>
      )).reduce((acc, el, index) => {
        if (index === 0) return [el];
        return [...acc, ' ', el];
      }, [])}
    </Tag>
  );
}
