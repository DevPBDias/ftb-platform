# 🏀 FTB Platform - Federação Tocantinense de Basketball

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Como Usar](#como-usar)
- [Layout e Interface](#layout-e-interface)
- [API e Backend](#api-e-backend)
- [Contribuição](#contribuição)
- [Contato](#contato)

## 🎯 Sobre o Projeto

A **FTB Platform** é uma aplicação web moderna desenvolvida para a **Federação Tocantinense de Basketball**, oferecendo uma solução completa para gerenciamento e divulgação do basquete no estado do Tocantins.

### 🎨 Características Principais

- **Interface Moderna**: Design responsivo e intuitivo com tema escuro/claro
- **Dashboard Administrativo**: Painel completo para gestão da federação
- **Sistema de Notícias**: Portal de notícias e atualizações
- **Gestão de Competições**: Controle de campeonatos e torneios
- **Sistema de Arbitragem**: Cadastro e gestão de árbitros
- **Galeria de Fotos**: Compartilhamento de momentos do basquete
- **Calendário de Eventos**: Organização de jogos e eventos

## 🚀 Funcionalidades

### 🌐 Página Principal
- **Hero Section**: Apresentação da federação com design atrativo
- **Agenda Mobile**: Exibição de próximos jogos e eventos
- **Últimas Notícias**: Feed de notícias atualizadas
- **Próximas Competições**: Informações sobre campeonatos
- **Galeria de Fotos**: Compartilhamento de imagens dos eventos
- **Footer Completo**: Links úteis e informações de contato

### 📊 Dashboard Administrativo
- **Tabela de Jogos**: Gestão completa de partidas e resultados
- **Gerenciamento de Equipes**: Cadastro e controle de clubes
- **Sistema de Notícias**: Criação e edição de conteúdo
- **Gestão de Competições**: Organização de torneios
- **Controle de Árbitros**: Cadastro e gestão de arbitragem
- **Configurações**: Personalização da plataforma

### 👥 Sistema de Usuários
- **Login/Registro**: Autenticação segura com Firebase
- **Controle de Acesso**: Diferentes níveis de permissão
- **Perfil de Usuário**: Gestão de dados pessoais

### 📱 Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Tablet**: Interface adaptada para tablets
- **Desktop**: Experiência completa em computadores

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[Next.js 15.3.2](https://nextjs.org/)**: Framework React com App Router
- **[React 19.0.0](https://reactjs.org/)**: Biblioteca para interfaces
- **[TypeScript 5.0](https://www.typescriptlang.org/)**: Tipagem estática
- **[Tailwind CSS 4.0](https://tailwindcss.com/)**: Framework CSS utilitário
- **[Radix UI](https://www.radix-ui.com/)**: Componentes acessíveis
- **[Lucide React](https://lucide.dev/)**: Ícones modernos
- **[Framer Motion](https://www.framer.com/motion/)**: Animações fluidas

### Backend & Banco de Dados
- **[Firebase 11.10.0](https://firebase.google.com/)**: Autenticação e backend


### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)**: Gerenciamento de formulários
- **[Zod](https://zod.dev/)**: Validação de esquemas
- **[Hookform Resolvers](https://github.com/react-hook-form/resolvers)**: Integração de validadores

### UI/UX
- **[Next Themes](https://github.com/pacocoursey/next-themes)**: Suporte a temas
- **[Sonner](https://sonner.emilkowal.ski/)**: Notificações toast
- **[React Day Picker](https://react-day-picker.js.org/)**: Seletor de datas

## 📁 Estrutura do Projeto

```
ftb-platform/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── api/               # Rotas da API
│   │   ├── dashboard/         # Painel administrativo
│   │   ├── login/             # Página de login
│   │   ├── register/          # Página de registro
│   │   ├── inscricao/         # Sistema de inscrições
│   │   ├── noticias/          # Portal de notícias
│   │   ├── competicoes/       # Gestão de competições
│   │   ├── clubes/            # Informações dos clubes
│   │   ├── arbitragem/        # Sistema de arbitragem
│   │   ├── sobre/             # Página sobre a federação
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/               # Componentes base (shadcn/ui)
│   │   ├── Hero/             # Seção principal
│   │   ├── Footer/           # Rodapé
│   │   ├── Gallery/          # Galeria de fotos
│   │   ├── dashboard/        # Componentes do dashboard
│   │   └── auth/             # Componentes de autenticação
│   ├── context/              # Contextos React
│   ├── hooks/                # Hooks customizados
│   ├── lib/                  # Utilitários e configurações
│   ├── types/                # Definições TypeScript
│   ├── schemas/              # Esquemas de validação
│   ├── constants/            # Constantes da aplicação
│   ├── utils/                # Funções utilitárias
│   └── assets/               # Imagens e recursos estáticos
├── public/                   # Arquivos públicos
└── package.json             # Dependências e scripts
```

## ⚙️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm
- Conta no Firebase
- MongoDB (opcional, pode usar Firebase)

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/ftb-platform.git
cd ftb-platform
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id

# MongoDB (opcional)
MONGODB_URI=sua_uri_mongodb

```

### 4. Execute o Projeto
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 🎮 Como Usar

### Para Visitantes
1. **Navegue pela página principal** para conhecer a federação
2. **Acesse as notícias** para ficar por dentro das novidades
3. **Veja as competições** para acompanhar os campeonatos
4. **Explore a galeria** para ver fotos dos eventos
5. **Entre em contato** através dos links sociais

### Para Administradores
1. **Faça login** no sistema através da página de login
2. **Acesse o dashboard** para gerenciar a plataforma
3. **Gerencie notícias** criando e editando conteúdo
4. **Controle competições** organizando torneios
5. **Administre equipes** e árbitros
6. **Configure a plataforma** conforme necessário

## 🎨 Layout e Interface

### Design System
- **Cores**: Paleta baseada no azul da federação (#162456)
- **Tipografia**: Fonte Manrope para melhor legibilidade
- **Componentes**: Sistema de design consistente com shadcn/ui
- **Animações**: Transições suaves com Framer Motion

### Seções Principais

#### 🏠 Página Inicial
- **Hero Section**: Apresentação impactante da federação
- **Agenda**: Próximos jogos e eventos
- **Notícias**: Feed de atualizações
- **Competições**: Informações sobre torneios
- **Galeria**: Compartilhamento de momentos

#### 📊 Dashboard
- **Visão Geral**: Métricas e estatísticas
- **Gerenciamento**: Controle completo da plataforma
- **Tabela de Jogos**: Gestão de partidas
- **Configurações**: Personalização do sistema

## 🔌 API e Backend

### Endpoints Principais
- `/api/noticias` - Gestão de notícias
- `/api/competicoes` - Controle de competições
- `/api/arbitros` - Sistema de arbitragem
- `/api/members` - Gestão de membros
- `/api/clubes` - Informações dos clubes
- `/api/resultados` - Resultados de jogos
- `/api/configuration` - Configurações da plataforma

### Autenticação
- **Firebase Auth**: Sistema seguro de login
- **Controle de Acesso**: Diferentes níveis de permissão
- **Sessões**: Gerenciamento de usuários logados

## 🤝 Contribuição

### Como Contribuir
1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Padrões de Código
- **TypeScript**: Use tipagem forte
- **ESLint**: Siga as regras de linting
- **Prettier**: Mantenha a formatação consistente
- **Commits**: Use mensagens descritivas

## 📞 Contato

### Desenvolvedor
- **Nome**: Paulo Bruno Machado Dias
- **Email**: devpbdias@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/devpaulobrunomdias


### Federação Tocantinense de Basketball
- **Instagram**: [@basquetetocantins](https://www.instagram.com/basquetetocantins/)
- **Localização**: Tocantins, Brasil

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **Federação Tocantinense de Basketball** pela confiança
- **Comunidade Next.js** pelo excelente framework
- **shadcn/ui** pelos componentes incríveis
- **Todos os contribuidores** que ajudaram no desenvolvimento

---

**Desenvolvido com ❤️ para o basquete do Tocantins**
