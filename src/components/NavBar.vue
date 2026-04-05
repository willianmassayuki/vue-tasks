<template>
  <header
    class="bg-white dark:bg-rocket-gray-900 border-b border-rocket-gray-200 dark:border-rocket-gray-800 top-0 z-50"
  >
    <div class="flex items-center gap-4">
      <MenuItem redirectTo="/login" title="Login" />

      <MenuItem redirectTo="/register" title="Cadastre-se" />

      <MenuItem redirectTo="/tasks" title="Tarefas" />
    </div>
    <button
      @click="toggleTheme"
      class="px-4 py-2 rounded-lg text-rocket-gray-600 dark:text-rocket-gray-300 bg-transparent border border-rocket-gray-200 dark:border-rocket-gray-800 cursor-pointer transition-all durantion-200 font-medium hover:bg-rocket-gray-50 dark:hover:bg-rocket-gray-800 hover:text-rocket-purple-500 dark:hover:text-rocket-purple-400"
    >
      {{ isDark ? "Modo Escuro" : "Modo Claro" }}
    </button>
  </header>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import { useTheme } from "@/composables/useTheme";

export default {
  name: "NavBar",

  components: {
    MenuItem,
  },
  setup() {
    const { isDark, toggleTheme } = useTheme();

    return {
      isDark,
      toggleTheme,
    };
  },
};
</script>
