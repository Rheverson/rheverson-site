import type { L } from "./types";

export type ProjectKind = "professional" | "product" | "client" | "personal";

export const kindLabel: Record<ProjectKind, L> = {
  professional: { pt: "Projeto profissional", en: "Professional project" },
  product: { pt: "Negócio próprio", en: "Own business" },
  client: { pt: "Projeto para cliente", en: "Client project" },
  personal: { pt: "Projeto pessoal", en: "Personal project" },
};

export type PipelineStep = { label: L; detail: L };
export type Result = { value: string; label: L; source: string };
export type ProjectLink = { label: L; href: string };

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  period: string;
  /** Frase curta de uma linha usada na listagem. */
  tagline: L;
  /** Domínio do problema: dados, sistemas, produto... */
  domain: L;
  role: L;
  team: L;
  context: L;
  problem: L;
  goal: L;
  strategy: L[];
  solution: L[];
  stack: string[];
  pipeline: { title: L; steps: PipelineStep[] };
  results: Result[];
  lesson?: L;
  links: ProjectLink[];
  images?: { desktop: string; mobile: string; alt: L };
  /** Aviso de anonimização ou de autoria assistida por IA. */
  note?: L;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "propensao-compra",
    name: "Propensão de compra",
    kind: "professional",
    period: "2026",
    featured: true,
    tagline: {
      pt: "Do SAP HANA a um lakehouse e a uma fila semanal de clientes com maior chance de comprar.",
      en: "From SAP HANA to a lakehouse and a weekly queue of the customers most likely to buy.",
    },
    domain: { pt: "Engenharia de dados e machine learning", en: "Data engineering and machine learning" },
    role: {
      pt: "Desenho da arquitetura, extração, modelagem, treino, auditoria e entrega — de ponta a ponta.",
      en: "Architecture, extraction, modeling, training, audit and delivery — end to end.",
    },
    team: { pt: "Individual, com agentes de IA como apoio de desenvolvimento.", en: "Solo, with AI agents as development support." },
    context: {
      pt: "Uma indústria de painéis de LED vende projetos de alto valor e ciclo longo. O histórico comercial inteiro mora no SAP Business One sobre SAP HANA, mas a equipe de vendas decidia quem contatar pela memória e pela planilha.",
      en: "An LED panel manufacturer sells high-value projects with long cycles. Its entire commercial history lives in SAP Business One on SAP HANA, yet the sales team chose whom to call from memory and spreadsheets.",
    },
    problem: {
      pt: "Rodar análises pesadas dentro do HANA disputaria memória com o ERP em produção. E não havia nenhuma forma objetiva de priorizar a carteira de clientes a cada semana.",
      en: "Running heavy analytics inside HANA would compete for memory with the live ERP. And there was no objective way to prioritize the customer base each week.",
    },
    goal: {
      pt: "Tirar os dados do ERP sem afetar a operação, organizá-los em camadas confiáveis e entregar ao comercial uma fila de contatos explicável.",
      en: "Get data out of the ERP without affecting operations, organize it into trustworthy layers and give sales an explainable contact queue.",
    },
    strategy: [
      {
        pt: "Separar análise de operação: o HANA continua só como fonte; Bronze, Silver e Gold vivem num lakehouse Databricks com Delta Lake e Unity Catalog.",
        en: "Separate analytics from operations: HANA stays a source only; Bronze, Silver and Gold live in a Databricks lakehouse with Delta Lake and Unity Catalog.",
      },
      {
        pt: "Cobrir o ciclo de vendas completo do SAP B1 — parceiros, itens, cotações, pedidos, entregas, notas e devoluções — em 15 tabelas de origem.",
        en: "Cover the full SAP B1 sales cycle — partners, items, quotes, orders, deliveries, invoices and returns — across 15 source tables.",
      },
      {
        pt: "Conciliar a camada Gold com o próprio SAP antes de treinar qualquer modelo.",
        en: "Reconcile the Gold layer against SAP itself before training any model.",
      },
      {
        pt: "Medir o modelo contra baselines simples no mesmo holdout, para saber se o ML realmente agrega.",
        en: "Measure the model against simple baselines on the same holdout, to know whether ML really adds value.",
      },
    ],
    solution: [
      {
        pt: "Extração do SAP HANA para um Volume do Databricks e jobs versionados como Databricks Asset Bundles.",
        en: "Extraction from SAP HANA into a Databricks Volume, with jobs versioned as Databricks Asset Bundles.",
      },
      {
        pt: "Features ponto-no-tempo por cliente e mês: recência em dias, cadência observada, tendências de valor, frequência e ticket, estado do cliente para cold start.",
        en: "Point-in-time features per customer and month: recency in days, observed cadence, value, frequency and ticket trends, customer state for cold start.",
      },
      {
        pt: "HistGradientBoosting calibrado (Platt), registrado no MLflow, com validação walk-forward.",
        en: "Calibrated HistGradientBoosting (Platt), registered in MLflow, with walk-forward validation.",
      },
      {
        pt: "Fila semanal de contatos em três faixas — quente, morno e frio — publicada em dashboard Lakeview e consultável em linguagem natural pelo Genie.",
        en: "A weekly contact queue in three tiers — hot, warm and cold — published on a Lakeview dashboard and queryable in natural language through Genie.",
      },
    ],
    stack: ["SAP HANA", "Python", "Databricks", "Delta Lake", "Unity Catalog", "PySpark", "scikit-learn", "MLflow", "Lakeview", "Genie", "Asset Bundles"],
    pipeline: {
      title: { pt: "Fluxo de dados", en: "Data flow" },
      steps: [
        { label: { pt: "SAP HANA", en: "SAP HANA" }, detail: { pt: "SAP B1, 15 tabelas do ciclo de vendas, só leitura", en: "SAP B1, 15 sales-cycle tables, read-only" } },
        { label: { pt: "Bronze", en: "Bronze" }, detail: { pt: "Arquivos brutos e conferência de chegada", en: "Raw files and arrival checks" } },
        { label: { pt: "Silver", en: "Silver" }, detail: { pt: "Limpeza, tipos e regras de negócio", en: "Cleaning, types and business rules" } },
        { label: { pt: "Gold", en: "Gold" }, detail: { pt: "Dimensões, fatos e features ponto-no-tempo", en: "Dimensions, facts and point-in-time features" } },
        { label: { pt: "Modelo", en: "Model" }, detail: { pt: "Treino walk-forward, calibração, MLflow", en: "Walk-forward training, calibration, MLflow" } },
        { label: { pt: "Fila comercial", en: "Sales queue" }, detail: { pt: "Dashboard, Genie e faixas quente/morno/frio", en: "Dashboard, Genie and hot/warm/cold tiers" } },
      ],
    },
    results: [
      { value: "4,2×", label: { pt: "Lift nos 10% melhor ranqueados, em backtest de 6 meses", en: "Lift in the top-ranked 10%, over a 6-month backtest" }, source: "docs/auditoria-modelo-01-09.md" },
      { value: "0,76", label: { pt: "ROC-AUC honesto, depois de remover vazamento de dados", en: "Honest ROC-AUC after removing data leakage" }, source: "docs/auditoria-modelo-01-09.md" },
      { value: "4,8%", label: { pt: "Probabilidade média prevista após calibração, contra ~5% de taxa real", en: "Mean predicted probability after calibration, versus ~5% actual rate" }, source: "docs/auditoria-modelo-01-09.md" },
      { value: "R$ 0,00", label: { pt: "Diferença entre a receita da camada Gold e o SAP no mês conciliado", en: "Difference between Gold-layer revenue and SAP in the reconciled month" }, source: "README.md" },
    ],
    lesson: {
      pt: "A primeira versão marcava ROC-AUC de 0,905. Uma auditoria encontrou vazamento: o perfil de produto do cliente era calculado com o histórico inteiro, inclusive compras futuras, e a validação cruzada não respeitava o tempo. Corrigido, o número caiu para cerca de 0,76 — e o modelo empatou com regressão logística e RFM. Publicar o número menor e mais verdadeiro foi a decisão certa: o valor está no pipeline confiável e na fila explicável, não em uma métrica inflada.",
      en: "The first version scored a 0.905 ROC-AUC. An audit found leakage: the customer product profile was computed over the full history, future purchases included, and cross-validation ignored time. Once fixed, the score dropped to about 0.76 — and the model tied with logistic regression and RFM. Reporting the smaller, truer number was the right call: the value is in the trustworthy pipeline and the explainable queue, not in an inflated metric.",
    },
    links: [],
    note: {
      pt: "Projeto interno. Nome da empresa, clientes, valores, endereços e identificadores foram omitidos.",
      en: "Internal project. Company name, customers, amounts, addresses and identifiers are omitted.",
    },
  },
  {
    slug: "portal-operacoes-sap",
    name: "Portal de operações",
    kind: "professional",
    period: "2026",
    featured: true,
    tagline: {
      pt: "Um portal Django sobre o SAP Business One que tirou rotinas do ERP e economizou R$ 20.160 em licenças.",
      en: "A Django portal on top of SAP Business One that moved routines out of the ERP and saved R$ 20,160 in licenses.",
    },
    domain: { pt: "Sistemas corporativos e integração com ERP", en: "Enterprise systems and ERP integration" },
    role: {
      pt: "Levantamento com as áreas, arquitetura, desenvolvimento, integração com o SAP e implantação.",
      en: "Requirements with each department, architecture, development, SAP integration and rollout.",
    },
    team: { pt: "Individual, com agentes de IA como apoio de desenvolvimento e revisão.", en: "Solo, with AI agents supporting development and review." },
    context: {
      pt: "Na indústria, várias áreas precisavam de informação do SAP Business One — comercial, produção, logística, compras, financeiro, qualidade — mas nem todos tinham licença do ERP, e muitas rotinas viviam em planilhas e mensagens.",
      en: "At the manufacturer, many departments needed SAP Business One data — sales, production, logistics, purchasing, finance, quality — but not everyone had an ERP license, and many routines lived in spreadsheets and messages.",
    },
    problem: {
      pt: "Cada colaborador que só precisava abrir uma solicitação de compra ou consultar um pedido exigia uma licença SAP. Informações críticas, como atraso de pedidos e cobrança, não tinham um lugar único.",
      en: "Every employee who only needed to open a purchase request or check an order required an SAP license. Critical information, such as order delays and collections, had no single home.",
    },
    goal: {
      pt: "Criar um portal interno onde as pessoas trabalham, mantendo o SAP como sistema de registro: ler muito, escrever pouco e com segurança.",
      en: "Build an internal portal where people work, keeping SAP as the system of record: read a lot, write little and safely.",
    },
    strategy: [
      {
        pt: "Leitura direta do SAP HANA para relatórios; escrita somente pelo Service Layer oficial do SAP B1.",
        en: "Read directly from SAP HANA for reporting; write only through the official SAP B1 Service Layer.",
      },
      {
        pt: "Guardar localmente apenas o que o SAP não tem: metas, motivos de atraso, regras de cobrança, documentos e permissões.",
        en: "Store locally only what SAP lacks: targets, delay reasons, collection rules, documents and permissions.",
      },
      {
        pt: "Entregar por módulos, um departamento de cada vez, com permissões por área.",
        en: "Ship module by module, one department at a time, with per-department permissions.",
      },
    ],
    solution: [
      {
        pt: "18 módulos Django e cerca de 90 telas: produção, planejamento, logística, compras, financeiro, inadimplência, qualidade, comercial, orçamentos, documentos e mais.",
        en: "18 Django apps and about 90 screens: production, planning, logistics, purchasing, finance, collections, quality, sales, budgets, documents and more.",
      },
      {
        pt: "Solicitações de compra com anexos criadas no portal e lançadas no SAP pelo Service Layer — sem licença SAP para quem solicita.",
        en: "Purchase requests with attachments created in the portal and posted to SAP through the Service Layer — no SAP license needed by the requester.",
      },
      {
        pt: "Relatórios de status de pedidos e OTIF lidos de views do SAP, régua de cobrança com acordos conferidos contra os saldos do ERP.",
        en: "Order status and OTIF reports read from SAP views, plus a collections schedule with agreements checked against ERP balances.",
      },
      {
        pt: "Agendador próprio para backup, snapshots e conferências noturnas, e um script de deploy que verifica hashes e bloqueia a cópia de dados de produção.",
        en: "A built-in scheduler for backups, snapshots and nightly checks, plus a deploy script that verifies hashes and blocks copying production data.",
      },
    ],
    stack: ["Django", "Python", "SAP Business One", "SAP HANA", "Service Layer", "htmx", "Bootstrap", "SQLite"],
    pipeline: {
      title: { pt: "Arquitetura", en: "Architecture" },
      steps: [
        { label: { pt: "Áreas da empresa", en: "Departments" }, detail: { pt: "Cerca de 11 usuários, permissões por área", en: "About 11 users, per-department permissions" } },
        { label: { pt: "Portal Django", en: "Django portal" }, detail: { pt: "18 módulos, ~90 telas, htmx", en: "18 apps, ~90 screens, htmx" } },
        { label: { pt: "Leitura", en: "Read" }, detail: { pt: "SQL direto no SAP HANA e views", en: "Direct SQL on SAP HANA and views" } },
        { label: { pt: "Escrita", en: "Write" }, detail: { pt: "Service Layer do SAP B1", en: "SAP B1 Service Layer" } },
        { label: { pt: "SAP Business One", en: "SAP Business One" }, detail: { pt: "Continua sendo o sistema de registro", en: "Remains the system of record" } },
      ],
    },
    results: [
      { value: "R$ 20.160", label: { pt: "Economizados em licenças SAP com solicitações de compra feitas no portal", en: "Saved in SAP licenses by moving purchase requests to the portal" }, source: "Informado pelo autor" },
      { value: "18", label: { pt: "Módulos em um só sistema interno", en: "Modules in a single internal system" }, source: "docs/ARQUITETURA.md" },
      { value: "~90", label: { pt: "Telas para operação, gestão e diretoria", en: "Screens for operations, management and leadership" }, source: "docs/ARQUITETURA.md" },
      { value: "~43 mil", label: { pt: "Linhas de Python, sem contar migrations", en: "Lines of Python, excluding migrations" }, source: "docs/ARQUITETURA.md" },
    ],
    links: [],
    note: {
      pt: "Sistema interno. Telas, nomes, endereços e dados não são publicados.",
      en: "Internal system. Screens, names, addresses and data are not published.",
    },
  },
  {
    slug: "planejapp",
    name: "PlanejeApp",
    kind: "product",
    period: "2026",
    featured: true,
    tagline: {
      pt: "App de finanças pessoais com assistente de IA, apps Android e iOS, assinaturas e bot de WhatsApp.",
      en: "Personal finance app with an AI assistant, Android and iOS apps, subscriptions and a WhatsApp bot.",
    },
    domain: { pt: "Produto digital com IA", en: "AI-powered digital product" },
    role: { pt: "Fundador: produto, desenvolvimento, infraestrutura e operação.", en: "Founder: product, development, infrastructure and operations." },
    team: { pt: "Individual, com agentes de IA como apoio de desenvolvimento.", en: "Solo, with AI agents as development support." },
    context: {
      pt: "Controle financeiro costuma morrer na planilha: dá trabalho registrar e ninguém interpreta os números.",
      en: "Personal budgeting usually dies in a spreadsheet: logging is tedious and nobody interprets the numbers.",
    },
    problem: {
      pt: "Construir um produto completo — web e mobile, com cobrança, segurança de dados financeiros e uma IA útil — sem equipe.",
      en: "Build a complete product — web and mobile, with billing, financial-data security and useful AI — without a team.",
    },
    goal: {
      pt: "Registrar gastos com pouco atrito e transformar o histórico em orientação prática, com um assistente chamado Finn.",
      en: "Log spending with little friction and turn history into practical guidance, through an assistant called Finn.",
    },
    strategy: [
      { pt: "Regras de domínio puras e testadas, separadas da interface.", en: "Pure, tested domain logic kept apart from the UI." },
      { pt: "Segurança no banco: Row Level Security no Postgres e operações financeiras atômicas e idempotentes.", en: "Security in the database: Postgres Row Level Security and atomic, idempotent financial operations." },
      { pt: "IA resiliente: fallback entre vários provedores de LLM, com timeout por provedor.", en: "Resilient AI: fallback across several LLM providers, with per-provider timeouts." },
    ],
    solution: [
      { pt: "Contas, cartões e faturas, recorrências, metas, orçamentos, relatórios e perfis compartilhados.", en: "Accounts, credit cards and statements, recurring transactions, goals, budgets, reports and shared profiles." },
      { pt: "Apps nativos via Capacitor, com biometria, armazenamento seguro e notificações push.", en: "Native apps via Capacitor, with biometrics, secure storage and push notifications." },
      { pt: "Assinaturas com Stripe (checkout, portal e webhooks), e-mails transacionais e bot de WhatsApp.", en: "Stripe subscriptions (checkout, portal and webhooks), transactional email and a WhatsApp bot." },
    ],
    stack: ["React", "TypeScript", "Vite", "Capacitor", "Supabase", "PostgreSQL", "Edge Functions", "Stripe", "Twilio", "LLM APIs", "Vitest"],
    pipeline: {
      title: { pt: "Arquitetura", en: "Architecture" },
      steps: [
        { label: { pt: "Web e mobile", en: "Web and mobile" }, detail: { pt: "React + Capacitor (Android/iOS)", en: "React + Capacitor (Android/iOS)" } },
        { label: { pt: "Supabase", en: "Supabase" }, detail: { pt: "Postgres com RLS e edge functions", en: "Postgres with RLS and edge functions" } },
        { label: { pt: "Finn", en: "Finn" }, detail: { pt: "LLMs com fallback entre provedores", en: "LLMs with cross-provider fallback" } },
        { label: { pt: "Pagamentos", en: "Payments" }, detail: { pt: "Stripe: checkout, portal e webhooks", en: "Stripe: checkout, portal and webhooks" } },
        { label: { pt: "Canais", en: "Channels" }, detail: { pt: "Push, e-mail e WhatsApp", en: "Push, email and WhatsApp" } },
      ],
    },
    results: [
      { value: "408", label: { pt: "Commits no repositório entre março e setembro de 2026", en: "Repository commits between March and September 2026" }, source: "GitHub API" },
      { value: "91", label: { pt: "Arquivos de teste automatizado", en: "Automated test files" }, source: "Repositório local" },
      { value: "3", label: { pt: "Plataformas a partir do mesmo código: web, Android e iOS", en: "Platforms from one codebase: web, Android and iOS" }, source: "Repositório" },
    ],
    links: [
      { label: { pt: "Site do produto", en: "Product site" }, href: "https://planejapp.com.br/" },
      { label: { pt: "Abrir o app", en: "Open the app" }, href: "https://app.planejapp.com.br/" },
    ],
    images: {
      desktop: "/shots/planejapp/desktop.webp",
      mobile: "/shots/planejapp/mobile.webp",
      alt: { pt: "Página inicial do PlanejeApp", en: "PlanejeApp home page" },
    },
  },
  {
    slug: "tudoparaeventos",
    name: "TudoParaEventos",
    kind: "product",
    period: "2026",
    featured: true,
    tagline: {
      pt: "Marketplace que conecta quem organiza eventos a fornecedores, com planos pagos e agentes de IA.",
      en: "A marketplace connecting event planners with suppliers, with paid plans and AI agents.",
    },
    domain: { pt: "Marketplace e automação com IA", en: "Marketplace and AI automation" },
    role: { pt: "Fundador: produto, desenvolvimento, SEO e operação.", en: "Founder: product, development, SEO and operations." },
    team: { pt: "Individual, com agentes de IA como apoio de desenvolvimento.", en: "Solo, with AI agents as development support." },
    context: {
      pt: "Quem organiza um evento em Curitiba garimpa fornecedores em redes sociais e grupos. Fornecedores pequenos não têm vitrine nem gestão de orçamentos.",
      en: "People planning an event in Curitiba hunt for suppliers across social media and group chats. Small suppliers have neither a storefront nor quote management.",
    },
    problem: {
      pt: "Um marketplace precisa de três produtos ao mesmo tempo — para clientes, fornecedores e administração — e de tráfego orgânico desde o primeiro dia.",
      en: "A marketplace needs three products at once — for clients, suppliers and admins — plus organic traffic from day one.",
    },
    goal: {
      pt: "Lançar uma plataforma completa, segura por papel de usuário, que se divulgue por SEO e reduza trabalho manual com agentes.",
      en: "Launch a complete platform, secured per user role, that markets itself through SEO and cuts manual work with agents.",
    },
    strategy: [
      { pt: "Autorização no banco: RLS e funções por papel, cobertas por testes SQL.", en: "Authorization in the database: RLS and role-based functions, covered by SQL tests." },
      { pt: "SEO programático: páginas por categoria, evento e cidade, com sitemap e dados estruturados.", en: "Programmatic SEO: pages per category, event type and city, with sitemap and structured data." },
      { pt: "Agentes com revisão humana: a IA rascunha, o dono aprova.", en: "Agents with human review: AI drafts, the owner approves." },
    ],
    solution: [
      { pt: "Área do cliente com eventos, lista de convidados, convites com RSVP, orçamentos e mensagens.", en: "Client area with events, guest list, RSVP invitations, quotes and messages." },
      { pt: "Área do fornecedor com agenda, orçamentos, avaliações, métricas e assinatura via Stripe.", en: "Supplier area with calendar, quotes, reviews, metrics and Stripe subscription." },
      { pt: "Painel administrativo com aprovação de fornecedores, suporte, equipe, indicações e campanhas.", en: "Admin panel with supplier approval, support, staff, referrals and campaigns." },
      { pt: "Agente redator para o blog com fluxo editorial e agente de prospecção B2B que alimenta uma planilha.", en: "A blog-writing agent with an editorial workflow and a B2B prospecting agent that fills a spreadsheet." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Stripe", "Cloudinary", "LLM APIs", "Vercel"],
    pipeline: {
      title: { pt: "Arquitetura", en: "Architecture" },
      steps: [
        { label: { pt: "Páginas públicas", en: "Public pages" }, detail: { pt: "Busca e SEO por categoria e cidade", en: "Search and SEO by category and city" } },
        { label: { pt: "Três áreas", en: "Three areas" }, detail: { pt: "Cliente, fornecedor e administração", en: "Client, supplier and admin" } },
        { label: { pt: "Supabase", en: "Supabase" }, detail: { pt: "Postgres, RLS por papel, testes SQL", en: "Postgres, role-based RLS, SQL tests" } },
        { label: { pt: "Receita", en: "Revenue" }, detail: { pt: "Planos de fornecedor no Stripe", en: "Supplier plans on Stripe" } },
        { label: { pt: "Agentes", en: "Agents" }, detail: { pt: "Blog e prospecção com aprovação humana", en: "Blog and prospecting with human approval" } },
      ],
    },
    results: [
      { value: "143", label: { pt: "Commits entre junho e novembro de 2026", en: "Commits between June and November 2026" }, source: "GitHub API" },
      { value: "~60", label: { pt: "Migrations de banco com regras de acesso por papel", en: "Database migrations with role-based access rules" }, source: "Repositório" },
      { value: "2", label: { pt: "Agentes de IA no fluxo de trabalho: conteúdo e prospecção", en: "AI agents in the workflow: content and prospecting" }, source: "Repositório" },
    ],
    links: [{ label: { pt: "Visitar a plataforma", en: "Visit the platform" }, href: "https://www.tudoparaeventos.com.br/" }],
    images: {
      desktop: "/shots/tudoparaeventos/desktop.webp",
      mobile: "/shots/tudoparaeventos/mobile.webp",
      alt: { pt: "Página inicial do TudoParaEventos", en: "TudoParaEventos home page" },
    },
  },
  {
    slug: "kluska",
    name: "Kluska",
    kind: "product",
    period: "2026",
    featured: false,
    tagline: {
      pt: "Loja de gravatas e kits de padrinhos com Pix, frete calculado e um ERP leve feito sob medida.",
      en: "A tie and groomsmen-kit store with Pix payments, live shipping quotes and a custom lightweight ERP.",
    },
    domain: { pt: "E-commerce e gestão", en: "E-commerce and operations" },
    role: { pt: "Dono do negócio: loja, painel, integrações e operação.", en: "Business owner: store, back office, integrations and operations." },
    team: { pt: "Individual.", en: "Solo." },
    context: {
      pt: "Uma marca própria de acessórios masculinos precisava de uma loja online e de controle de estoque, vendas e clientes num só lugar.",
      en: "An own brand of men's accessories needed an online store and a single place to manage stock, sales and customers.",
    },
    problem: {
      pt: "Pagamento, frete, estoque e fidelidade precisavam conversar entre si sem retrabalho manual.",
      en: "Payment, shipping, stock and loyalty had to talk to each other without manual rework.",
    },
    goal: {
      pt: "Uma loja rápida e um painel que transforma cada pedido em financeiro, estoque e pontos automaticamente.",
      en: "A fast store and a back office that turns each order into finance, stock and points automatically.",
    },
    strategy: [
      { pt: "Front-end sem build, leve e direto, com funções serverless para as integrações.", en: "No-build front end, lean and direct, with serverless functions for integrations." },
      { pt: "Regras críticas no banco: reserva de estoque na criação do pedido e crédito de pontos no webhook de pagamento aprovado.", en: "Critical rules in the database: stock reserved at order creation and points credited on the approved-payment webhook." },
    ],
    solution: [
      { pt: "Checkout com Mercado Pago e Pix, e cotação de frete pelo Melhor Envio (OAuth).", en: "Checkout with Mercado Pago and Pix, plus shipping quotes through Melhor Envio (OAuth)." },
      { pt: "Painel com estoque, vendas, financeiro, CRM e leitura de código de barras pela câmera.", en: "Back office with stock, sales, finance, CRM and camera barcode scanning." },
      { pt: "Programa de pontos Kluska Club ligado aos pedidos pagos.", en: "Kluska Club points program tied to paid orders." },
    ],
    stack: ["JavaScript", "HTML", "CSS", "Supabase", "Edge Functions", "Mercado Pago", "Melhor Envio", "Cloudinary", "Vercel"],
    pipeline: {
      title: { pt: "Fluxo do pedido", en: "Order flow" },
      steps: [
        { label: { pt: "Loja", en: "Store" }, detail: { pt: "Catálogo e checkout", en: "Catalog and checkout" } },
        { label: { pt: "Pedido", en: "Order" }, detail: { pt: "Reserva de estoque na criação", en: "Stock reserved on creation" } },
        { label: { pt: "Pagamento", en: "Payment" }, detail: { pt: "Mercado Pago / Pix e webhook", en: "Mercado Pago / Pix and webhook" } },
        { label: { pt: "Envio", en: "Shipping" }, detail: { pt: "Melhor Envio", en: "Melhor Envio" } },
        { label: { pt: "Gestão", en: "Back office" }, detail: { pt: "Financeiro, estoque e pontos", en: "Finance, stock and points" } },
      ],
    },
    results: [
      { value: "154", label: { pt: "Commits entre abril e setembro de 2026", en: "Commits between April and September 2026" }, source: "GitHub API" },
      { value: "3", label: { pt: "Integrações externas: pagamento, frete e e-mail", en: "External integrations: payments, shipping and email" }, source: "Repositório" },
    ],
    links: [{ label: { pt: "Visitar a loja", en: "Visit the store" }, href: "https://www.kluska.store/" }],
    images: {
      desktop: "/shots/kluska/desktop.webp",
      mobile: "/shots/kluska/mobile.webp",
      alt: { pt: "Página inicial da loja Kluska", en: "Kluska store home page" },
    },
  },
  {
    slug: "lucroradar-ai",
    name: "LucroRadar AI",
    kind: "personal",
    period: "2026",
    featured: false,
    tagline: {
      pt: "BI com copiloto de IA que separa receita, margem e caixa para responder por que o dinheiro não sobra.",
      en: "BI with an AI copilot that separates revenue, margin and cash to explain why money isn't left over.",
    },
    domain: { pt: "Analytics engineering e IA", en: "Analytics engineering and AI" },
    role: { pt: "Concepção, direção técnica e revisão.", en: "Concept, technical direction and review." },
    team: {
      pt: "Concebido e dirigido por mim, desenvolvido com agentes de IA (Claude Code).",
      en: "Conceived and directed by me, built with AI agents (Claude Code).",
    },
    context: {
      pt: "Uma empresa fictícia de venda e locação de equipamentos vende mais a cada mês, mas o caixa não acompanha. Todos os dados são sintéticos.",
      en: "A fictional equipment sales and rental company sells more every month, but cash doesn't follow. All data is synthetic.",
    },
    problem: {
      pt: "Faturamento, margem de contribuição e caixa contam histórias diferentes, e dashboards comuns misturam os três.",
      en: "Revenue, contribution margin and cash tell different stories, and typical dashboards blend all three.",
    },
    goal: {
      pt: "Mostrar onde a margem caiu e onde o dinheiro ficou preso, com números conciliados e um copiloto que só responde com evidência.",
      en: "Show where margin dropped and where cash got stuck, with reconciled numbers and a copilot that only answers with evidence.",
    },
    strategy: [
      { pt: "Modelagem em camadas com dbt, testes de qualidade e registros em quarentena.", en: "Layered modeling with dbt, quality tests and quarantined records." },
      { pt: "Copiloto com ferramentas controladas, que só consulta a API de leitura.", en: "A copilot with controlled tools that only queries the read-only API." },
    ],
    solution: [
      { pt: "Ponte de margem, recebíveis, utilização de frota e simulador de cenários.", en: "Margin bridge, receivables, fleet utilization and a what-if simulator." },
      { pt: "Copiloto Claude com 7 ferramentas e modo demonstração que dispensa chave de API.", en: "Claude copilot with 7 tools and a demo mode that needs no API key." },
      { pt: "CI no GitHub Actions, testes em pytest e Playwright, fluxo n8n.", en: "GitHub Actions CI, pytest and Playwright tests, an n8n workflow." },
    ],
    stack: ["Python", "PostgreSQL", "dbt", "FastAPI", "Next.js", "TypeScript", "Recharts", "Anthropic SDK", "n8n", "Docker", "Playwright"],
    pipeline: {
      title: { pt: "Fluxo de dados", en: "Data flow" },
      steps: [
        { label: { pt: "Gerador", en: "Generator" }, detail: { pt: "Dados sintéticos determinísticos", en: "Deterministic synthetic data" } },
        { label: { pt: "PostgreSQL", en: "PostgreSQL" }, detail: { pt: "Carga idempotente", en: "Idempotent load" } },
        { label: { pt: "dbt", en: "dbt" }, detail: { pt: "57 modelos e 58 testes", en: "57 models and 58 tests" } },
        { label: { pt: "FastAPI", en: "FastAPI" }, detail: { pt: "API somente leitura", en: "Read-only API" } },
        { label: { pt: "App + copiloto", en: "App + copilot" }, detail: { pt: "Next.js e Claude com 7 ferramentas", en: "Next.js and Claude with 7 tools" } },
      ],
    },
    results: [
      { value: "72/72", label: { pt: "Testes pytest passando", en: "pytest tests passing" }, source: "docs/implementation-plan.md" },
      { value: "57", label: { pt: "Modelos dbt com 58 testes de dados", en: "dbt models with 58 data tests" }, source: "docs/implementation-plan.md" },
      { value: "9/9", label: { pt: "Conferências de reconciliação aprovadas", en: "Reconciliation checks passing" }, source: "docs/implementation-plan.md" },
    ],
    links: [
      { label: { pt: "Abrir a demonstração", en: "Open the demo" }, href: "https://lucroradar-ai.vercel.app/" },
      { label: { pt: "Ver o código", en: "View the code" }, href: "https://github.com/Rheverson/lucroradar-ai" },
    ],
    images: {
      desktop: "/shots/lucroradar-ai/desktop.webp",
      mobile: "/shots/lucroradar-ai/mobile.webp",
      alt: { pt: "Tela inicial do LucroRadar AI", en: "LucroRadar AI home screen" },
    },
    note: {
      pt: "Desenvolvido com agentes de IA sob minha direção. Dados 100% sintéticos.",
      en: "Built with AI agents under my direction. 100% synthetic data.",
    },
  },
  {
    slug: "editora-wordpress",
    name: "Universo Vivo das Palavras",
    kind: "client",
    period: "2026",
    featured: false,
    tagline: {
      pt: "Site de uma editora em WordPress, com tema e plugin próprios e publicação que se desfaz sozinha se algo quebrar.",
      en: "A WordPress site for a publisher, with a custom theme and plugin, and a release process that rolls itself back if anything breaks.",
    },
    domain: { pt: "Web e processo de publicação", en: "Web and release process" },
    role: { pt: "Design, desenvolvimento, hospedagem e manual do administrador.", en: "Design, development, hosting and admin manual." },
    team: { pt: "Individual.", en: "Solo." },
    context: {
      pt: "Uma editora independente precisava divulgar lançamentos vendidos pela Amazon e manter um blog, sem depender de um desenvolvedor para cada alteração.",
      en: "An independent publisher needed to promote releases sold on Amazon and keep a blog, without relying on a developer for every change.",
    },
    problem: {
      pt: "Publicar mudanças num site no ar costuma ser arriscado para quem não tem uma equipe técnica.",
      en: "Changing a live site is risky for anyone without a technical team.",
    },
    goal: {
      pt: "Um site fácil de editar pelo dono e um processo de publicação que não deixa o site quebrado.",
      en: "A site the owner can edit easily and a release process that never leaves it broken.",
    },
    strategy: [
      { pt: "Conteúdo estruturado: tipo de conteúdo Livro com campos próprios e schema Book para SEO.", en: "Structured content: a Book post type with its own fields and Book schema for SEO." },
      { pt: "Publicação testada antes e depois, com volta automática à versão anterior.", en: "Releases tested before and after, with automatic rollback." },
    ],
    solution: [
      { pt: "Tema em blocos e plugin próprio com botão de WhatsApp e reforços de segurança.", en: "A block theme and custom plugin with a WhatsApp button and security hardening." },
      { pt: "Script de publicação: testa o layout em 7 larguras, guarda backup, publica, testa no ar e reverte se falhar.", en: "Release script: tests layout at 7 widths, keeps a backup, publishes, tests live and reverts on failure." },
      { pt: "Ambiente local com Docker e manual passo a passo para o dono.", en: "Local Docker environment and a step-by-step manual for the owner." },
    ],
    stack: ["WordPress", "PHP", "Docker", "Node.js", "Playwright"],
    pipeline: {
      title: { pt: "Publicação segura", en: "Safe release" },
      steps: [
        { label: { pt: "Testes locais", en: "Local tests" }, detail: { pt: "7 larguras, de 360 a 1440 px", en: "7 widths, from 360 to 1440 px" } },
        { label: { pt: "Backup", en: "Backup" }, detail: { pt: "Últimas 5 versões guardadas", en: "Last 5 versions kept" } },
        { label: { pt: "Publicação", en: "Publish" }, detail: { pt: "Envio e limpeza de cache", en: "Upload and cache purge" } },
        { label: { pt: "Teste no ar", en: "Live test" }, detail: { pt: "Mesmas verificações em produção", en: "Same checks in production" } },
        { label: { pt: "Rollback", en: "Rollback" }, detail: { pt: "Volta sozinho se reprovar", en: "Reverts on its own if it fails" } },
      ],
    },
    results: [
      { value: "7", label: { pt: "Larguras de tela testadas a cada publicação", en: "Screen widths tested on every release" }, source: "README.md" },
      { value: "5", label: { pt: "Versões anteriores prontas para restaurar", en: "Previous versions ready to restore" }, source: "README.md" },
    ],
    links: [{ label: { pt: "Visitar o site", en: "Visit the site" }, href: "https://universovivodaspalavras.com.br/" }],
    images: {
      desktop: "/shots/editora-wordpress/desktop.webp",
      mobile: "/shots/editora-wordpress/mobile.webp",
      alt: { pt: "Página inicial da editora Universo Vivo das Palavras", en: "Universo Vivo das Palavras publisher home page" },
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
