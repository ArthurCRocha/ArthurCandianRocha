# Arthur Rocha — Portfolio 2026

Portfólio pessoal em React + Vite. Redesign incremental inspirado em papel,
tinta e composição editorial. **Escopo atual: Intro, Origin, Craft, Selected Work, Path e Now aprovados + Phase 07 (Connect).**

```sh
npm ci
npm run dev
```

Abra a URL indicada pelo Vite, normalmente `http://localhost:5173`.
Node 20.19+ ou 22.12+ é compatível com a versão instalada do Vite.

```sh
npm run build
npx eslint .
npm run preview
```

O fluxo Docker existente continua disponível: `docker compose up dev`.
O Netlify continua usando `npm run build` e publicando `dist`.

- Dados factuais: `src/data/portfolioData.js`.
- Texto PT/EN: `src/data/translations.js`.
- Tokens: `src/styles/tokens.css`; base global: `src/index.css`.
- Intro: `src/components/hero/`; navegação: `src/components/Nav.jsx`.
- Craft: `src/components/craft/`; catálogo factual: `src/data/craftData.js`.
- Selected Work: `src/components/selected-work/`; seleção: `src/data/selectedWorkData.js`.
- Path: `src/components/path/`; seleção cronológica: `src/data/pathData.js`.
- Now: `src/components/now/`; seleção do presente: `src/data/nowData.js`.
- Connect: `src/components/connect/`; contatos públicos: `src/data/connectData.js`.
- Composição ativa e encerramento: `src/App.css`.
- CSS antigo arquivado, sem importação: `src/legacy/`.

A página renderiza a navegação mínima, a Intro, Origin, Craft, Selected Work, Path, Now e Connect. Uma passagem curta de
scroll transforma a composição inicial e revela a narrativa no mesmo espaço.
Origin segue com scroll nativo e termina em uma estrutura gráfica discreta.
Craft continua essas linhas em um catálogo tipográfico com contexto por
hover/foco no desktop e expansão da linha por toque em telas menores.
Selected Work apresenta Prodiesel e Padronizador de Currículos no scroll principal,
com planos de sistema e documentos abstratos que se alinham. Os projetos ainda
não têm screenshots ou links nos dados; não foram criados substitutos fictícios.
Prodiesel é um aplicativo Flutter para transportadores de leite, com atuação
colaborativa no fluxo ERP legado → sincronização → API → mobile. A stack
visível tem cinco tecnologias; o registro central conserva as 21 tecnologias
confirmadas, protótipo, testes, produção e contexto de equipe.
Path continua o traço de Selected Work em uma composição editorial com seis
experiências profissionais, três formações e o antecedente audiovisual do
Cineclube. As datas acadêmicas de 2026 conservam a precisão de ano; formação e
trabalho atuais são apresentados em paralelo. A composição mobile tem um
percurso próprio e movimento reduzido exibe o caminho completo e estático.
Now oferece uma pausa: três frases estáticas, espaço e apenas dois contextos
atuais, ADS na Univiçosa desde 2026 e estágio de desenvolvimento na Bioma
desde agosto de 2026. A seleção lê os registros centrais e só admite registros
marcados como atuais e sem encerramento. O traço de Path retorna mais leve;
uma pequena mancha vermelha começa a crescer no final. Não há pin, canvas ou
dependência nova em Now. Movimento reduzido mantém a composição estática.
Connect continua a expansão do próprio SVG de Now até o vermelho preencher
a tela. A frase final e os links de email, LinkedIn e GitHub ficam sobre o
campo vermelho com a textura existente. O capítulo inclui controle local
PT/EN e retorno nativo ao início. Ele próprio é o rodapé; não há seção depois.
Movimento reduzido apresenta diretamente o campo vermelho e seus contatos.
As seções antigas e seus assets ficam no repositório para referência,
sem fazer parte da interface renderizada. A página termina em Connect.
A Phase 07 aguarda a revisão final do portfólio.

Veja [auditoria, decisões e validação](docs/PHASE-00-01.md).
O último passe de arte, movimento e WebGL está documentado em
[Phase 01 — refinamento](docs/PHASE-01-REFINEMENT.md).
Veja [Phase 02 — Origin](docs/PHASE-02-ORIGIN.md),
[Phase 03 — Craft](docs/PHASE-03-CRAFT.md),
[Phase 04 — Selected Work](docs/PHASE-04-SELECTED-WORK.md),
[Phase 05 — Path](docs/PHASE-05-PATH.md),
[Phase 06 — Now](docs/PHASE-06-NOW.md) e a implementação atual em
[Phase 07 — Connect](docs/PHASE-07-CONNECT.md).

O passe factual mais recente está em
[Prodiesel — correção do case](docs/PHASE-04-FACTUAL-CORRECTION.md).
