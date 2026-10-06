# Prodiesel — correção factual de Selected Work

O resumo técnico fornecido pelo usuário substitui o conteúdo anterior do
projeto 3. A grafia **Prodiesel** segue a correção explícita anterior; o ID
interno `prodisel` continua estável. A composição, CSS e animações de Selected
Work foram preservados. O trabalho neste passe ficou restrito aos fatos,
associações de Craft e apresentação desses dados. Path já existia no início
do passe e seus arquivos, seletor e montagem permaneceram intactos.

Antes, o case era descrito como plataforma web genérica para substituir
planilhas, com liderança da Fase 1 e uma stack React/JavaScript/API mockada.
Agora, apresenta um **aplicativo Flutter para motoristas e transportadores de
leite**, com consulta de demonstrativos de pagamento, volume transportado e
coletas diárias. Arthur aparece como estagiário de desenvolvimento da Bioma,
com contribuição em equipe no fluxo completo:

**ERP legado → sincronização → API → aplicativo mobile.**

“Dos dados legados ao celular do motorista.” / “From legacy data to the
driver's phone.” abre o contexto dentro da estrutura tipográfica existente.
Propósito, fluxo e decisão de autenticação aparecem no scroll antes de atuação,
stack e estado do projeto. A arquitetura usa uma linha textual, sem novo
diagrama ou nova cena. O Padronizador de Currículos conserva seu conteúdo.

A stack visível tem cinco itens: **Flutter, FastAPI, PostgreSQL,
SQL Server / T-SQL e Python**. O registro central conserva 21 tecnologias
únicas, agrupadas por camada:

| Camada | Stack armazenada |
| --- | --- |
| Mobile | Flutter, Dart, MobX, flutter_modular, Dio, flutter_secure_storage, flutter_flavorizr |
| Backend | Python, FastAPI, SQLAlchemy, Alembic, PostgreSQL, JWT, bcrypt, pytest |
| Legado / dados | SQL Server, T-SQL |
| Integração | Python, PowerShell |
| Build | Codemagic, Gradle, Android SDK |

`project.caseStudy` armazena resumo, contexto, função, vínculo com a experiência
Bioma, equipe, arquitetura, stack, descoberta, implementação, testes, estado de
produção, desafio de engenharia, processo assistido por IA e notas de
divulgação. Os campos PT/EN são centralizados. Não foram inventados resultados
quantitativos, propriedade exclusiva, tamanho de equipe ou conclusões técnicas
de incidente que não constam no resumo recebido.

O protótipo inicial é identificado como **Flutter Web com FastAPI mockada**,
para validação do MVP. O produto principal é mobile. O estado confirmado é:
API e scripts de sincronização em produção; APK testado em dispositivo físico
apontando para produção; publicação nas lojas pendente. Não se afirma
lançamento público em Play Store ou App Store.

A descoberta sobre transportadores pessoa jurídica é descrita qualitativamente:
o login passou a aceitar CPF ou CNPJ, com associação automática entre conta e
motorista. O percentual agregado não foi incluído nem na interface nem nos
dados JavaScript públicos, pois não há confirmação de autorização para divulgar
o número. Também não foram incluídos nomes de clientes, nomes internos
desnecessários, documentos individuais, IDs, valores de folha, credenciais,
configurações privadas ou links de repositórios privados.

O incidente de produção envolvendo renomeação/estado do Alembic permanece
sanitizado no registro, junto da investigação de causa raiz e do rollback,
para aprofundamento futuro. O uso amplo de assistência de IA, incluindo
**Claude Code**, também está registrado como processo de desenvolvimento,
sem acrescentar um aviso à composição principal.

Craft mantém as cinco categorias e o mesmo comportamento. Foram acrescentados
FastAPI em Backend; SQL Server e T-SQL em Dados; PowerShell e Codemagic em
Ferramentas. O catálogo passa de 33 para 38 nomes. PostgreSQL agora reconhece
também o nome explícito `PostgreSQL`, além do alias `SQL / PostgreSQL`.

Prodiesel passa a aparecer nas referências de Flutter, Dart, Python, FastAPI,
PostgreSQL, SQL Server, T-SQL, PowerShell, Codemagic e JWT. React e JavaScript
perdem o vínculo com esse projeto. React permanece como competência declarada,
sem atribuição fictícia a outro projeto. React e Angular já tinham os rótulos
normalizados; a versão de Angular na Metryx continua não confirmada.

Bioma já tinha o cargo e período corretos: **Estagiário de Desenvolvimento,
agosto de 2026–presente**. O resumo PT/EN agora inclui suporte e integrações,
além de Flutter, SQL e colaboração. Foram acrescentadas responsabilidades em
EN. Não houve promoção de cargo nem cópia indiscriminada da stack do case para
a experiência inteira. A saída do IF e a entrada em ADS/Univiçosa continuam em
**2026**, sem mês inventado.

Arquivos alterados:

- `src/data/portfolioData.js`: Bioma, identidade e case técnico de Prodiesel.
- `src/data/selectedWorkData.js`: apresentação derivada dos dados verificados e
  separação entre stack visível e completa.
- `src/components/selected-work/SelectedWork.jsx`: renderização da stack visível.
- `src/data/craftData.js`: novos nomes e associações verificadas.
- `src/data/translations.js`: rótulos Produto/Decisão PT/EN, remoção do nome EN
  antigo do projeto em favor do `nameEN` central e da tradução obsoleta do mock.
- `README.md`, relatórios das fases 00/01, 03 e 04 e este documento: referências
  corrigidas e registro do passe.
- `docs/previews/phase-04-factual-correction/`: capturas e validação atual.

Build, lint e `git diff --check` passaram. A validação em Chrome headless
conferiu desktop PT/EN, tablet PT, mobile PT/EN e mobile EN de 320 px.
Foram verificados nomes, stack visível, estado de produção, atribuição de equipe,
relações de Craft por teclado, âncora do case, ausência de overflow e erros
JavaScript, fonte central e ausência de regressão na educação.

CSS e movimento de Selected Work e Craft, Hero, Origin, Path, tokens e App
mantêm os hashes do início deste passe. Nenhuma dependência ou canvas foi
adicionado. As capturas originais das fases anteriores permanecem históricas;
os fatos atuais estão no [relatório de validação deste passe](previews/phase-04-factual-correction/validation.json).

O passe termina nesta correção factual, aguardando a próxima aprovação.
