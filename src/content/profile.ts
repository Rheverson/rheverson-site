import type { L } from "./types";

export type Role = {
  company: string;
  title: L;
  period: string;
  summary: L;
  items: L[];
  tech: string[];
  /** Projetos que comprovam a experiência. */
  projects?: string[];
};

export const experience: Role[] = [
  {
    company: "Sigpel — Indústria de Painéis de LED",
    title: { pt: "Analista de TI", en: "IT Analyst" },
    period: "2024 — atual",
    summary: {
      pt: "Promovido de Assistente Comercial pela atuação em projetos de integração e BI. Responsável pelo SAP Business One, pelos dados da empresa e pelos sistemas internos.",
      en: "Promoted from Sales Assistant for my work on integration and BI projects. Responsible for SAP Business One, company data and internal systems.",
    },
    items: [
      { pt: "Administração e suporte aos processos do SAP Business One, com consultas SQL e relatórios para a tomada de decisão.", en: "Administer and support SAP Business One processes, with SQL queries and reports for decision-making." },
      { pt: "Dashboards e indicadores em Power BI (Power Query, modelagem e DAX) para a gestão e a diretoria.", en: "Power BI dashboards and KPIs (Power Query, modeling and DAX) for management and leadership." },
      { pt: "Portal interno de operações integrado ao SAP B1: 18 módulos, leitura no HANA e escrita pelo Service Layer.", en: "Internal operations portal integrated with SAP B1: 18 apps, reads from HANA and writes through the Service Layer." },
      { pt: "Pipeline SAP HANA → Databricks e modelo de propensão de compra com auditoria de vazamento.", en: "SAP HANA → Databricks pipeline and a purchase-propensity model with a leakage audit." },
      { pt: "Controles internos e automação de rotinas manuais a partir do levantamento de requisitos com as áreas.", en: "Internal controls and automation of manual routines, based on requirements gathered with each department." },
    ],
    tech: ["SAP Business One", "SAP HANA", "SQL", "Power BI", "Python", "Django", "Databricks"],
    projects: ["portal-operacoes-sap", "propensao-compra"],
  },
  {
    company: "Sigpel — Indústria de Painéis de LED",
    title: { pt: "Assistente Comercial", en: "Sales Assistant" },
    period: "2023 — 2024",
    summary: {
      pt: "Primeiro contato com o SAP pela ótica do negócio: o caminho do pedido entre comercial, compras, produção e estoque.",
      en: "My first contact with SAP from the business side: the order's path across sales, purchasing, production and inventory.",
    },
    items: [
      { pt: "Acompanhamento de pedidos e supervisão da integração do SAP entre comercial, compras, produção e estoque.", en: "Tracked orders and supervised SAP integration across sales, purchasing, production and inventory." },
      { pt: "Relatórios de BI integrados ao SAP para acompanhamento da diretoria.", en: "Built BI reports integrated with SAP for leadership monitoring." },
    ],
    tech: ["SAP Business One", "Power BI", "Excel"],
  },
  {
    company: "Projetos próprios e para clientes",
    title: { pt: "Desenvolvedor independente", en: "Independent developer" },
    period: "2025 — atual",
    summary: {
      pt: "Em paralelo, produtos digitais próprios e projetos para clientes — do banco de dados aos pagamentos.",
      en: "In parallel, my own digital products and client projects — from the database to payments.",
    },
    items: [
      { pt: "PlanejeApp: finanças pessoais com IA, apps Android e iOS e assinaturas.", en: "PlanejeApp: AI personal finance, Android and iOS apps and subscriptions." },
      { pt: "TudoParaEventos: marketplace de fornecedores de eventos com agentes de IA.", en: "TudoParaEventos: event-supplier marketplace with AI agents." },
      { pt: "Kluska: e-commerce próprio com Pix, frete e ERP leve.", en: "Kluska: own e-commerce with Pix, shipping and a lightweight ERP." },
      { pt: "Site WordPress para uma editora, com publicação testada e rollback automático.", en: "WordPress site for a publisher, with tested releases and automatic rollback." },
    ],
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Stripe", "WordPress"],
    projects: ["planejapp", "tudoparaeventos", "kluska", "editora-wordpress"],
  },
  {
    company: "Makita do Brasil",
    title: { pt: "Assistente Fiscal", en: "Tax Assistant" },
    period: "2020 — 2021",
    summary: {
      pt: "A base que hoje uso para entender dados de ERP: impostos, notas e conformidade.",
      en: "The groundwork I now use to read ERP data: taxes, invoices and compliance.",
    },
    items: [
      { pt: "Conferência e lançamento de impostos (PIS, COFINS, ICMS e outros), garantindo conformidade tributária e contábil.", en: "Reviewed and posted taxes (PIS, COFINS, ICMS and others), ensuring tax and accounting compliance." },
    ],
    tech: ["TOTVS", "Excel"],
  },
  {
    company: "Makita do Brasil",
    title: { pt: "Assistente Administrativo", en: "Administrative Assistant" },
    period: "2019 — 2020",
    summary: {
      pt: "Rotinas financeiras e documentais em ERP e planilhas.",
      en: "Finance and document routines in an ERP and spreadsheets.",
    },
    items: [
      { pt: "Contas a pagar em Excel, conciliação de extratos bancários e gestão de notas fiscais no TOTVS.", en: "Accounts payable in Excel, bank reconciliation and invoice management in TOTVS." },
    ],
    tech: ["TOTVS", "Excel"],
  },
  {
    company: "IJCSUD — Bahia",
    title: { pt: "Voluntário", en: "Volunteer" },
    period: "2021 — 2023",
    summary: {
      pt: "Dois anos ensinando e formando pessoas — onde aprendi a explicar o complexo de forma simples.",
      en: "Two years teaching and training people — where I learned to explain complex things simply.",
    },
    items: [
      { pt: "Ensino e acompanhamento diário de pessoas no desenvolvimento de habilidades essenciais; treinamento de outros voluntários.", en: "Daily teaching and mentoring in essential skills; trained other volunteers." },
    ],
    tech: [],
  },
];

export const education: { course: L; school: string; period: L }[] = [
  { course: { pt: "Ciência de Dados", en: "Data Science" }, school: "Gran Faculdade", period: { pt: "2025 — cursando", en: "2025 — in progress" } },
  { course: { pt: "Business Management", en: "Business Management" }, school: "Brigham Young University", period: { pt: "Concluído em 2024", en: "Completed 2024" } },
  { course: { pt: "General Skills", en: "General Skills" }, school: "BYU-Pathway Worldwide", period: { pt: "2023 — 2024", en: "2023 — 2024" } },
  { course: { pt: "Assistente Administrativo", en: "Administrative Assistant" }, school: "SENAI", period: { pt: "2019 — 2020", en: "2019 — 2020" } },
];

export const languages: { name: L; level: L }[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
  { name: { pt: "Inglês", en: "English" }, level: { pt: "Intermediário", en: "Intermediate" } },
];

export type SkillGroup = {
  id: string;
  title: L;
  intro: L;
  skills: { name: string | L; use: L; projects?: string[] }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "sap",
    title: { pt: "SAP e sistemas corporativos", en: "SAP and enterprise systems" },
    intro: { pt: "O ponto de partida: entender o ERP por dentro.", en: "The starting point: knowing the ERP from the inside." },
    skills: [
      { name: "SAP Business One", use: { pt: "Administração, configuração, suporte e relatórios", en: "Administration, configuration, support and reporting" }, projects: ["portal-operacoes-sap", "propensao-compra"] },
      { name: "SAP HANA", use: { pt: "SQL de leitura, views e extração para o lakehouse", en: "Read SQL, views and extraction to the lakehouse" }, projects: ["portal-operacoes-sap", "propensao-compra"] },
      { name: "Service Layer", use: { pt: "Escrita segura no SAP B1 via REST", en: "Safe writes to SAP B1 via REST" }, projects: ["portal-operacoes-sap"] },
      { name: "TOTVS", use: { pt: "Notas fiscais e rotinas financeiras", en: "Invoices and finance routines" } },
    ],
  },
  {
    id: "data",
    title: { pt: "Dados e analytics", en: "Data and analytics" },
    intro: { pt: "Perguntas de negócio respondidas com consultas que batem com o ERP.", en: "Business questions answered with queries that match the ERP." },
    skills: [
      { name: "SQL", use: { pt: "SAP HANA, PostgreSQL e Databricks SQL", en: "SAP HANA, PostgreSQL and Databricks SQL" }, projects: ["propensao-compra", "portal-operacoes-sap", "lucroradar-ai"] },
      { name: "Python", use: { pt: "pandas, PySpark, automação e APIs", en: "pandas, PySpark, automation and APIs" }, projects: ["propensao-compra", "portal-operacoes-sap"] },
      { name: "Excel", use: { pt: "Tabelas dinâmicas, conciliações e análises", en: "Pivot tables, reconciliations and analysis" } },
      { name: { pt: "Perfilamento de dados", en: "Data profiling" }, use: { pt: "Qualidade, contagens e armadilhas de origem", en: "Quality, counts and source pitfalls" }, projects: ["propensao-compra"] },
    ],
  },
  {
    id: "bi",
    title: { pt: "Business Intelligence", en: "Business Intelligence" },
    intro: { pt: "Indicadores que a diretoria usa para decidir.", en: "Indicators leadership actually uses to decide." },
    skills: [
      { name: "Power BI", use: { pt: "Power Query, modelagem de dados e DAX", en: "Power Query, data modeling and DAX" } },
      { name: "Databricks Lakeview", use: { pt: "Dashboard da fila comercial", en: "Sales-queue dashboard" }, projects: ["propensao-compra"] },
      { name: { pt: "Relatórios operacionais", en: "Operational reporting" }, use: { pt: "Status de pedidos e OTIF a partir de views do SAP", en: "Order status and OTIF from SAP views" }, projects: ["portal-operacoes-sap"] },
      { name: "Recharts", use: { pt: "Visualizações em aplicações web", en: "Charts in web applications" }, projects: ["lucroradar-ai"] },
    ],
  },
  {
    id: "engineering",
    title: { pt: "Engenharia de dados e bancos", en: "Data engineering and databases" },
    intro: { pt: "Camadas confiáveis entre a fonte e a decisão.", en: "Trustworthy layers between source and decision." },
    skills: [
      { name: "Databricks", use: { pt: "Jobs, Volumes e Asset Bundles", en: "Jobs, Volumes and Asset Bundles" }, projects: ["propensao-compra"] },
      { name: { pt: "Delta Lake e Unity Catalog", en: "Delta Lake and Unity Catalog" }, use: { pt: "Arquitetura Bronze, Silver e Gold", en: "Bronze, Silver and Gold architecture" }, projects: ["propensao-compra"] },
      { name: "dbt", use: { pt: "Modelos em camadas e testes de dados", en: "Layered models and data tests" }, projects: ["lucroradar-ai"] },
      { name: { pt: "PostgreSQL e Supabase", en: "PostgreSQL and Supabase" }, use: { pt: "Row Level Security, funções e migrations", en: "Row Level Security, functions and migrations" }, projects: ["planejapp", "tudoparaeventos", "kluska"] },
    ],
  },
  {
    id: "ml",
    title: { pt: "Ciência de dados e machine learning", en: "Data science and machine learning" },
    intro: { pt: "Modelos medidos com honestidade, contra baselines simples.", en: "Models measured honestly, against simple baselines." },
    skills: [
      { name: "scikit-learn", use: { pt: "Gradient boosting, calibração e regressão logística", en: "Gradient boosting, calibration and logistic regression" }, projects: ["propensao-compra"] },
      { name: { pt: "Validação temporal", en: "Time-aware validation" }, use: { pt: "Walk-forward e features ponto-no-tempo", en: "Walk-forward and point-in-time features" }, projects: ["propensao-compra"] },
      { name: "MLflow", use: { pt: "Registro e versionamento de modelos", en: "Model registry and versioning" }, projects: ["propensao-compra"] },
      { name: { pt: "Modelos de propensão", en: "Propensity models" }, use: { pt: "Priorização da carteira de clientes", en: "Customer-base prioritization" }, projects: ["propensao-compra"] },
    ],
  },
  {
    id: "ai",
    title: { pt: "IA e automação", en: "AI and automation" },
    intro: { pt: "IA com limites claros, em fluxos reais.", en: "AI with clear boundaries, in real workflows." },
    skills: [
      { name: { pt: "Copilotos com ferramentas", en: "Tool-using copilots" }, use: { pt: "Claude com ferramentas controladas sobre dados", en: "Claude with controlled tools over data" }, projects: ["lucroradar-ai"] },
      { name: { pt: "LLMs em produção", en: "LLMs in production" }, use: { pt: "Fallback entre provedores e timeouts", en: "Cross-provider fallback and timeouts" }, projects: ["planejapp"] },
      { name: { pt: "Agentes de IA", en: "AI agents" }, use: { pt: "Conteúdo e prospecção com revisão humana", en: "Content and prospecting with human review" }, projects: ["tudoparaeventos"] },
      { name: "Genie (Databricks)", use: { pt: "Perguntas em linguagem natural sobre a fila comercial", en: "Natural-language questions about the sales queue" }, projects: ["propensao-compra"] },
      { name: { pt: "Automação", en: "Automation" }, use: { pt: "Agendadores, n8n e rotinas noturnas", en: "Schedulers, n8n and nightly routines" }, projects: ["portal-operacoes-sap", "lucroradar-ai"] },
      { name: { pt: "Desenvolvimento com agentes", en: "Agent-assisted development" }, use: { pt: "Claude Code para construir, revisar e testar", en: "Claude Code to build, review and test" }, projects: ["lucroradar-ai"] },
    ],
  },
  {
    id: "software",
    title: { pt: "Desenvolvimento de software", en: "Software development" },
    intro: { pt: "Sistemas completos, do banco aos pagamentos.", en: "Complete systems, from database to payments." },
    skills: [
      { name: { pt: "Django e htmx", en: "Django and htmx" }, use: { pt: "Sistema interno integrado ao ERP", en: "Internal system integrated with the ERP" }, projects: ["portal-operacoes-sap"] },
      { name: { pt: "Next.js, React e TypeScript", en: "Next.js, React and TypeScript" }, use: { pt: "Marketplace, BI web e este site", en: "Marketplace, web BI and this site" }, projects: ["tudoparaeventos", "lucroradar-ai"] },
      { name: "Capacitor", use: { pt: "Apps Android e iOS a partir do mesmo código", en: "Android and iOS apps from one codebase" }, projects: ["planejapp"] },
      { name: "FastAPI", use: { pt: "API de leitura para analytics", en: "Read API for analytics" }, projects: ["lucroradar-ai"] },
      { name: { pt: "Pagamentos e integrações", en: "Payments and integrations" }, use: { pt: "Stripe, Mercado Pago, Pix e Melhor Envio", en: "Stripe, Mercado Pago, Pix and Melhor Envio" }, projects: ["planejapp", "tudoparaeventos", "kluska"] },
      { name: "WordPress", use: { pt: "Tema em blocos e plugin próprio", en: "Block theme and custom plugin" }, projects: ["editora-wordpress"] },
      { name: { pt: "Testes automatizados", en: "Automated testing" }, use: { pt: "Playwright, pytest, Vitest e testes SQL", en: "Playwright, pytest, Vitest and SQL tests" }, projects: ["planejapp", "tudoparaeventos", "lucroradar-ai"] },
    ],
  },
];

export type Service = { id: string; problem: L; title: L; body: L; proof: string[] };

export const services: Service[] = [
  {
    id: "sap",
    problem: { pt: "O SAP tem os dados, mas ninguém consegue tirá-los de lá do jeito certo.", en: "SAP has the data, but nobody can get it out the right way." },
    title: { pt: "Consultas, relatórios e integrações com SAP Business One", en: "SAP Business One queries, reports and integrations" },
    body: {
      pt: "SQL no SAP HANA, views, relatórios e integrações pelo Service Layer — lendo do ERP sem pesar na operação e escrevendo por canais oficiais.",
      en: "SQL on SAP HANA, views, reports and Service Layer integrations — reading from the ERP without burdening operations and writing through official channels.",
    },
    proof: ["portal-operacoes-sap", "propensao-compra"],
  },
  {
    id: "portal",
    problem: { pt: "Cada pessoa que só precisa consultar ou solicitar algo custa uma licença.", en: "Every person who only needs to look something up or file a request costs a license." },
    title: { pt: "Sistemas internos sobre o ERP", en: "Internal systems on top of the ERP" },
    body: {
      pt: "Portais e ferramentas sob medida que levam as rotinas para fora do ERP, mantendo o SAP como sistema de registro.",
      en: "Custom portals and tools that move routines out of the ERP while keeping SAP as the system of record.",
    },
    proof: ["portal-operacoes-sap"],
  },
  {
    id: "bi",
    problem: { pt: "A diretoria decide com planilhas atrasadas e números que não batem.", en: "Leadership decides with late spreadsheets and numbers that don't match." },
    title: { pt: "Dashboards e Business Intelligence", en: "Dashboards and Business Intelligence" },
    body: {
      pt: "Indicadores em Power BI ou em dashboards web, com modelagem limpa e números conciliados com a origem.",
      en: "KPIs in Power BI or web dashboards, with clean modeling and numbers reconciled to the source.",
    },
    proof: ["propensao-compra", "lucroradar-ai"],
  },
  {
    id: "data",
    problem: { pt: "Análises pesadas competem com o sistema que a empresa usa para operar.", en: "Heavy analytics compete with the system the company runs on." },
    title: { pt: "Engenharia e organização de dados", en: "Data engineering and organization" },
    body: {
      pt: "Extração, camadas Bronze, Silver e Gold, testes de qualidade e jobs versionados — em Databricks, dbt ou PostgreSQL.",
      en: "Extraction, Bronze, Silver and Gold layers, quality tests and versioned jobs — on Databricks, dbt or PostgreSQL.",
    },
    proof: ["propensao-compra", "lucroradar-ai"],
  },
  {
    id: "ml",
    problem: { pt: "O comercial não sabe quem contatar primeiro.", en: "Sales doesn't know whom to call first." },
    title: { pt: "Modelos preditivos e priorização", en: "Predictive models and prioritization" },
    body: {
      pt: "Modelos de propensão com validação temporal e comparação contra regras simples, entregues como listas que a equipe usa.",
      en: "Propensity models with time-aware validation and comparison against simple rules, delivered as lists the team actually uses.",
    },
    proof: ["propensao-compra"],
  },
  {
    id: "automation",
    problem: { pt: "Rotinas manuais consomem horas toda semana.", en: "Manual routines eat hours every week." },
    title: { pt: "Automação de processos", en: "Process automation" },
    body: {
      pt: "Agendamentos, conferências automáticas, fluxos de aprovação e integrações que tiram o trabalho repetitivo das pessoas.",
      en: "Schedules, automatic checks, approval flows and integrations that take repetitive work off people.",
    },
    proof: ["portal-operacoes-sap", "editora-wordpress"],
  },
  {
    id: "ai",
    problem: { pt: "A IA parece promissora, mas ninguém confia nas respostas.", en: "AI looks promising, but nobody trusts its answers." },
    title: { pt: "IA aplicada ao negócio", en: "AI applied to the business" },
    body: {
      pt: "Copilotos que consultam seus dados com ferramentas controladas, agentes com revisão humana e LLMs com fallback.",
      en: "Copilots that query your data through controlled tools, agents with human review and LLMs with fallback.",
    },
    proof: ["lucroradar-ai", "tudoparaeventos", "planejapp"],
  },
  {
    id: "apps",
    problem: { pt: "A ideia precisa virar um produto que cobra e funciona no celular.", en: "The idea needs to become a product that bills and works on a phone." },
    title: { pt: "Aplicações web e mobile", en: "Web and mobile applications" },
    body: {
      pt: "Produtos completos com autenticação, pagamentos, regras de acesso no banco e testes — web, Android e iOS.",
      en: "Complete products with authentication, payments, database access rules and tests — web, Android and iOS.",
    },
    proof: ["planejapp", "tudoparaeventos", "kluska"],
  },
];
