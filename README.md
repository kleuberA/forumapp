## Projeto de Fórum Online

Bem-vindo ao Projeto de Fórum Online! Este é um aplicativo web desenvolvido usando Next.js e TypeScript, permitindo aos usuários fazer login, se cadastrar, criar fóruns e explorar uma lista de fóruns disponíveis. Siga as instruções abaixo para configurar e executar o código em sua máquina.

## Funcionalidades Principais

Autenticação: Os usuários podem se cadastrar e fazer login na plataforma.</br>
Fóruns: Os usuários podem criar seus próprios fóruns e visualizar uma lista de fóruns existentes.

## Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

Node.js: https://nodejs.org/</br>
Yarn (opcional, mas recomendado): https://yarnpkg.com/

## Como Rodar o Projeto

```bash
git clone https://github.com/seu-usuario/projeto-forum-online.git
cd projeto-forum-online

npm install
```

## Rotas da API

Aqui estão alguns exemplos de rotas da API que você pode explorar:

POST /api/register: Registra um novo usuário.</br>
POST /api/auth: Permite que um usuário faça login.</br>
POST /api/forum/criarforum: Cria um novo fórum.</br>
GET /api/forum/getforum: Retorna uma lista de fóruns existentes.</br>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
