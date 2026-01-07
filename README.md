# Control — Aplicação de gerenciamento financeiro

[![Static Badge](https://img.shields.io/badge/Licen%C3%A7a-MIT-green)](https://github.com/renatogomesf/control/blob/main/LICENSE)

**Link para o projeto em produção:** https://controlbyrdev.vercel.app

Projeto demonstrativo (front-end) para apresentar competências: aplicativo React + TypeScript construído com Vite, estilizado com TailwindCSS e integrado a uma API via Axios.

**Objetivo:** demonstrar organização de código, uso de Context API para estado global, rotas privadas/públicas, componentes reutilizáveis e integração HTTP.

**Stack principal:**

- **Framework:** React 19 + TypeScript
- **Bundler / dev:** Vite
- **Estilo:** TailwindCSS
- **HTTP:** Axios
- **Roteamento:** react-router
- **Ícones:** react-icons
- **Lint / Dev tools:** ESLint, TypeScript

## Como executar (desenvolvimento)

1. Instale dependências:

```bash
npm install
```

2. Defina a variável de ambiente da API (exemplo em `CONFIG.env`):
- Remova o "CONFIG" do arquivo "CONFIG.env" deixando apenas `.env`
- Lembre-se que, para rodal localmente, você precisa da [api](https://github.com/renatogomesf/control-api) rodando localmente também.

```
VITE_URL_API=http://localhost:"mesma porta usada na api"
```

3. Rode em modo dev:

```bash
npm run dev
```

4. Build para produção:

```bash
npm run build
```

## Estrutura do projeto (resumo)

- **`src/`**: código fonte
  - **`src/App.tsx`**: definição de rotas públicas e privadas; composição de providers
  - **`src/main.tsx`**: bootstrap da aplicação e `UserProvider`
  - **`src/axios/index.ts`**: instância Axios configurada com `VITE_URL_API`
  - **`src/context/`**: providers do app (`UserContext`, `GoalContext`, `RevenueContext`, `ExpenseContext`, `AmountToPay/Receive`)
  - **`src/components/`**: componentes UI reutilizáveis (Botões, Inputs, Modais, Toasts, Loading)
  - **`src/pages/public/`**: telas públicas (`Login`, `Register`)
  - **`src/pages/private/`**: telas protegidas (`Layout`, `Goal`, `Revenue`, `Expense`, `AmountToPay`, `AmountToReceive`)


## Principais funcionalidades

- Autenticação (login / registro) com armazenamento de `token` e `user` no `localStorage` via `UserContext`.
- CRUD básico para metas, receitas e despesas (páginas privadas).
- Modais para criar/editar itens (diversos `Modal*` em `src/components`).
- Layout com rotas aninhadas e proteção via providers/estado global.

## Observação

- O estado global foi implementado com múltiplos Context Providers; bom para demonstração, mas pode ser avaliado o uso de soluções como Zustand/Redux se a aplicação crescer.

## Pontos a se destacar

- Arquitetura de pastas e separação de responsabilidades (`components`, `context`, `pages`).
- Uso da Context API para gerenciar autenticação e domínios (goals, revenue, expenses).
- Integração limpa com API via uma instância Axios central (`src/axios/index.ts`).
- Experiência com Vite para dev rápido e integração Tailwind para estilos utilitários.

## Comandos úteis

- `npm install` — instalar dependências
- `npm run dev` — rodar em desenvolvimento (Vite)
- `npm run build` — build de produção

## Autor
Renato Gomes Ferreira

https://www.linkedin.com/in/renato-gomes-22b759236/