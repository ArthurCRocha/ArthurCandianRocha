# Phase 02 — Origin

A Intro aprovada permanece como fundação. Foram alterados o tempo de entrada,
a textura de papel e a passagem de scroll; nenhum redesenho do Hero ou capítulo
posterior foi realizado. A página termina após Origin, aguardando revisão visual.

## Narrativa

Quatro composições contínuas, sem cards ou timeline:

1. **Começou com código.** O ponto de partida acadêmico em 2020 acompanha o
   primeiro título, deslocado à direita e abaixo. A tinta abre espaço para papel.
2. **Design entrou no caminho.** Prática em comunicação institucional, apoiada
   por duas frases e uma observação sobre a experiência audiovisual anterior.
3. **Design não substituiu o código. Mudou como eu construo.** Duas afirmações
   separadas por espaço, preto/vermelho e uma pequena conexão tipográfica.
4. **Construir com os dois.** Desenvolvimento profissional e continuidade da
   formação. A linha orgânica se torna mais precisa; guias verticais e metadados
   encerram a composição. Nenhum conteúdo ou rótulo de Craft é montado.

## Dados e nuances do brief

`src/data/originData.js` referencia registros existentes de `portfolioData.js`;
não altera nem replica seus objetos factuais:

- Ciência da Computação no IF Sudeste MG: início em janeiro de 2020,
  saída da instituição em **2026**, sem mês confirmado para a saída.
- Design na comunicação do IF Sudeste MG: março de 2023 a março de 2025.
  Redes sociais, documentos e campanhas têm suporte nas responsabilidades.
- Metryx Tecnologia: estágio em desenvolvimento, novembro de 2024 a fevereiro
  de 2025, utilizado como evidência de continuidade profissional.
- Análise e Desenvolvimento de Sistemas na Univiçosa: início em **2026**,
  em andamento. A confirmação mais recente do usuário prevalece sobre os dados
  anteriores do repositório. Nenhum mês foi confirmado ou acrescentado.
- Cineclube: experiência de imagem e edição em **2017–2018**. Por anteceder
  a computação, aparece como uma observação curta. “Começou com código” é
  contextualizado pelo percurso acadêmico, sem afirmar que todo trabalho
  criativo começou em 2020 ou que design só surgiu em 2023.

Os textos narrativos PT/EN vivem em `translations.origin`; instituição, curso,
função, período e status continuam vindo dos dados. Campos já traduzidos são
obtidos pelo helper `field` do sistema existente. O passe factual atualizou os
registros acadêmicos e o texto Sobre em PT/EN, sem alterar Hero, Origin,
animações, imagens, dependências ou configurações de deploy.

## Entrada e papel

As máscaras de tipografia começam em 140 ms e terminam aproximadamente em
1,12 s; vermelho entra a partir de 240 ms, tinta a partir de 380 ms. O conjunto
termina de se acomodar aproximadamente em 1,93 s. Não há loader.

A revelação dos metadados atua em elementos internos; a transição atua nos
invólucros externos. Essa separação evita conflito de opacity ao voltar no scroll,
trocar idioma ou ativar movimento reduzido.

As duas camadas SVG de papel agora cobrem a viewport sem repetição. Frequências
e campos maiores retiram o padrão de azulejos; opacidades permanecem 0,018 e
0,03. Os filtros continuam estáticos e não são recalculados com ruído animado.

## Scroll e WebGL

`IntroOrigin.jsx` coordena uma timeline com ScrollTrigger e refs compartilhadas.
O Hero fica fixado apenas durante uma passagem de 1,2 vezes sua altura no desktop
ou 0,8 no mobile. Scroll nativo, sem interceptação de wheel/touch e sem smooth
scroll externo. Origin sobrepõe a última viewport da passagem: o título nasce
enquanto sol e tinta deixam o campo, sem uma borda entre capítulos.

Nome move e amplia suas duas linhas independentemente; metadados desaparecem.
O sol cresce até 2,2 vezes e se retira. A tinta avança por deslocamento de câmera
e malha em Z, com relevo por fibra. A câmera vai de Z=5 até 2,9 no desktop ou
3,85 no mobile; o material mantém pigmento fosco. A passagem deixa papel e
vermelho visíveis, sem uma tela inteiramente preta.

Um único canvas cobre a Intro inteira. `camera.setViewOffset` mantém exatamente
o campo de projeção da área gráfica original e amplia o frustum para a viewport;
o canvas permanece imóvel, evitando recortes retangulares dentro da página.
O enquadramento acompanha resize via ResizeObserver, com limpeza dos observers.

Há quatro ScrollTriggers: passagem, duas máscaras editoriais e entrada das guias.
As demais informações existem no fluxo sem animação individual. `matchMedia`
reverte e recria os triggers em alterações de tamanho/preferência; a troca de
idioma atualiza suas medidas. Fontes e load também provocam refresh. Todas as
timelines/listeners são removidas pelo contexto GSAP no unmount.
`overflow-anchor: none` no fluxo narrativo evita que o navegador desloque a
posição restaurada durante a construção dos spacers e a chegada das fontes.
O scroll e sua restauração continuam nativos; não há gravação manual de posições.

O conteúdo de entrada usa opacity e clipping sem `visibility: hidden`, mantendo
o título e os fatos disponíveis a leitores de tela antes da revelação visual.

## Mobile, fallback e movimento reduzido

Mobile mantém o Hero aprovado e organiza Origin em uma coluna com escala
editorial. Menor deslocamento de câmera; sem deformação ociosa ou parallax de
ponteiro. Canvas em `frameloop="demand"`, invalidado pela progressão de scroll.
Essa economia também se aplica a dispositivos de toque em paisagem e tablets;
o perfil de movimento considera ponteiro coarse, além da largura.

Desktop pausa fora da viewport ou com a aba oculta. R3F continua responsável
pelo descarte da geometria/material; perda de contexto entrega o gesto SVG.
O SVG compartilha a trajetória, com uma transição plana simplificada. Toda a
narrativa permanece em HTML e pode ser entendida sem WebGL.

Movimento reduzido remove o pinning, as máscaras e a passagem abstrata. Os dois
capítulos seguem no fluxo normal. A cena retorna à pose inicial estática mesmo
se a preferência for ativada durante a aproximação.

## Arquivos deste passe

- `src/App.jsx`, `App.css`: Origin entra no fluxo; removido o intervalo provisório.
- `src/components/origin/IntroOrigin.jsx`: coordenação da passagem e dos triggers.
- `src/components/origin/Origin.jsx`, `Origin.css`: narrativa, linha, estrutura
  progressiva e composição responsiva.
- `src/data/originData.js`, `translations.js`: seleção factual e textos PT/EN.
- `src/components/hero/Hero.jsx`, `Hero.css`: entrada mais rápida, enquadramento
  do canvas completo e separação das camadas de animação de metadados.
- `src/components/hero/HeroScene.jsx`, `InkStroke.jsx`: frustum, viagem em Z,
  rendering sob demanda no mobile e restauração da pose com movimento reduzido.
- `src/index.css`, `src/assets/paper-wash.svg`, `paper-grain.svg`: papel sem tiles.
- `README.md`, este relatório e `docs/previews/phase-02/`: registro e evidências.

## Validação

Build de produção, ESLint e `git diff --check`. Chrome headless em desktop,
notebook, tablets, mobile, paisagem e PT/EN, incluindo o bundle de produção.
Verificação de primeira carga, scroll nativo, passagem, retorno ao Hero, recarga
durante a leitura, troca/persistência de idioma, texto dentro da viewport,
movimento reduzido, modo sem WebGL e descarte após perda real de contexto.

Uma geometria, um programa, zero texturas WebGL e um draw call de 16.600
triângulos. DPR máximo permanece 1,5 no desktop e 1 no mobile. O chunk WebGL
continua lazy, aproximadamente 248 kB gzip, sem regressão relevante. O canvas
completo usa mais área de rasterização que a antiga área gráfica; os filtros de
papel também cobrem campos maiores, embora sejam estáticos. Não há segundo
canvas nem texturas GPU adicionais.

Limites: verificação em Chrome headless, sem aparelhos físicos, Safari ou
Lighthouse. Fontes continuam externas. Permanecem os avisos conhecidos de
tamanho do chunk, `THREE.Clock` interno do R3F e idade de baseline-browser-mapping.
O fallback representa o gesto sem a perspectiva e o descarte granular do shader.

Capturas: [passagem desktop](previews/phase-02/desktop-bridge.png),
[entrada de Origin](previews/phase-02/desktop-entry.png),
[momento tipográfico](previews/phase-02/desktop-convergence.png),
[mobile](previews/phase-02/mobile-convergence.png).
Resultados: [validação estrutural e de movimento](previews/phase-02/validation.json).
O passe factual posterior foi verificado em PT/EN no bundle de produção,
em desktop e mobile: [validação factual](previews/phase-02/factual-validation.json).
Os snapshots de texto acadêmico do relatório anterior foram atualizados; suas
medições de layout/movimento e as capturas acima pertencem à validação anterior.
