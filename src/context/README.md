# Sistema de Tema Dark/Light

Este diretório contém o contexto e hooks para gerenciar o tema dark/light da aplicação.

## Arquivos

- `theme-context.tsx` - Contexto principal para gerenciar o tema
- `../hooks/useThemeToggle.tsx` - Hook personalizado para facilitar o uso do tema
- `../components/ui/theme-toggle.tsx` - Componente reutilizável para alternar o tema

## Como usar

### 1. Usando o hook useThemeToggle

```tsx
import { useThemeToggle } from "@/hooks/useThemeToggle";

const MyComponent = () => {
  const { theme, isDark, isLight, toggleTheme, setTheme } = useThemeToggle();

  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>Alternar tema</button>
      <button onClick={() => setTheme('light')}>Forçar tema claro</button>
    </div>
  );
};
```

### 2. Usando o componente ThemeToggle

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle";

const MyComponent = () => {
  return (
    <div>
      {/* Tamanho padrão */}
      <ThemeToggle />
      
      {/* Tamanho pequeno */}
      <ThemeToggle size="sm" />
      
      {/* Tamanho grande */}
      <ThemeToggle size="lg" />
      
      {/* Variante outline */}
      <ThemeToggle variant="outline" />
      
      {/* Com classes customizadas */}
      <ThemeToggle className="ml-4" />
    </div>
  );
};
```

### 3. Usando o contexto diretamente

```tsx
import { useTheme } from "@/context/theme-context";

const MyComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Tema: {theme}</p>
      <button onClick={toggleTheme}>Alternar</button>
    </div>
  );
};
```

## Funcionalidades

- ✅ Persistência no localStorage
- ✅ Detecção automática da preferência do sistema
- ✅ Aplicação automática das classes CSS
- ✅ Hook personalizado para facilitar o uso
- ✅ Componente reutilizável
- ✅ TypeScript completo
- ✅ Integração com Tailwind CSS

## Configuração

O sistema já está configurado no `layout.tsx` principal e usa as variáveis CSS definidas em `src/styles/globals.css`.

As classes CSS são aplicadas automaticamente ao elemento `html`:
- `.dark` para tema escuro
- `.light` para tema claro (ou sem classe para tema claro) 