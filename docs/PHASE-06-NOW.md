# Phase 06 — 05 / Now

Implementação exclusivamente do capítulo Now. Path e a correção factual de
Prodiesel estão aprovados. A composição ativa termina no começo da expansão
vermelha; não há seção, título ou conteúdo de Connect.

## Dados atuais

`src/data/nowData.js` seleciona dois registros de `portfolioData.js`, sem copiar
identidade, cargo, formação ou períodos. O componente utiliza os campos PT/EN
dos mesmos registros. A seleção exige `current === true` e ausência de data de
encerramento; um registro encerrado deixa de aparecer.

| Categoria | Registro central | Conteúdo | Período |
| --- | --- | --- | --- |
| Aprendendo / Learning | `education`, id 3 | Tecnólogo em Análise e Desenvolvimento de Sistemas — Univiçosa | 2026 — atual |
| Construindo / Building | `experience`, id 5 | Estagiário de Desenvolvimento — Bioma Investimentos | Agosto de 2026 — atual |

A formação conserva precisão de ano, `2026`. O estágio conserva o mês
confirmado, `2026-08`. O cargo em inglês é Development Intern.

Não foram apresentados como atuais Flutter Studies, projetos antigos ou
tecnologias do catálogo: a existência desses registros não confirma estudo
ou desenvolvimento atual. Prodiesel permanece em Selected Work, com todos
os fatos aprovados, sem ser anunciado aqui como projeto em construção.
Exploring não é renderizado por falta de um tema atual confirmado.

O redesign deste portfólio poderia fornecer um terceiro registro, mas a seleção
editorial fica em dois. As demais experiências confirmadas como atuais seguem
em Path; não é necessário reproduzir toda a experiência profissional em Now.
Nenhum dado existente foi removido.

Para atualizar a seleção, editar `nowData.js`; para alterar cargo ou período,
editar o registro central. As frases e rótulos do capítulo ficam em `t.now`.
Uma futura categoria Exploring já possui rótulo nos dois idiomas, mas não
produz uma categoria vazia na interface.

## Composição e transição

O SVG de chegada continua geometricamente o ponto final do SVG aprovado de
Path: `(1100, 350)` no viewBox `1000 × 380`. O ponto é convertido pelas
dimensões reais da saída, sem editar o componente, CSS ou movimento de Path.
O traço sai da área visível e retorna mais leve, em espaço vazio, até um
pequeno trecho quase horizontal e aberto. A chegada compartilha o papel e
não utiliza divisória ou mudança de fundo.

Após a área de silêncio aparece `05 / NOW`, com um ponto vermelho de 3 px.
Um único h2 reúne as três frases em serifas grandes e posições progressivas.
As frases permanecem estáticas. Não há pin, cartões, fotografias ou capítulos
isolados para cada afirmação. Os dois contextos são uma lista de descrição
sem bordas, com títulos menores e períodos em metadados.

No desktop, os registros ficam lado a lado; no mobile, ficam em coluna.
O capítulo mantém espaços generosos e tipografia de destaque, inclusive em
320 px. A seleção tem a mesma estrutura nos dois idiomas.

O easter egg de gato não foi implementado nesta fase. A composição mantém
somente papel, traço, tipografia e a mancha vermelha, preservando a pausa.

## Traduções

| PT | EN |
| --- | --- |
| Ainda aprendendo. | Still learning. |
| Ainda construindo. | Still building. |
| Ainda seguindo. | Still moving. |
| Formação e prática atuais | Current studies and practice |
| Aprendendo / Construindo / Explorando | Learning / Building / Exploring |

Todos os textos atuais são conteúdo real no DOM, inclusive os períodos em
elementos `time`. O SVG de chegada e a mancha são decorativos e ficam fora
da árvore de acessibilidade. Não há novos pontos de foco nem interação
necessária para ler Now.

## Movimento e vermelho

Now adiciona somente dois ScrollTriggers, sem pin:

- `path-now-arrival`: desenho lento do traço de chegada; scrub de 0,6 s.
- `now-red-beginning`: crescimento da mancha de tinta; scrub de 0,8 s.

A mancha cresce de 8% até seu tamanho local: caixa de 92 px no desktop e
68 px no mobile. O papel continua predominante até o final. O capítulo
termina nessa primeira expansão, pronta para a futura direção de Connect.
O movimento acompanha scroll e se reverte ao voltar; não há animação contínua.

Em movimento reduzido, o traço aparece completo e a mancha fica estática no
tamanho final. Frases, registros, espaço e significado permanecem iguais.
O hook limpa os triggers e o ResizeObserver ao desmontar/trocar idioma.
Recalcula o traço em resize e após carregar as fontes.

## Validação

Evidências de navegador e resultados: [validation.json](previews/phase-06/validation.json).
Capturas completas: [desktop PT](previews/phase-06/desktop-complete-static.png),
[desktop EN](previews/phase-06/desktop-en-complete-static.png),
[mobile PT](previews/phase-06/mobile-complete-static.png) e
[320 px EN](previews/phase-06/small-mobile-en-complete-static.png).
Transição: [Path → Now](previews/phase-06/desktop-arrival.png).

| Configuração | Idioma | Resultado |
| --- | --- | --- |
| Desktop 1440 × 900 | PT e EN | Passou |
| Tablet com toque 768 × 1024 | PT e EN | Passou |
| Mobile com toque 390 × 844 | PT e EN | Passou |
| Mobile com toque 320 × 740 | EN | Passou |
| Paisagem com toque 844 × 390 | EN | Passou |
| Movimento reduzido, desktop / mobile | PT / EN | Passou |
| Build servido pelo preview, desktop / mobile | PT / EN | Passou |

Em todas as oito configurações normais: conteúdo factual PT/EN correto,
ausência de overflow e erros de execução, apenas dois novos triggers, nenhum
pin novo, traço e mancha reversíveis, teclado em Craft e Selected Work,
troca de idioma sem acúmulo de triggers e percurso completo Hero → Origin →
Craft → Selected Work → Path → Now com retorno ao Hero. A passagem Path → Now
tem distância vertical zero entre as áreas e usa o ponto de saída medido.

O resize desktop → mobile → desktop recalcula o SVG sem acumular triggers.
Movimento reduzido deixa zero triggers e zero pins em toda a página;
alternar essa preferência recupera os 24 triggers normais e volta à
composição estática corretamente. O canvas existente permanece em modo
`demand`, com uma geometria e zero texturas, quando a leitura está em Now.
Os snapshots semânticos em [PT](previews/phase-06/accessibility-pt.txt) e
[EN](previews/phase-06/accessibility-en.txt) confirmam as frases, categorias,
registros e períodos reais na árvore de acessibilidade.

Build de produção e lint passaram. A busca em `src/data` e `src/components`
não encontrou December 2025, Dezembro 2025, Dezembro de 2025 ou `2025-12`.
Uma comparação SHA-256 confirmou 24 arquivos aprovados sem alterações,
incluindo Hero, Origin, Craft, Selected Work, Path, seus catálogos factuais,
`portfolioData.js` e os tokens.

## Arquivos desta fase

- `src/components/now/Now.jsx`: conteúdo semântico e composição compartilhada.
- `src/components/now/Now.css`: espaço, tipografia e responsividade.
- `src/components/now/useNowMotion.js`: traço, pequena expansão e cleanup.
- `src/data/nowData.js`: seleção central do presente.
- `src/data/translations.js`: adição exclusiva de `now` em PT e EN.
- `src/App.jsx`: montagem de Now após Path.
- `README.md`: escopo atual e pontos de manutenção.
- Este relatório e `docs/previews/phase-06/`: evidências da fase.

## Performance

Nenhuma dependência ou canvas novo. O bundle principal passou de 394,26 para
398,14 kB; gzip de 133,55 para 134,60 kB. O CSS passou de 42,16 para 44,83 kB;
gzip de 9,29 para 9,79 kB. Acréscimo total aproximado de **1,55 kB gzip**.
O chunk lazy do Hero permanece em 927,36 kB, gzip 248,39 kB.

Now usa HTML, CSS, dois SVGs pequenos, GSAP já existente e um ResizeObserver.
Não tem loop de animação contínuo. A quantidade normal de triggers sobe de
22 para 24; o único pin continua sendo a passagem aprovada do Hero.
Os avisos preexistentes de tamanho do chunk WebGL e antiguidade de
`baseline-browser-mapping` continuam presentes; não foram alteradas dependências.

## Encerramento

Now está implementado para revisão visual. Connect aguarda instrução própria.
