# Phase 03 — Craft

Registro da implementação original desta fase. Na [Phase 05](PHASE-05-PATH.md),
os rótulos de exibição React.js e Angular.js passaram a React e Angular,
preservando as associações factuais e a composição aprovada de Craft.
O [passe factual de Prodiesel](PHASE-04-FACTUAL-CORRECTION.md) atualizou os
vínculos e o catálogo descritos abaixo. As capturas originais são históricas.

Craft substitui a apresentação convencional de competências por um catálogo
tipográfico de ferramentas. A página termina neste capítulo, aguardando revisão
visual. Selected Work, Path, Now e Connect não são montados.

## Composição

Um trecho de linhas retoma as divisões verticais do final de Origin e se resolve
em duas linhas horizontais. Um único ScrollTrigger constrói essas linhas com
scrub curto e reversível. Não há pinning, câmera ou WebGL novo em Craft.

A abertura usa sans-serif, duas linhas curtas, preto/vermelho e metadados
monoespaçados. O catálogo introduz um ritmo mais denso: cinco faixas contínuas
com linhas finas, índices pequenos e nomes grandes. Larguras diferentes e o
recuo da faixa de design mantêm a assimetria organizada. Não há cards, logos,
barras, níveis ou percentuais.

O contexto ocupa uma coluna sticky na mesma composição. Ao final, duas linhas
se afastam e uma esquina vermelha deixa um campo aberto. O encerramento continua
sendo “02 / Fim de Craft”, sem título, projeto ou seção do próximo capítulo.

## Catálogo e lógica das categorias

`craftData.js` seleciona exclusivamente nomes suportados por `hardSkills`,
`experience.technologies` ou `projects.technologies` em `portfolioData.js`.
O catálogo atual reúne 38 nomes, após a correção factual de Prodiesel:

| Categoria | Tecnologias / ferramentas | Critério |
| --- | --- | --- |
| Interfaces / web + mobile | React, Angular, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Flutter, Dart | Interfaces web e mobile permanecem no mesmo grupo, incluindo a prática mobile da Bioma, sem uma categoria isolada de apenas dois nomes. |
| Backend / linguagens | Java, Python, FastAPI, Node.js, Express, PHP, C++, Groovy | Linguagens e ferramentas de lógica e serviços. A categoria não afirma uso de cada linguagem em um backend profissional. |
| Dados | SQL, PostgreSQL, SQL Server, T-SQL, MySQL, Redis | Consulta, armazenamento e bancos de dados. PostgreSQL tem suporte no campo composto “SQL / PostgreSQL” e explicitamente no case Prodiesel. |
| Design / audiovisual | Photoshop, Figma, Canva, Illustrator, InDesign, Premiere, CapCut, Sony Vegas | Ferramentas de imagem, composição e edição, incluindo o antecedente audiovisual preservado. |
| Ferramentas / integrações | Git / GitHub, Docker, Gemini API, Socket.io, JWT, PowerShell, Codemagic | Versionamento, ambientes e integrações. Não implica uso conjunto desses itens. |

Somente variações de escrita explícitas são normalizadas: React/React.js,
Photoshop/Adobe Photoshop e capitalização de JavaScript, por exemplo. Angular.js
é mantido como alias do rótulo Angular, sem inferir versão; “HTML” não é
associado automaticamente a “HTML5”. O campo
composto SQL/PostgreSQL sustenta o nome PostgreSQL, sem inferir que projetos
marcados apenas com SQL usam esse banco.

## Contexto factual

As associações exigem uma correspondência explícita em `technologies` do
registro. Os próprios objetos de experiência/projeto são mantidos como
referências, preservando nomes, funções e períodos centrais. O painel mostra
até três registros, priorizando atividades atuais e depois o ano mais recente.
O recorte é editorial; não representa contagem total de trabalhos ou avaliação.

Relações utilizadas:

- React: competência central, sem vínculo a Prodiesel. Angular e TypeScript: Metryx Tecnologia.
- JavaScript: Gerenciador de Mercado, Metryx e atividades acadêmicas.
  HTML5: Metryx e atividade de JavaScript; CSS3: esses registros e o sistema TCC.
- Flutter/Dart: Bioma Investimentos, Prodiesel e Estudos de Flutter.
- Python: Prodiesel e Padronizador de Currículos com IA. Gemini API: Padronizador.
  A ferramenta é descrita
  para Assurance no projeto; não se acrescenta Python ao registro de tecnologias
  do cargo de RH, que não o declara.
- Node.js: Gerenciador de Mercado e Chatbot para WhatsApp. PHP/MySQL: Sistema de
  Cartório. SQL: Bioma Investimentos e Gerenciador de Mercado.
- FastAPI, PostgreSQL, SQL Server, T-SQL, PowerShell, Codemagic e JWT: Prodiesel.
- Photoshop: comunicação do IF, Prefeitura e respectivos projetos. Canva:
  esses registros, ebook e trabalhos avulsos. Figma: ebook e trabalhos avulsos.
  Illustrator: IF e Artes para o IF. InDesign: experiência do IF.
- Premiere/CapCut: Prefeitura de Rio Pomba. Sony Vegas: Cineclube, 2017–2018.

React, Java, C++, Groovy, Express, Tailwind CSS, Redis, Docker, Git/GitHub
e Socket.io têm suporte nas competências, mas não têm associação explícita
a um projeto/experiência. Para esses itens, o contexto mostra apenas a categoria
e sua descrição; não gera um painel de trabalhos vazio ou uma justificativa
técnica na interface.

Não foram inferidos proficiência, anos de uso, versões, expertise ou tecnologias
comuns a desenvolvedores Full Stack. Grails, presente apenas como exemplo no
brief, foi excluído. Práticas amplas como identidade visual, montagem de
computadores e engenharia de prompts continuam nos dados originais, sem serem
convertidas em nomes de software no catálogo.

## Interação e responsividade

No desktop, hover, foco de teclado e clique selecionam a ferramenta. Um traço
vermelho se estende sob o nome; as demais ferramentas usam o tom de tinta
secundário. O painel permanece no fluxo, com sticky dentro do catálogo, sem
card flutuante, tooltip, modal ou efeito de cursor. Botões nativos preservam
Tab, Shift+Tab, Enter e Space; o foco tem contorno visível. O contexto usa uma
região com atualização anunciada a leitores de tela.

Até 900 px, ou em dispositivos sem hover/com ponteiro coarse, o catálogo usa
uma coluna. Cada linha é um botão de disclosure com `aria-expanded` e
`aria-controls`. Toque ou Enter/Space abre a informação abaixo do nome; outro
toque fecha. Apenas uma linha fica aberta. O estado inicial mostra somente os
nomes, sem uma pilha de painéis. A mesma estratégia atende tablets e toque em
paisagem, mesmo acima de 900 px.

Movimento reduzido deixa a grade completa e estática, mantendo todas as
interações. Troca de idioma e expansão atualizam as medidas do ScrollTrigger.
O contexto GSAP é revertido no unmount e nas alterações da preferência de
movimento. Não foram adicionadas dependências, canvas ou cenas; o chunk WebGL
existente mantém seu carregamento lazy e pausa fora da Intro.

## Arquivos e traduções

- `src/components/craft/Craft.jsx`: catálogo, contexto, disclosure e passagem.
- `src/components/craft/Craft.css`: composição, linhas, sticky e responsividade.
- `src/data/craftData.js`: seleção, agrupamento e relações factuais.
- `src/App.jsx`: monta Craft após IntroOrigin.
- `src/data/translations.js`: namespace `craft` completo em PT/EN; abertura,
  categorias, instruções, acessibilidade, contexto e encerramento. Títulos de
  projetos recebem equivalentes EN, sem alterar os fatos centrais.
- `README.md`, este relatório e `docs/previews/phase-03/`: escopo e evidências.

Hero, sua cena, Hero → Origin, narrativa/CSS de Origin, tokens e estilos globais
permanecem idênticos aos arquivos aprovados, verificados por SHA-256.

## Evidências para revisão

[Desktop](previews/phase-03/desktop-entry.png),
[contexto desktop](previews/phase-03/desktop-context.png),
[mobile](previews/phase-03/mobile-entry.png),
[disclosure mobile](previews/phase-03/mobile-context.png),
[inglês](previews/phase-03/desktop-en-entry.png).

Resultados automatizados: [validação](previews/phase-03/validation.json).

Build de produção, ESLint e `git diff --check` passaram. Chrome headless verificou
desktop 1440×900, notebook 1024×768, tablet 768×1024, mobile 390×844 e 320×740,
além de toque em paisagem 1024×768. Nenhum overflow horizontal ou erro de página.
Hover, foco/Tab, Enter/Space, toque para abrir/fechar, retorno ao Hero, PT/EN,
troca/persistência de idioma e bundle de produção passaram.

As 33 ferramentas e todas as suas referências foram confrontadas com os dados
centrais. O início de ADS/Univiçosa permanece somente “2026”. A passagem aprovada
mantém 1,2 alturas do Hero no desktop e 0,8 no mobile/toque. Há cinco triggers
com movimento normal, dos quais apenas o existente do Hero faz pinning; com
movimento reduzido há zero triggers e a grade está completa. Alternar a
preferência remove/recria os efeitos sem acumular triggers.

O site continua com um canvas. O chunk WebGL permanece aproximadamente
248,38 kB gzip; o JavaScript principal passa a 126,07 kB gzip. Nenhuma dependência
adicionada. Permanecem os avisos conhecidos de tamanho do chunk WebGL e idade
de baseline-browser-mapping. As verificações não incluem aparelhos físicos
ou Safari.
