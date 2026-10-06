# Phase 01 — refinamento de arte

A estrutura aprovada permanece: navegação mínima, Intro e intervalo vazio de
papel. Este passe termina na Intro; nenhuma seção ou conteúdo da Phase 02 foi
adicionado. Dados, dependências, assets existentes e configuração de publicação
permanecem preservados.

## Composição e materialidade

O campo vermelho entra na área do nome, enquanto a ponta seca da tinta passa
atrás do último A. Uma reserva fina de papel nos contornos preserva a leitura.
A tinta foi ampliada horizontalmente no desktop e continua além da borda direita,
com `overflow: clip`. Sua altura evita invadir a faixa inferior de metadados.
O texto conceitual foi deslocado para manter distância da tinta.

O sol usa um SVG determinístico: contorno com variação inferior a um pixel nas
dimensões usuais, pigmento em duas frequências e mistura soft-light muito leve.
Não há gradiente radial, imagem pesada ou textura animada. O papel combina
lavagem de baixa frequência com grão e fibras discretos em dois pequenos SVGs
repetidos. Nenhum bitmap ou nova dependência foi acrescentado.

O contato duplicado foi retirado do rodapé da Intro; o email permanece na
navegação. O marcador lateral redundante CODE × DESIGN foi removido. GitHub,
localização e indicação de continuação permanecem.

## Geometria, shader e movimento

As 83 fibras continuam compondo um único gesto e uma única malha. A geometria
agora distribui fibras em profundidade, com atributo por fibra e dois componentes
de relevo. O vertex shader adiciona deformação lenta, deslocamento relativo das
fibras pelo ponteiro e aproximação no scroll. A densidade do pigmento varia
ligeiramente com a elevação; o material permanece fosco, sem luz especular.
O fallback SVG utiliza a mesma trajetória determinística, sem a profundidade
ou o descarte granular do shader.

A revelação inicial usa máscaras de nome, sol e tinta em 1,45–1,8 s, seguida
pela presença gradual dos metadados. Ponteiro e câmera convergem lentamente;
no limite horizontal do teste, a camada de tinta moveu 3,94 px, o sol 1,58 px
e o nome 0,54 px. A câmera e as fibras acrescentam perspectiva discreta.

No primeiro scroll, ARTHUR e ROCHA derivam em sentidos opostos, o sol cresce
até 6% e a tinta se aproxima da câmera. O intervalo final limita naturalmente
o progresso atual. Não existe sequência fixada, Origin ou transição de capítulo.
`prefers-reduced-motion` desativa a coreografia e mantém renderização sob demanda.

## Responsividade

Desktop recebe expansão horizontal e sobreposição controlada. Notebooks de
menor altura têm tamanho limitado pela viewport. Tablets mantêm proporções
próprias. Mobile preserva gráfico acima/atrás, nome grande, informação profissional,
statement e localização/continuação, sem resposta ao ponteiro. A qualidade do
pigmento e o relevo da tinta são compartilhados entre os formatos.

## Validação e desempenho

- `npm run build`, `npx eslint .` e `git diff --check`: concluídos sem erros.
- Chrome headless em desenvolvimento e no bundle de produção; desktop 1440×900
  e 1920×1080, notebook 1366×768, tablets 768×1024 e 1024×768, mobile 390×844
  e 320×740, paisagem 844×390.
- Sem rolagem horizontal, erros de runtime, âncoras quebradas ou interface antiga.
  PT/EN e persistência após recarga, skip link e movimento reduzido verificados.
- Cena: uma geometria, um programa, zero texturas WebGL, um draw call e 16.600
  triângulos por quadro. DPR continua limitado a 1,5 no desktop e 1 no mobile.
- Medição local: 120 renderizações em aproximadamente dois segundos no Chrome
  headless. É uma amostra do ambiente local, não uma garantia de FPS em aparelhos.
- Contadores de renderização e estado de câmera/uniformes confirmaram pausa fora
  da viewport e cena estática com movimento reduzido. A retomada foi verificada.
- Perda real de contexto com `WEBGL_lose_context`: fallback visível, canvas removido,
  um descarte de geometria e um de material, zero geometrias e nenhuma raiz R3F
  restante. Nenhum novo quadro após o descarte. SVG sem WebGL também verificado.

O chunk WebGL continua lazy, aproximadamente 926,54 kB minificado / 248,14 kB
gzip. Vite mantém o aviso acima de 500 kB; R3F mantém o aviso interno de
`THREE.Clock`, e ESLint informa a idade de `baseline-browser-mapping`.
Nenhum aviso foi ocultado. Fontes externas e custo de composição dos filtros
SVG continuam presentes; os filtros são estáticos, sem recálculo por ruído animado.
Não foram realizados Lighthouse nem testes em aparelhos físicos.

## Arquivos deste passe

- `src/components/hero/Hero.jsx`, `Hero.css`: composição, camadas, máscaras,
  ponteiro, scroll e limpeza da microinterface.
- `src/components/hero/PigmentSun.jsx`: pigmento e contorno do sol.
- `src/components/hero/inkGeometry.js`, `InkStroke.jsx`, `HeroScene.jsx`:
  profundidade, atributo por fibra, shader e perspectiva.
- `src/index.css`, `src/assets/paper-wash.svg`, `paper-grain.svg`: papel multiescala.
- `README.md`, relatórios e `docs/previews/`: registro e evidências atualizados.

Capturas completas: [desktop](previews/intro-desktop.png),
[mobile](previews/intro-mobile.png),
[mobile sem WebGL](previews/intro-mobile-svg.png).
Resultados: [layouts](previews/layout-validation.json) e
[interação e descarte](previews/spatial-validation.json).
