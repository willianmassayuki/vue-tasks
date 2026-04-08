# Vue Tasks - Gerenciador de Tarefas

Uma aplicação de gerenciamento de tarefas desenvolvida com Vue 3, TypeScript e Vite. Este projeto foi criado como parte de um curso de desenvolvimento com Vue.js, demonstrando conceitos modernos de frontend, incluindo composição de componentes, gerenciamento de estado e integração com APIs.

## Tecnologias Utilizadas

- **Vue 3** com Composition API
- **TypeScript** para tipagem estática
- **Vite** como bundler e servidor de desenvolvimento
- **Pinia** para gerenciamento de estado
- **Vue Router** para navegação
- **Tailwind CSS** para estilização (se aplicável, baseado na estrutura)

## Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/willianmassayuki/vue-tasks.git
   cd vue-tasks
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra o navegador em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

## Funcionalidades

- **Autenticação**: Login e registro de usuários
- **Gerenciamento de Tarefas**: Criar, editar, excluir e listar tarefas
- **Interface Responsiva**: Design adaptável para diferentes dispositivos
- **Tema**: Suporte a temas claro e escuro

## Aplicação em Demanda Real

Este projeto aplica conceitos aprendidos no curso de Vue.js em um contexto prático:

- **Uso de Composition API**: Implementação de composables para lógica reutilizável (ex.: `useTheme.ts`)
- **Gerenciamento de Estado**: Utilização do Pinia para stores centralizados (`authStore.ts`, `tasksStore.ts`)
- **Roteamento**: Configuração de rotas com Vue Router para navegação SPA
- **Integração com API**: Serviços para comunicação com backend (`tasksService.ts`, `authService.ts`)
- **Componentização**: Estrutura modular com componentes reutilizáveis (`TaskItem.vue`, `TaskForm.vue`)

### Evidências em Código

- **refactor: cleaning emits**: ([link para commit](https://github.com/willianmassayuki/vue-tasks/commit/b0645b9065ebd56f67962e913bf1570de51bb4b6))

Antes: Propriedades e funções passando de pai para filho;
Depois: Refatoração para usar o estado global.

Essa alteração visa evitar trabalho e repetição na criação e manutenção de componentes.

## Live Preview

[Visualizar aplicação](https://vue-tasks-h76etyzff-willianmassayukis-projects.vercel.app/)
