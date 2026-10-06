# Phase 04 — Selected Work

Os dados de Prodiesel abaixo foram atualizados no
[passe factual posterior](PHASE-04-FACTUAL-CORRECTION.md).
As capturas e métricas ao final deste documento registram a implementação
original; a validação atual está no relatório do passe factual.

Duas apresentações editoriais no scroll principal: Prodiesel e Padronizador de
Currículos. Não há páginas de case study, cards de portfólio ou carrossel.
A implementação original desta fase terminava após Selected Work.

## Dados utilizados

`selectedWorkData.js` referencia os projetos **3** e **4** de `portfolioData.js`.
Identidade, ano, tecnologias, imagens e links continuam vindo dos objetos
centrais. Prodiesel lê o case verificado e o vínculo com a experiência Bioma;
o Padronizador conserva os trechos editoriais PT/EN de sua descrição.

| Campo | Prodiesel | Padronizador de Currículos |
| --- | --- | --- |
| Ano | 2026 | 2026 |
| Contexto | App Flutter para transportadores de leite consultarem pagamentos, volume e coletas diárias. | Padronização dos currículos recebidos pelo RH da Assurance IT, antes feita manualmente. |
| Estrutura | ERP legado → sincronização → API → mobile. | Python e API do Gemini extraem dados e os aplicam em um template fixo. |
| Atuação | Estagiário na Bioma, com contribuição colaborativa nas quatro camadas. | Iniciativa e desenvolvimento próprios. |
| Stack visível | Flutter, FastAPI, PostgreSQL, SQL Server / T-SQL, Python | Python, Gemini API, LLM, Automação |
| Estado | API/sincronização em produção; APK validado em aparelho físico; lojas pendentes. | Testada com casos reais. |
| Imagens / links | Ausentes. | Ausentes. |

Não foram encontrados screenshots desses projetos em `public` ou `src/assets`.
Os screenshots de TCC, as imagens de design e os certificados pertencem a outros
registros e não são reaproveitados como evidência dos dois trabalhos.

Omitidos: nomes de clientes, tamanho de equipe, métricas sem autorização de
divulgação, identificadores operacionais e configurações privadas. O insight
de autenticação CPF/CNPJ é qualitativo. Não há campos vazios, botões
desabilitados ou links inferidos de outros repositórios.

O estado de produção de Prodiesel foi confirmado pelo novo resumo técnico;
isso não equivale a publicação nas lojas. O protótipo inicial Flutter Web com
FastAPI mockada fica identificado nos dados como validação. O teste com casos
reais do Padronizador não confirma adoção completa pela equipe; a experiência
de RH menciona fase final de adoção. A redução de tempo continua qualitativa.

## Composição

A chegada continua as linhas abertas no final de Craft: parte da grade some,
um contorno vermelho maior aparece e a abertura se mantém curta. O título do
capítulo é menor que os nomes dos projetos.

Prodiesel usa uma palavra ampla em sans-serif, um campo vermelho que alcança a
borda da página e dois planos de linhas com profundidade. A superfície preta,
os traços e os nós são uma composição abstrata de sistema, sem chrome de browser,
controles, dados, funcionalidades ou reconstrução de interface. A paleta é a
do portfólio; não é apresentada como identidade visual documentada do produto.

Entre os projetos, linhas de planos se achatam em margens horizontais. O
Padronizador muda para papel e serifada, com o título à direita no desktop e
documentos à esquerda. Quatro superfícies começam dispersas e se alinham em
uma pilha de espaçamento regular. As superfícies têm somente geometria abstrata,
sem nomes, empregadores, cargos ou conteúdo pessoal fictício. Pequenos rótulos
de “Composição / sistema” e “Composição / documentos” acompanham os desenhos.

Cada projeto mostra primeiro identidade/ano, depois contexto/estrutura, e por
fim atuação/stack/estado. Prodiesel também mostra propósito do produto e a
decisão de autenticação. São distâncias no fluxo de leitura; o conteúdo HTML
nunca depende de hover ou de uma revelação que o esconda de leitores de tela.
Âncoras “Ler o contexto” permitem chegar diretamente à informação pelo teclado.

Depois do segundo projeto, linhas de moldura perdem presença e convergem em
um traço fino, relacionado ao caminho de Origin. O único encerramento textual
é “03 / Fim de Selected Work”; não existe conteúdo ou título de Path.

## Movimento, acesso e recursos

`useSelectedWorkMotion.js` usa o GSAP/ScrollTrigger já instalado, com cinco
efeitos: chegada do contorno, planos de Prodiesel, passagem para papel, alinhamento
dos documentos e redução da moldura final. Nenhum novo pinning, câmera, loop de
ponteiro ou interceptação de scroll. Os documentos terminam de se alinhar ainda
inteiros na viewport; voltar no scroll recupera a composição dispersa.

Todo movimento novo é DOM/CSS/SVG. WebGL, Hero, Hero → Origin, Origin e Craft
permanecem idênticos aos arquivos aprovados, conferidos por SHA-256. O canvas
existente continua único e lazy; não há custo inicial de uma cena adicional.
GSAP atualiza as transformações durante o scroll e termina o scrub após a
progressão, sem animação espacial contínua. `matchMedia` e o contexto `useGSAP`
revertem os transforms/triggers no unmount ou na troca de movimento reduzido.
Troca de idioma e os refreshes existentes de Craft recalculam as posições.

Movimento reduzido mostra os planos estáticos e os documentos já alinhados,
mantendo texto e âncoras acessíveis. Desenhos são `aria-hidden`; as duas âncoras
de leitura têm foco visível e destino focalizável. Não há links externos porque
os registros não os fornecem. A estrutura renderiza links reais se forem
acrescentados aos dados centrais posteriormente.

No mobile, Prodiesel reorganiza o campo gráfico abaixo do título, com maior
extensão horizontal. O título do Padronizador passa para cima dos documentos.
Há três superfícies, menos rotação e nenhuma perspectiva do sistema; a metáfora
de dispersão → alinhamento permanece. Toque/tablet também reduz o número de
documentos e a amplitude, sem depender de hover. Metadados seguem no fluxo normal.

## Estrutura e traduções

Os trechos de contexto usam um array `sections` de `{ label, text, textEN }`.
Processo, decisões ou resultados futuros podem entrar nesse fluxo quando
forem fornecidos, sem redesenhar as cenas. Não há valores provisórios para esses
campos. `media` e `links` respeitam o estado vazio dos registros atuais.

O namespace `selectedWork` contém PT/EN para capítulo, contexto, estrutura,
atuação, estado, ano, instruções, legendas e encerramento. A apresentação factual
também é bilingue. Prodiesel mantém seu nome nos dois idiomas. O nome descritivo
do segundo projeto vira “CV Standardization” em EN, conforme o brief; Assurance
IT, Flutter, FastAPI, PostgreSQL, SQL Server, T-SQL, Python e Gemini preservam
a grafia. Automação recebe o equivalente Automation.

Arquivos deste passe:

- `src/components/selected-work/SelectedWork.jsx`: capítulo, duas cenas,
  informação progressiva e âncoras de leitura.
- `src/components/selected-work/SelectedWork.css`: arte, planos, documentos,
  metadados e composições responsivas.
- `src/components/selected-work/useSelectedWorkMotion.js`: efeitos e limpeza.
- `src/data/selectedWorkData.js`: seleção e trechos factuais PT/EN.
- `src/App.jsx`, `src/data/translations.js`: montagem e namespace de tradução.
- `README.md`, este relatório e `docs/previews/phase-04/`: escopo e evidências.

## Evidências

[Prodiesel desktop](previews/phase-04/desktop-prodisel.png),
[Padronizador desktop](previews/phase-04/desktop-cv.png),
[documentos alinhados](previews/phase-04/desktop-cv-aligned.png),
[Prodiesel mobile](previews/phase-04/mobile-prodisel.png),
[Padronizador mobile](previews/phase-04/mobile-cv.png),
[inglês](previews/phase-04/desktop-en-cv.png).

Resultados: [validação](previews/phase-04/validation.json).

Build de produção, ESLint e `git diff --check` passaram. Chrome headless verificou
desktop 1440×900 em PT/EN, notebook 1024×768, tablet 768×1024, mobile 390×844 e
320×740, além de toque em paisagem 844×390. Nenhum overflow horizontal ou erro
de página. Texto, âncoras/destinos por teclado, dois projetos, stacks exatas,
ausência de URLs/screenshots inventados e retorno por Craft → Origin → Hero
foram verificados. O bundle de produção também passou em PT e EN.

O alinhamento é reversível e termina com a folha principal inteira na viewport
em todos esses tamanhos. Seu ponto final usa a altura e os offsets reais da
folha; a largura é limitada pela altura disponível em telas curtas. Alternar
movimento reduzido remove/recria os efeitos sem acumular triggers: são dez
com movimento normal, com apenas o pin anterior do Hero, e zero com movimento
reduzido. Os documentos ficam estáticos e alinhados nessa preferência.

Impacto frente à Phase 03: JavaScript principal de 126,07 para **128,89 kB gzip**
(+2,82 kB); CSS de 5,88 para **7,77 kB gzip** (+1,89 kB). WebGL continua em
aproximadamente 248,39 kB gzip, com uma geometria e zero texturas, e é pausado
fora da Intro em `frameloop="demand"`. Nenhuma dependência ou imagem pesada
adicionada. Permanecem os avisos conhecidos de tamanho do chunk WebGL e idade
de baseline-browser-mapping. Verificação em Chrome headless, sem aparelhos
físicos ou Safari.
