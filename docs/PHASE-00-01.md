# Phase 00 + Phase 01 — estado após a correção

Registro da correção estrutural. O passe visual seguinte e suas medições estão
em [Phase 01 — refinamento](PHASE-01-REFINEMENT.md); as capturas abaixo mostram
a versão refinada atual.

A página ativa contém **navegação mínima + Intro/Hero + intervalo vazio de papel**.
Nenhuma seção do portfólio anterior é montada. Origin e os demais capítulos
não foram implementados; a Intro aguarda aprovação visual.

## Fundação preservada

React 19.2 + JavaScript/JSX + Vite 7.2.4, GSAP, React Three Fiber e Three.js.
Nenhuma nova dependência adicionada ao projeto. Configurações de Netlify,
Docker, scripts npm e lockfile preservados.

Dados factuais continuam integralmente em `src/data/portfolioData.js`:
identidade, localização, contatos e redes sociais, tecnologias, projetos,
experiências profissionais, formação, certificados, reconhecimentos e serviços.
As traduções anteriores permanecem em `src/data/translations.js`. Imagens e PDF
continuam nos diretórios originais. Nenhum fato foi reescrito para adaptar o layout.

O projeto foi posteriormente corrigido para **Prodiesel — App para Transportadores de Leite**
no [passe factual de Selected Work](PHASE-04-FACTUAL-CORRECTION.md). A formação na
**Univiçosa começou em 2026**, conforme a confirmação posterior do usuário
no passe factual da Phase 02; nenhum mês foi confirmado.

## Renderização e CSS

`App.jsx` importa apenas dados pessoais/contato, contexto de idioma, Nav e Hero.
O main contém a Intro e um intervalo decorativo vazio de papel. A navegação
apresenta AR / 26, PT/EN e contato por email. Não existe índice, menu futuro,
ponte para conteúdo anterior ou footer separado.

Fora do fluxo de renderização: Marquee, About, Skills, Portfolio, Experience,
Services, Certificates, Awards, Contact, Footer e Lightbox. Seus arquivos,
RevealText e hooks de revelação antigos continuam no repositório para referência.
Nenhum módulo da árvore ativa importa esses componentes.

O antigo `App.css` foi arquivado em `src/legacy/portfolio.css`; tokens auxiliares
anteriores estão em `src/legacy/tokens.css`. Nenhum dos dois é importado.
O novo `App.css` cuida apenas do invólucro e intervalo final. Os tokens ativos
contêm somente a fundação usada pela nova Intro; regras de cards, sections,
marquee, galerias, footer, menus e progresso não entram no CSS servido.

## Direção do Hero

Papel quente `#EEEAE1`, tinta `#171714`, vermelho `#B82025`. Instrument Serif
constrói o nome; DM Sans e JetBrains Mono dão suporte. A composição usa
assimetria, espaço vazio, disco vermelho e um único gesto de tinta com 83 fibras.
A influência japonesa está na composição e materialidade, sem símbolos decorativos.

A cena WebGL é carregada separadamente; um SVG gerado da mesma geometria
preserva a composição sem GPU. DPR limitado, rendering suspenso fora da viewport
ou com aba oculta, materiais/renderer sob o ciclo de descarte do R3F. Câmera e
ponteiro têm resposta discreta; máscaras fazem a revelação inicial. Scroll nativo,
sem pinning. Mobile tem composição própria. Movimento reduzido desativa a
coreografia e mantém a cena estática.

A revisão visual considerou leitura do nome, distância entre tinta e textos,
espaço vazio, contraste, composição móvel e comportamento sem WebGL. A abertura
agora funciona como pôster editorial completo, encerrando em papel vazio.
O marcador “Continua” é discreto e não funciona como botão ou âncora.

## Arquivos da correção

- `src/App.jsx`, `src/App.css`: retirados imports e renderização da interface antiga.
- `src/components/Nav.jsx`, `Nav.css`: removido o índice; navegação mínima.
- `src/components/hero/Hero.jsx`, `Hero.css`: removida a âncora antiga e seu hover.
- `src/styles/tokens.css`: somente tokens da fundação ativa.
- `src/index.css`: suporte global a movimento reduzido independente do CSS antigo.
- `src/data/translations.js`: “Continua”, skip link e rótulo da nova navegação.
- `src/legacy/portfolio.css`, `tokens.css`: referências isoladas, nunca importadas.
- `README.md`, este relatório e `docs/previews/`: documentação e capturas atualizadas.

## Validação da correção

- `npm run build`, `npx eslint .`, `git diff --check` executados com sucesso.
- Chrome headless: desktop 1440×900, notebook 1366×768, tablet 768×1024 e
  1024×768, mobile 390×844 e 320×740, paisagem 844×390 e bundle de produção.
- Página inteira revisada, incluindo o final; sem extravasamento horizontal.
- Nenhum elemento de seção/card/galeria/footer/nav anterior na árvore DOM.
- Nenhum `#existing-content`, nenhum diálogo de índice e nenhuma âncora quebrada.
- Nenhum request de imagem de projeto/certificado da interface antiga.
- CSS servido sem seletores de cards, marquee, formação ou menu antigo.
- PT/EN, persistência de idioma, skip link e cena estática com movimento reduzido.
- Sem WebGL: SVG visível e composição preservada.
- Nenhum erro de runtime ou console.error; bundle de produção verificado no Chrome.

As capturas são de Chrome headless, não de aparelhos físicos. Não foi realizada
medição de FPS ou Lighthouse.

Capturas completas: [desktop](previews/intro-desktop.png),
[mobile](previews/intro-mobile.png),
[mobile sem WebGL](previews/intro-mobile-svg.png).

## Limitações conhecidas

O chunk WebGL permanece com aproximadamente 926 kB minificado / 248 kB gzip,
carregado separadamente. Vite avisa sobre tamanho acima de 500 kB. R3F 9.8 usa
internamente `THREE.Clock`, que gera aviso de depreciação no Three.js 0.186.
ESLint também informa que a base `baseline-browser-mapping` está desatualizada,
sem erros de lint. Esses avisos não foram ocultados.

Fontes continuam vindo de Google Fonts, com alternativas locais no CSS. Nenhum
domínio público/canonical foi inventado; a imagem Open Graph precisa de URL
absoluta quando a URL de publicação for definida.

A implementação permanece estritamente na Phase 00 + Phase 01.
