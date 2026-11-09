import type { L } from "./types";

/** Textos de interface e das páginas. */
export const copy = {
  meta: {
    home: {
      title: { pt: "Rheverson Urbiche — Dados, SAP Business One e IA aplicada", en: "Rheverson Urbiche — Data, SAP Business One and applied AI" },
    },
  },
  common: {
    skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
    menu: { pt: "Menu", en: "Menu" },
    close: { pt: "Fechar", en: "Close" },
    language: { pt: "Idioma", en: "Language" },
    switchTo: { pt: "Read in English", en: "Ler em português" },
    home: { pt: "Início", en: "Home" },
    allWork: { pt: "Ver todos os projetos", en: "See all work" },
    openCase: { pt: "Ler o estudo de caso", en: "Read the case study" },
    contact: { pt: "Falar comigo", en: "Get in touch" },
    downloadCv: { pt: "Baixar currículo (PDF)", en: "Download résumé (PDF)" },
    external: { pt: "abre em nova aba", en: "opens in a new tab" },
    source: { pt: "Fonte", en: "Source" },
    footerLine: { pt: "Feito com Next.js, código aberto no GitHub.", en: "Built with Next.js, open source on GitHub." },
    viewSource: { pt: "Código deste site", en: "This site's code" },
  },
  home: {
    kicker: {
      pt: "Analista de TI numa indústria de painéis de LED. Construo pipelines de dados, sistemas integrados ao SAP Business One e produtos com IA.",
      en: "IT analyst at an LED panel manufacturer. I build data pipelines, systems integrated with SAP Business One and AI-powered products.",
    },
    statement: { pt: "Do ERP à decisão.", en: "From ERP to decision." },
    ctaWork: { pt: "Ver projetos", en: "See the work" },
    ctaContact: { pt: "Conversar", en: "Let's talk" },
    signalCaption: {
      pt: "O painel ao fundo desenha meus commits de 2026, semana a semana. Passe o cursor para separar o sinal do ruído.",
      en: "The panel behind draws my 2026 commits, week by week. Move the cursor to pull the signal out of the noise.",
    },
    proofsTitle: { pt: "Três frentes, um mesmo método", en: "Three fronts, one method" },
    proofs: [
      {
        title: { pt: "Dados", en: "Data" },
        body: {
          pt: "Tiro os dados do SAP sem pesar na operação, organizo em camadas conferidas e treino modelos medidos com honestidade.",
          en: "I get data out of SAP without burdening operations, organize it into verified layers and train honestly measured models.",
        },
        fact: { pt: "Lift de 4,2× na fila comercial", en: "4.2× lift on the sales queue" },
        href: "/work/propensao-compra",
      },
      {
        title: { pt: "Sistemas", en: "Systems" },
        body: {
          pt: "Construo sistemas sobre o ERP: o SAP continua sendo o registro, e as pessoas trabalham onde é mais simples.",
          en: "I build systems on top of the ERP: SAP stays the record, and people work where it's simpler.",
        },
        fact: { pt: "R$ 20.160 em licenças SAP economizados", en: "R$ 20,160 saved in SAP licenses" },
        href: "/work/portal-operacoes-sap",
      },
      {
        title: { pt: "Produtos", en: "Products" },
        body: {
          pt: "Levo ideias até a produção: autenticação, pagamentos, regras de acesso, IA e testes — sem equipe.",
          en: "I take ideas to production: authentication, payments, access rules, AI and tests — without a team.",
        },
        fact: { pt: "Três negócios próprios no ar", en: "Three own businesses live" },
        href: "/work",
      },
    ],
    workTitle: { pt: "Projetos selecionados", en: "Selected work" },
    numbersTitle: { pt: "Números que dá para conferir", en: "Numbers you can check" },
    numbersLink: { pt: "Ver resultados e fontes", en: "See results and sources" },
    skillsTitle: { pt: "Onde atuo", en: "What I work with" },
    skillsLink: { pt: "Ver todas as competências", en: "See all skills" },
    paths: {
      recruiters: {
        title: { pt: "Para recrutadores", en: "For recruiters" },
        body: {
          pt: "Procuro posições em dados, BI, engenharia de dados ou sistemas corporativos, em que SAP, dados e desenvolvimento se encontram.",
          en: "I'm looking for roles in data, BI, data engineering or enterprise systems — where SAP, data and development meet.",
        },
        primary: { pt: "Baixar currículo", en: "Download résumé" },
        secondary: { pt: "Ver trajetória", en: "See my path" },
      },
      companies: {
        title: { pt: "Para empresas", en: "For companies" },
        body: {
          pt: "Resolvo problemas de dados, SAP Business One, automação e IA de ponta a ponta — do levantamento à entrega.",
          en: "I solve data, SAP Business One, automation and AI problems end to end — from discovery to delivery.",
        },
        primary: { pt: "Ver serviços", en: "See services" },
        secondary: { pt: "Propor um projeto", en: "Propose a project" },
      },
    },
  },
  work: {
    title: { pt: "Projetos", en: "Work" },
    intro: {
      pt: "Sete projetos com evidência concreta: dois internos de uma indústria, apresentados sem dados confidenciais, três negócios próprios, um projeto para cliente e um estudo pessoal.",
      en: "Seven projects backed by concrete evidence: two internal to a manufacturer, shown without confidential data, three of my own businesses, one client project and one personal study.",
    },
    filterLabel: { pt: "Filtrar por tipo", en: "Filter by type" },
    all: { pt: "Todos", en: "All" },
    sections: {
      context: { pt: "Contexto", en: "Context" },
      problem: { pt: "Problema", en: "Problem" },
      goal: { pt: "Objetivo", en: "Goal" },
      role: { pt: "Minha participação", en: "My role" },
      strategy: { pt: "Estratégia", en: "Strategy" },
      solution: { pt: "Solução", en: "Solution" },
      architecture: { pt: "Arquitetura", en: "Architecture" },
      results: { pt: "Resultados", en: "Results" },
      lesson: { pt: "O que aprendi", en: "What I learned" },
      gallery: { pt: "Telas", en: "Screens" },
      links: { pt: "Links", en: "Links" },
    },
    meta: {
      type: { pt: "Tipo", en: "Type" },
      period: { pt: "Período", en: "Period" },
      team: { pt: "Equipe", en: "Team" },
      stack: { pt: "Tecnologias", en: "Stack" },
    },
    privateNote: {
      pt: "Repositório privado e sem demonstração pública. Posso mostrar detalhes técnicos numa conversa.",
      en: "Private repository with no public demo. I'm happy to walk through the technical details in a conversation.",
    },
    next: { pt: "Próximo projeto", en: "Next project" },
    onThisPage: { pt: "Nesta página", en: "On this page" },
  },
  about: {
    title: { pt: "Sobre", en: "About" },
    lead: {
      pt: "Comecei conferindo impostos e notas fiscais. Hoje construo os sistemas e os modelos que leem esses mesmos dados.",
      en: "I started out checking taxes and invoices. Today I build the systems and models that read that same data.",
    },
    chapters: [
      {
        title: { pt: "Antes do código, o negócio", en: "Business before code" },
        body: {
          pt: "Na Makita do Brasil, entre 2019 e 2021, trabalhei com contas a pagar, conciliação bancária, notas fiscais e impostos no TOTVS. Foi ali que aprendi como um ERP registra a vida de uma empresa — e quanto trabalho manual existe em volta dele.",
          en: "At Makita do Brasil, from 2019 to 2021, I worked on accounts payable, bank reconciliation, invoices and taxes in TOTVS. That's where I learned how an ERP records a company's life — and how much manual work surrounds it.",
        },
      },
      {
        title: { pt: "Do comercial para a TI", en: "From sales to IT" },
        body: {
          pt: "Entrei na Sigpel em 2023 como assistente comercial, acompanhando o caminho dos pedidos no SAP Business One entre comercial, compras, produção e estoque. Comecei a montar relatórios de BI para a diretoria e, em 2024, fui promovido a Analista de TI.",
          en: "I joined Sigpel in 2023 as a sales assistant, tracking orders through SAP Business One across sales, purchasing, production and inventory. I started building BI reports for leadership and, in 2024, was promoted to IT Analyst.",
        },
      },
      {
        title: { pt: "Dados, sistemas e IA", en: "Data, systems and AI" },
        body: {
          pt: "Como analista, passei a cuidar do SAP, dos dashboards e dos sistemas internos. Construí um portal de operações sobre o ERP e um pipeline do SAP HANA até um lakehouse com modelo de propensão. Em paralelo, lancei produtos próprios com pagamentos, apps e IA, e comecei a graduação em Ciência de Dados.",
          en: "As an analyst, I took on SAP, dashboards and internal systems. I built an operations portal on top of the ERP and a pipeline from SAP HANA to a lakehouse with a propensity model. In parallel, I launched my own products with payments, apps and AI, and started a Data Science degree.",
        },
      },
    ],
    philosophyTitle: { pt: "Como trabalho", en: "How I work" },
    philosophy: [
      {
        title: { pt: "O número tem que bater", en: "The number has to match" },
        body: { pt: "Antes de qualquer gráfico ou modelo, os dados são conciliados com a fonte. Se não bate com o ERP, não vai para a diretoria.", en: "Before any chart or model, data is reconciled with the source. If it doesn't match the ERP, it doesn't go to leadership." },
      },
      {
        title: { pt: "A verdade menor vale mais", en: "A smaller truth is worth more" },
        body: { pt: "Prefiro publicar um ROC-AUC de 0,76 auditado a um 0,905 com vazamento. Confiança se perde uma vez só.", en: "I'd rather report an audited 0.76 ROC-AUC than a leaky 0.905. Trust is lost only once." },
      },
      {
        title: { pt: "O ERP é o registro, não a prisão", en: "The ERP is the record, not a cage" },
        body: { pt: "O SAP guarda a verdade; as pessoas trabalham onde for mais simples, com leitura direta e escrita por canais oficiais.", en: "SAP holds the truth; people work wherever it's simplest, with direct reads and writes through official channels." },
      },
      {
        title: { pt: "IA com limites claros", en: "AI with clear boundaries" },
        body: { pt: "Uso agentes para construir mais rápido e coloco IA nos produtos, sempre com ferramentas controladas, evidência e revisão humana.", en: "I use agents to build faster and put AI into products, always with controlled tools, evidence and human review." },
      },
    ],
    problemsTitle: { pt: "Problemas de que gosto", en: "Problems I enjoy" },
    problems: [
      { pt: "Dados presos num ERP que ninguém consegue usar.", en: "Data locked in an ERP nobody can use." },
      { pt: "Rotinas manuais que se repetem toda semana.", en: "Manual routines repeated every week." },
      { pt: "Decisões comerciais tomadas no feeling.", en: "Sales decisions made on gut feeling." },
      { pt: "Ideias que precisam virar produto funcionando.", en: "Ideas that need to become working products." },
    ],
    goalsTitle: { pt: "Para onde estou indo", en: "Where I'm heading" },
    goals: {
      pt: "Quero aprofundar engenharia de dados e machine learning aplicados a operações industriais e comerciais, em equipes que tratam dados como produto. Também atendo empresas que precisam conectar SAP Business One, dados e IA.",
      en: "I want to go deeper into data engineering and machine learning applied to industrial and commercial operations, in teams that treat data as a product. I also work with companies that need to connect SAP Business One, data and AI.",
    },
    educationTitle: { pt: "Formação", en: "Education" },
    languagesTitle: { pt: "Idiomas", en: "Languages" },
  },
  experience: {
    title: { pt: "Experiência", en: "Experience" },
    intro: {
      pt: "De rotinas fiscais a pipelines de dados: cada etapa ampliou o alcance do que eu entrego.",
      en: "From tax routines to data pipelines: each step widened the reach of what I deliver.",
    },
    related: { pt: "Projetos relacionados", en: "Related projects" },
  },
  skills: {
    title: { pt: "Competências", en: "Skills" },
    intro: {
      pt: "Sem barras de porcentagem. Cada tecnologia aparece com o uso que fiz dela e o projeto onde dá para ver.",
      en: "No percentage bars. Each technology shows how I've used it and the project where you can see it.",
    },
    usedIn: { pt: "Usado em", en: "Used in" },
  },
  impact: {
    title: { pt: "Resultados", en: "Impact" },
    intro: {
      pt: "Só entram aqui números com origem conhecida — um arquivo de projeto, a API do GitHub ou um valor informado por mim. Cada um mostra a fonte.",
      en: "Only numbers with a known origin make it here — a project file, the GitHub API or a figure I reported myself. Each one shows its source.",
    },
    licenseTitle: { pt: "Licenças que deixaram de ser necessárias", en: "Licenses no longer needed" },
    licenseBody: {
      pt: "As solicitações de compra passaram a ser feitas no portal de operações e lançadas no SAP pelo Service Layer. Quem só solicitava deixou de precisar de licença do ERP.",
      en: "Purchase requests moved to the operations portal and are posted to SAP through the Service Layer. People who only filed requests no longer needed an ERP license.",
    },
    modelTitle: { pt: "Um modelo medido contra o óbvio", en: "A model measured against the obvious" },
    modelBody: {
      pt: "Lift nos 10% de clientes mais bem ranqueados, em backtest walk-forward de 6 meses. O gradient boosting empata com regressão logística e com RFM — e os três ficam perto de 4× acima do aleatório. A comparação é o que dá credibilidade à fila.",
      en: "Lift in the top-ranked 10% of customers, over a 6-month walk-forward backtest. Gradient boosting ties with logistic regression and RFM — and all three land near 4× above random. The comparison is what makes the queue credible.",
    },
    leakTitle: { pt: "A auditoria que derrubou a métrica", en: "The audit that brought the metric down" },
    leakBody: {
      pt: "Vazamento ponto-no-tempo e validação cruzada sem ordem temporal inflavam o resultado. Depois da correção, o ROC-AUC caiu de 0,905 para cerca de 0,76.",
      en: "Point-in-time leakage and time-blind cross-validation inflated the score. After the fix, ROC-AUC dropped from 0.905 to about 0.76.",
    },
    before: { pt: "Antes", en: "Before" },
    after: { pt: "Depois", en: "After" },
    timelineTitle: { pt: "Um ano construindo", en: "A year of building" },
    timelineBody: {
      pt: "Commits por semana em 2026 nos repositórios apresentados. Cada ponto aceso é uma semana com entrega.",
      en: "Commits per week in 2026 across the featured repositories. Each lit dot is a week with something shipped.",
    },
    commits: { pt: "commits", en: "commits" },
    deliveredTitle: { pt: "O que está entregue", en: "What's delivered" },
    collected: { pt: "Dados coletados em", en: "Data collected on" },
  },
  services: {
    title: { pt: "Serviços", en: "Services" },
    intro: {
      pt: "Cada serviço parte de um problema que já resolvi. O link ao lado mostra onde.",
      en: "Each service starts from a problem I've already solved. The link next to it shows where.",
    },
    proof: { pt: "Prova", en: "Proof" },
    ctaTitle: { pt: "Tem um problema parecido?", en: "Have a similar problem?" },
    ctaBody: {
      pt: "Conte o contexto em poucas linhas. Respondo com perguntas, uma primeira abordagem e o que seria necessário.",
      en: "Describe the context in a few lines. I'll reply with questions, a first approach and what it would take.",
    },
  },
  contact: {
    title: { pt: "Contato", en: "Contact" },
    lead: { pt: "Vamos conversar.", en: "Let's talk." },
    intro: {
      pt: "Para vagas, projetos ou uma conversa sobre dados e SAP. Respondo por e-mail ou LinkedIn.",
      en: "For roles, projects or a conversation about data and SAP. I reply by email or LinkedIn.",
    },
    copy: { pt: "Copiar e-mail", en: "Copy email" },
    copied: { pt: "E-mail copiado", en: "Email copied" },
    formTitle: { pt: "Escreva sua mensagem", en: "Write your message" },
    formNote: {
      pt: "O formulário monta o e-mail no seu aplicativo de correio. Nada é enviado ou armazenado por este site.",
      en: "The form drafts the email in your mail app. Nothing is sent or stored by this site.",
    },
    intent: { pt: "Assunto", en: "Topic" },
    intentRecruiter: { pt: "Oportunidade de trabalho", en: "Job opportunity" },
    intentCompany: { pt: "Projeto ou consultoria", en: "Project or consulting" },
    intentOther: { pt: "Outro assunto", en: "Something else" },
    name: { pt: "Seu nome", en: "Your name" },
    org: { pt: "Empresa (opcional)", en: "Company (optional)" },
    message: { pt: "Mensagem", en: "Message" },
    send: { pt: "Abrir no meu e-mail", en: "Open in my email app" },
    required: { pt: "Preencha seu nome e a mensagem.", en: "Fill in your name and message." },
    cvTitle: { pt: "Currículo", en: "Résumé" },
    cvPt: { pt: "Português (PDF)", en: "Portuguese (PDF)" },
    cvEn: { pt: "Inglês (PDF)", en: "English (PDF)" },
    elsewhere: { pt: "Outros canais", en: "Elsewhere" },
  },
  notFound: {
    title: { pt: "Sinal perdido.", en: "Signal lost." },
    body: { pt: "Esta página não existe ou mudou de lugar.", en: "This page doesn't exist or has moved." },
    back: { pt: "Voltar ao início", en: "Back to home" },
  },
} satisfies Record<string, Record<string, unknown>>;

export type Copy = typeof copy;
export type Text = L;
