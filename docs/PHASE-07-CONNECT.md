# Phase 07 — 06 / Connect

Capítulo final implementado sobre o trabalho aprovado de Hero, Origin, Craft,
Selected Work, Path e Now. Connect é o rodapé e encerra a composição ativa.
Não houve redesign dos capítulos anteriores.

## Contatos públicos

`connectData.js` seleciona os canais profissionais de `contactInfo`, em
`portfolioData.js`. O nome vem de `personalInfo.displayName`; a edição é 2026.

| Canal | Destino |
| --- | --- |
| Email | `mailto:arthurcandian@gmail.com` |
| LinkedIn | `https://www.linkedin.com/in/arthur-candian-rocha-3b346124a` |
| GitHub | `https://github.com/ArthurCRocha` |

O email é o mesmo contato público que já aparece na Intro e navegação.
Telefone, WhatsApp, Instagram e disponibilidade não foram adicionados à
conclusão. Nenhum cargo, localização ou condição de trabalho foi inferido.

Os três canais usam âncoras reais. LinkedIn e GitHub abrem uma nova aba com
`rel="noopener noreferrer"`. O email utiliza `mailto`, sem formulário.
Os destinos e nomes não são hardcoded no componente.

## Continuidade de Now

A transição utiliza o **mesmo elemento `.now-red-seed`**, com o mesmo path SVG
aprovado. Não cria cópia, outro objeto de transição ou novo canvas. Nenhum
arquivo de Now foi editado.

O novo trigger começa exatamente onde o crescimento inicial de Now termina:
a borda inferior de Now alcança a borda inferior do viewport. Nesse ponto,
o próprio SVG passa de posicionamento absoluto para fixo, preservando sua
posição inicial. Com scroll nativo, a forma cresce e se aproxima do centro;
sua borda irregular sai da tela até cobrir todos os cantos.

O tamanho final é calculado pelas dimensões reais do viewport e por um raio
interno conservador do SVG. A chegada reserva `max(640px, 100svh)` de percurso.
O conteúdo final começa a entrar depois de o vermelho dominar a tela.
Não há novo pin nem bloqueio de scroll.

O posicionamento fixo evita que a forma ampliada aumente a altura rolável
do documento além do rodapé. Ao voltar antes da transição, o SVG recupera
seu posicionamento original e o crescimento aprovado de Now continua normal.

O GSAP de Now escreve `scale: none` e `translate: none` inline ao normalizar
seu `transform`. A regra adicional de Connect sobrepõe somente essas duas
propriedades individuais durante a continuação, por variáveis CSS próprias.
Assim, as duas etapas não disputam o `transform` original de Now.

O traço já termina de forma reduzida na chegada de Now. Na conclusão, o
vermelho absorve o papel restante; não foi adicionada outra linha ou sequência
de movimento aos capítulos anteriores.

## Campo vermelho e composição

O campo utiliza o token existente `--red: #b82025`, com texto na cor do papel
`--paper: #eeeae1`. A textura de papel/grão global existente permanece sobre
a composição, sem nova imagem, filtro ou animação de pigmento.

A frase final tem três linhas em Instrument Serif, ancorada à esquerda e
abaixo do cabeçalho. No desktop, os contatos ocupam uma coluna à direita,
alinhada à parte inferior da frase. São links tipográficos com linhas finas
e setas; não há cartões, ícones sociais, formulário ou botões arredondados.

Depois da expansão, a composição permanece estática. Hover/foco desloca a
seta apenas 3 px; o hover também sublinha o nome do canal. A conclusão inclui
`つづく`, seu significado PT/EN e somente copyright e retorno ao início.

## Navegação e retorno

A navegação aprovada da Intro é absoluta, não persistente. Seu comportamento
e seus arquivos foram preservados. Connect possui seu próprio controle de
idioma, integrado ao mesmo `LanguageProvider` e ao mesmo `toggleLang`.
Não há flags nem segundo sistema de tradução ou cursor novo.

`00 / INTRO ↑` é uma âncora nativa para `#intro-content`, o destino já existente
com `tabIndex=-1`. O navegador volta ao início e transfere o foco para o
conteúdo principal. O smooth scroll global continua válido; movimento
reduzido utiliza o comportamento nativo sem suavização.

## PT / EN

| PT | EN |
| --- | --- |
| Vamos / construir / algo. | Let's / build / something. |
| Continua. | To be continued. |
| Contatos profissionais | Professional contacts |
| Idioma do capítulo final | Final chapter language |
| Enviar email para {email} | Send email to {email} |
| {name} — abre em uma nova aba | {name} — opens in a new tab |

As adições ficam exclusivamente em `t.connect`. O mesmo componente, dados
e layout servem ambos os idiomas. O controle reutiliza o rótulo acessível
de troca de idioma que já existia no projeto.

## Acessibilidade e mobile

Connect usa um `footer` com landmark `contentinfo` e nome acessível associado ao h2. Texto, contatos,
períodos dos capítulos anteriores e navegação continuam reais no DOM.
As âncoras possuem rótulos úteis, inclusive o aviso de nova aba.

O contraste nominal papel/vermelho é **5,35:1**, adequado ao texto comum.
Foco visível usa contorno de 2 px na cor do papel. Links e controle de idioma
têm altura mínima de 44 px; os links mobile têm pelo menos 52 px.
O japonês é acompanhado de “Continua.” / “To be continued.” e fica
`aria-hidden`, evitando repetição na leitura assistiva.

Tablet e mobile colocam frase e contatos em fluxo vertical, preservando
respiro. `min-height` e `svh` permitem que telas curtas rolem todo o conteúdo;
nada é limitado a uma altura fixa ou cortado por `100vh`. Em 320 px, o email
pode quebrar no `@`, sem isolar uma letra do domínio.

Em movimento reduzido, a área de expansão é omitida e o campo vermelho
já existe. O SVG de Now conserva seu estado estático aprovado, e todos os
contatos ficam disponíveis sem depender de animação. O hook limpa o trigger,
classes e variáveis ao trocar idioma, preferência ou desmontar. O observer
é desconectado ao trocar idioma ou desmontar o componente.

## Arquivos desta fase

- `src/components/connect/Connect.jsx`: capítulo final e navegação semântica.
- `src/components/connect/Connect.css`: campo vermelho, composição e integração visual do SVG existente.
- `src/components/connect/useConnectMotion.js`: única expansão, medição e cleanup.
- `src/data/connectData.js`: seleção de contatos públicos centralizados.
- `src/data/translations.js`: adições PT/EN do capítulo.
- `src/App.jsx`: montagem de Connect após Now.
- `README.md`: escopo atual e pontos de manutenção.
- Este relatório e `docs/previews/phase-07/`: evidências da fase.

## Performance

Nenhuma dependência ou canvas novo. Apenas um ScrollTrigger adicional;
o total normal passa de 24 para 25, mantendo um único pin, o Hero aprovado.
O campo final e a textura permanecem estáticos.

| Bundle | Antes | Agora | Acréscimo gzip |
| --- | --- | --- | --- |
| JS principal | 398,14 kB / 134,60 gzip | 402,48 kB / 135,77 gzip | 1,17 kB |
| CSS | 44,83 kB / 9,79 gzip | 48,19 kB / 10,46 gzip | 0,67 kB |

Acréscimo total aproximado: **1,84 kB gzip**. Hero permanece em 927,36 kB,
gzip 248,39 kB. Os avisos existentes de tamanho do chunk WebGL e antiguidade
de `baseline-browser-mapping` continuam; não foram alteradas dependências.

## Validação e evidências

Validação automatizada no Chrome headless, com viewports e toque emulados,
acompanhada de inspeção visual das capturas em desktop, tablet e mobile.

Build de produção, lint e `git diff --check` passaram após o ajuste do email.
A busca em dados e componentes não encontrou December 2025, Dezembro 2025,
Dezembro de 2025 ou `2025-12`. A comparação SHA-256 confirmou 28 arquivos dos
capítulos e dados aprovados sem alteração, incluindo todos os arquivos de Now.
Os arquivos da navegação inicial também foram preservados. As 30 comparações
estão em [preservation.json](previews/phase-07/preservation.json).

| Configuração | Idioma | Resultado |
| --- | --- | --- |
| Desktop 1440 × 900 | PT e EN | Passou |
| Tablet com toque 768 × 1024 | PT e EN | Passou |
| Mobile com toque 390 × 844 | PT e EN | Passou |
| Mobile com toque 320 × 740 | EN | Passou |
| Paisagem com toque 844 × 390 | EN | Passou |
| Movimento reduzido, desktop / mobile | PT / EN | Passou |
| Produção servida pelo preview, desktop / mobile | PT / EN | Passou |

Nas oito configurações normais foram verificados: todo o percurso e retorno
por Hero → Origin → Craft → Selected Work → Path → Now → Connect, leitura dos
dados atuais, teclado em Craft e Selected Work, links de contato, foco claro,
troca de idioma nas duas navegações, retorno ao topo e ausência de overflow,
erros de execução ou acúmulo de triggers. Não há scroll extra depois de Connect.

Capturas foram analisadas por pixels: a fração vermelha aumenta ao longo da
expansão e os quatro cantos estão vermelhos no estado completo. A referência
do SVG é a mesma antes, durante e depois da transição, inclusive após troca
de idioma. O início do novo trigger coincide com o fim do crescimento de Now.

Os links externos foram ativados pelo teclado com respostas interceptadas
no navegador, comparando URL e abertura de nova aba sem `window.opener`.
O `mailto` foi comparado ao email público central. Essas checagens verificam
o comportamento dos links; não enviam email nem alteram contas externas.

Movimento reduzido tem zero triggers e zero pins. A alternância de preferência
limpa classe e variáveis de expansão e restaura o SVG à posição original.
A ordem nativa de foco é idioma → email → LinkedIn → GitHub → Intro; idioma
e retorno ao início continuam funcionando sem scroll suave. A verificação
específica está em [reduced-keyboard.json](previews/phase-07/reduced-keyboard.json).

O canvas existente permanece em `demand`, com uma geometria e zero texturas.
O contador de frames fica estável durante a leitura de Connect. Foram
preservados o pin, o movimento, a composição e os arquivos do Hero.

Evidências: [validation.json](previews/phase-07/validation.json).
Composição final: [desktop PT](previews/phase-07/desktop-complete-static.png),
[desktop EN](previews/phase-07/desktop-en-complete-static.png),
[mobile PT](previews/phase-07/mobile-complete-static.png) e
[320 px EN](previews/phase-07/small-mobile-en-complete-static.png).
Expansão: [início](previews/phase-07/desktop-transition-0.png),
[crescimento](previews/phase-07/desktop-transition-35.png) e
[cobertura completa](previews/phase-07/desktop-transition-100.png).

## Encerramento

Connect está implementado para a revisão final do portfólio. Não houve
alterações globais de arte nem outra seção depois do capítulo final.
