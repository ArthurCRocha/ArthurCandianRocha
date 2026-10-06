# Phase 05 — Path

Path continua a linha do final de Selected Work e apresenta o percurso acadêmico
e profissional de Arthur. Os arquivos de Hero, Origin, Craft e Selected Work
foram preservados, com conferência SHA-256 dos componentes e estilos. Em Craft,
somente os nomes de exibição do catálogo foram ajustados. A página encerra em
04 / Path, aguardando revisão visual.

O caminho começa discreto, em curva, atravessa a abertura tipográfica e encontra
dois antecedentes: Ensino Médio e Cineclube. **2020** marca a entrada na
computação e ganha a principal mudança de escala. A linha assume cantos precisos,
retoma a curva no design, volta à estrutura no desenvolvimento e combina curvas
e segmentos retos no período atual. O outro destaque de data é **2026**,
associado à continuidade acadêmica. As demais datas permanecem pequenas.

Os cargos e instituições são momentos de texto sobre papel, com pesos e
posições distintos. A linha atravessa áreas vazias, muda de direção e ocupa
espaços maiores que a área de leitura. Não há cartões, colunas de empresas,
marcadores circulares ou accordions de empregos. A saída se prolonga para além
da margem com “O caminho continua.” / “The path continues.”

Os dez momentos são derivados dos registros centrais:

| Período | Registro | Apresentação |
| --- | --- | --- |
| 2016–2018 | Ensino Médio — Colégio Rio Branco | Antecedente acadêmico discreto. |
| 2017–2018 | Cineclube — Conservatório Estadual de Música de Visconde do Rio Branco | Antecedente criativo: imagem, áudio, edição e produção em grupo. |
| 2020–2026 | Bacharelado em Ciência da Computação — IF Sudeste MG, Campus Rio Pomba | Entrada na computação em 2020; saída em 2026 explicitada. |
| Março 2023–Março 2025 | Estagiário / Designer Gráfico — IF Sudeste MG | Comunicação institucional, redes sociais, diagramação e campanhas. |
| Novembro 2024–Fevereiro 2025 | Estagiário em Desenvolvimento — Metryx Tecnologia Ltda. | Frontend, análise de código, bugs e interfaces, conforme o registro. |
| Julho 2025–Atualmente | Suporte e Desenvolvimento — Santiago TI | Computadores, software e segurança. |
| Agosto 2025, 1 mês | Estagiário de Marketing — Prefeitura de Rio Pomba | Design, vídeo e automações com IA. |
| 2026–Atualmente | Tecnólogo em Análise e Desenvolvimento de Sistemas — Univiçosa | Continuidade acadêmica após a saída do IF em 2026. |
| Fevereiro 2026–Atualmente | Assistente de RH — Assurance IT | Recrutamento, vagas e iniciativa própria de padronização de currículos. |
| Agosto 2026–Atualmente | Estagiário de Desenvolvimento — Bioma Investimentos | Desenvolvimento mobile com Flutter e integração com SQL. |

`pathData.js` mantém referências aos seis objetos de experiência, aos três de
educação e ao projeto Cineclube. Funções, organizações, períodos e estado atual
vêm desses objetos; o seletor acrescenta apenas recortes editoriais PT/EN,
identificadores visuais e a precisão das datas. O registro acadêmico anterior
também é referenciado na apresentação da Univiçosa, sem criar um registro novo.

A sequência usa o ano de início; quando ambos os registros têm mês confirmado,
usa também o mês. A posição do bloco acadêmico de 2026 fornece contexto para as
atividades desse ano. **Não afirma que a entrada na Univiçosa ocorreu antes de
fevereiro ou agosto.** “Formação e trabalho, em paralelo” explicita esse período.
O ano 2026 nunca é convertido para janeiro. Não se inventam mês de saída,
semestre, motivo de mudança ou previsão de conclusão.

A correção acadêmica já estava presente no início deste passe: saída do IF e
início da Univiçosa em 2026. Foi mantida. Cineclube continua nos dados e aparece
como antecedente; o eixo principal computação → design → desenvolvimento
começa em 2020. Os três cargos profissionais atuais e a formação em andamento
conservam seu estado atual, sem sugerir substituição entre as atividades.

A auditoria encontrou uma divergência no texto legado de About: dizia estágio
em desenvolvimento na Assurance, enquanto o registro central diz Assistente
de RH. A frase foi alinhada ao cargo correto em PT e EN. Não se acrescentaram
tecnologias ao cargo de RH a partir do projeto de automação.

React.js passou a **React** no catálogo e nas competências centrais. O rótulo
Angular.js passou a **Angular** em Craft, conforme o brief. A grafia histórica
Angular.js permanece como alias e nos registros originais de Metryx e
competências, preservando a fonte. A versão não consta no repositório; não foi
inferida a partir de TypeScript. A associação continua sendo apenas Metryx,
com a função e o período originais. A identificação Angular versus AngularJS
1.x foi solicitada ao usuário como esclarecimento opcional.

O movimento tem doze novos ScrollTriggers: chegada, dez momentos e saída.
Cada momento desenha seu trecho, desloca suavemente o texto até sua posição,
e, conforme o caráter do trecho, aproxima um segundo traço ou alinha guias.
As duas datas maiores têm um deslocamento horizontal curto. Os textos mantêm
opacidade plena durante todo o percurso; o menor contraste das cores de texto
usadas em Path sobre o papel é 5,06:1. A linha evolui
entre curva, canto e canto arredondado; o movimento participa da composição
além do desenho do stroke. Os textos conservam legibilidade durante a entrada.
Scrub curto permite retornar por todo o caminho. Não há novos pins.

As coordenadas SVG são medidas a partir do layout, excluindo os transforms
animados. ResizeObserver e carregamento das fontes atualizam as medidas;
troca de idioma reverte e reconstrói apenas o contexto de Path. O traço da
chegada se estende pela área silenciosa da legenda de saída de Selected Work,
preservando o componente aprovado. Ambos se encontram na mesma coordenada
horizontal de 35% da largura interna.

Até 700 px, os antecedentes passam de uma dupla assimétrica para duas etapas
verticais. Os textos alternam a margem ocupada, com uma coluna de leitura
ampla e espaço reservado para as curvas laterais. A linha é recalculada com
rotas próprias, preservando as mudanças horizontais e a rolagem nativa.
Tablet usa uma distribuição intermediária, com colunas mais amplas.

Uma única lista HTML em ordem cronológica contém dez artigos com títulos
associados. As datas usam `time`; os SVGs são decorativos e não entram na
árvore de acessibilidade. PT e EN usam o mesmo componente e os campos centrais
traduzidos. Os nomes das organizações e marcas são preservados. Movimento
reduzido apresenta todos os textos e caminhos completos, sem transforms,
pinning ou ScrollTriggers. Path não introduz paradas artificiais de teclado.

Arquivos deste passe:

- `src/components/path/Path.jsx`, `Path.css`, `usePathMotion.js`: composição,
  variantes responsivas, semântica, geometria e movimento.
- `src/data/pathData.js`: seleção dos registros e recortes PT/EN.
- `src/App.jsx`: montagem de Path após Selected Work.
- `src/data/translations.js`: textos PT/EN de Path e correção factual do About.
- `src/data/craftData.js`: nomes de exibição React e Angular; aliases preservados.
- `src/data/portfolioData.js`: nome da competência React.
- `README.md`, este documento e nota histórica em `PHASE-03-CRAFT.md`.
- `docs/previews/phase-05/`: capturas e evidência de validação.

Não há novas dependências, imagens carregadas pela página ou canvas. Os três
SVGs de Path contêm vinte paths simples. Os doze novos triggers têm intervalos
delimitados; não há render loop próprio nem listener de scroll por experiência.
O SVG só é remedido quando o layout muda. O contexto GSAP, observer e frame
pendente são limpos ao desmontar ou trocar idioma. O WebGL existente permanece
em modo demand fora da Intro, com uma geometria e zero texturas.

O build passou de 378,36 kB para 388,99 kB de JavaScript principal
(gzip: 128,89 → 131,71 kB) e de 32,99 kB para 42,16 kB de CSS
(gzip: 7,77 → 9,29 kB). A diferença comprimida é cerca de **4,34 kB**.
O chunk WebGL mantém 927,36 kB, gzip aproximadamente 248,4 kB. O aviso anterior de chunk
WebGL acima de 500 kB permanece; não foi alterado o pipeline de dependências.

As capturas e resultados estão em [previews/phase-05](previews/phase-05/).
O relatório [validation.json](previews/phase-05/validation.json) registra os
perfis de tela, correspondência com a fonte, períodos, reversão do movimento,
teclado, idiomas, overflow, estado WebGL e movimento reduzido.

O navegador de validação é Chrome headless. Os perfis de toque são emulados;
as capturas não representam testes em aparelhos físicos. A árvore de
acessibilidade foi registrada em PT e EN, com uma lista de dez momentos,
títulos hierárquicos e SVGs decorativos omitidos.

Validação final aprovada em sete perfis: desktop 1440×900 em PT e EN,
laptop 1024×768 em EN, tablet 768×1024 em PT, celular 390×844 em PT,
celular 320×740 em EN e toque em paisagem 844×390 em EN. Não houve overflow
horizontal nem erros JavaScript. O retorno por Path → Selected Work → Craft →
Origin → Hero preservou a composição inicial e seu pin original. Os cinco
momentos de maior mudança visual tiveram início, conclusão e reversão do
desenho e deslocamento conferidos; os textos permaneceram com opacidade 1.

Troca de idioma e redimensionamento desktop → celular → desktop mantiveram
22 triggers totais, sendo 12 de Path, e apenas o pin original de Hero. Em
movimento reduzido, todos os capítulos usam zero triggers e zero pins;
os dez momentos e o traço completo continuam legíveis. Ativar e desativar a
preferência repetidamente não acumulou triggers.

O preview de produção também foi conferido em PT no desktop e EN no celular.
`npm run build`, `npx eslint .` e `git diff --check` passaram. A busca em
`src`, `dist` e nos textos renderizados não encontrou a referência acadêmica
antiga de dezembro de 2025. Os avisos existentes de tamanho do chunk WebGL
e dados antigos de baseline-browser-mapping permanecem sem novas dependências.

**Encerramento deste passe: Path. Now e Connect não foram implementados.**
