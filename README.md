# rheverson-site

Portfólio de **Rheverson Urbiche**: dados, SAP Business One, sistemas e IA aplicada.
Bilíngue (PT-BR / EN), estático e publicado no Vercel.

**No ar:** https://rheverson.vercel.app

## Conceito

**Sinal / ruído.** O trabalho é transformar o ruído operacional (ERP, planilhas, rotinas manuais) em sinal (decisão, sistema, receita). A linguagem visual vem dos painéis de LED da indústria onde trabalho:
- O hero é uma matriz de LEDs que desenha meus commits reais de 2026.
- Os números "acendem" como um display.
- O favicon é o monograma "RU" em pontos.

O site segue três regras:
- **Nada inventado.** Cada número tem fonte (arquivo do projeto, API do GitHub ou valor informado pelo autor), e a página de Resultados mostra essa fonte.
- **Confidencialidade.** Os projetos internos aparecem anonimizados, sem nome de cliente, valores, endereços ou identificadores.
- **Autoria transparente.** Os projetos feitos com agentes de IA dizem isso.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, SSG total) + React 19 |
| Linguagem | TypeScript estrito |
| Estilo | Tailwind CSS v4 + tokens em `src/app/globals.css` |
| Movimento | View Transitions nativas do React (navegação), CSS e `motion` só onde há interação |
| Tipografia | Big Shoulders (display) e Schibsted Grotesk (texto), via `next/font` |
| Testes | Playwright + axe-core (rotas, acessibilidade, overflow, links, SEO) |
| Deploy | Vercel, integrado ao GitHub |

O site não tem banco, CMS, autenticação nem backend. O formulário de contato monta um e-mail (`mailto:`) e não envia nem guarda nada.

## Estrutura

```
src/
  app/[locale]/        páginas (pt | en): home, work, work/[slug], impact,
                       services, about, experience, skills, contact, cv
  app/                 sitemap, robots, manifest, ícones
  content/             TODO o conteúdo, tipado e bilíngue
    projects.ts        estudos de caso (fonte de cada número em `source`)
    profile.ts         experiência, formação, competências, serviços
    copy.ts            textos de interface
    site.ts            nome, e-mail, links, navegação
    commits.json       commits por semana (gerado por script)
  components/          layout, motion, viz, work, contact
  lib/                 i18n, SEO/JSON-LD, imagens OG, commits
  proxy.ts             redireciona "/" para /pt ou /en (Accept-Language)
scripts/               coleta de commits, screenshots, PDF do currículo, QA visual
tests/                 Playwright
public/shots/          capturas dos projetos no ar
public/cv/             currículo em PDF (PT e EN), gerado a partir de /[locale]/cv
```

## Desenvolvimento

```bash
npm install
npm run dev            # http://localhost:3000
```

Verificações:

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium   # apenas na primeira vez
npm run test:e2e                  # sobe o build em :3200 e roda todos os testes
```

## Manutenção do conteúdo

- **Editar textos ou projetos:** altere os arquivos em `src/content/`. Toda string tem `pt` e `en`.
- **Novo estudo de caso:** adicione um item em `projects.ts`. A página, o sitemap e a imagem de compartilhamento são gerados sozinhos.
- **Atualizar commits:** rode `npm run commits` (precisa do `gh` autenticado). O script grava só datas e contagens.
- **Atualizar screenshots:** rode `npm run screens` (ou `npm run screens -- planejapp` para um projeto só).
- **Atualizar o currículo em PDF:** rode `npm run build && npm start -- --port 3200` e, em outro terminal, `npm run cv`.

## Deploy

O projeto `rheverson` no Vercel está ligado a este repositório, e cada push na `main` publica em produção. A URL pública vem de `NEXT_PUBLIC_SITE_URL` (padrão `https://rheverson.vercel.app`) e é usada em canonical, sitemap, Open Graph e JSON-LD.
