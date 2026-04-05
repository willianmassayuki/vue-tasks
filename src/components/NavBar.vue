<template>
  <header
    class="flex py-3 bg-white dark:bg-rocket-gray-900 border-b border-rocket-gray-200 dark:border-rocket-gray-800 top-0 z-50"
  >
    <div class="flex items-center gap-4">
      <Rocket class="ml-4 w-5 h-5 text-rocket-purple-400" />
      <span
        v-if="isAuthenticated"
        class="text-rocket-gray-700 dark:text-rocket-gray-300"
      >
        Olá, {{ username }}
      </span>
      <MenuItem v-if="!isAuthenticated" redirectTo="/login" title="Login" />

      <MenuItem
        v-if="!isAuthenticated"
        redirectTo="/register"
        title="Cadastre-se"
      />

      <MenuItem v-if="isAuthenticated" redirectTo="/tasks" title="Tarefas" />
    </div>
    <button
      @click="toggleTheme"
      class="px-4 py-2 rounded-lg text-rocket-gray-600 dark:text-rocket-gray-300 bg-transparent border border-rocket-gray-200 dark:border-rocket-gray-800 cursor-pointer transition-all durantion-200 font-medium hover:bg-rocket-gray-50 dark:hover:bg-rocket-gray-800 hover:text-rocket-purple-500 dark:hover:text-rocket-purple-400"
    >
      {{ isDark ? "Modo Claro" : "Modo Escuro" }}
    </button>
  </header>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "../store/authStore";
import MenuItem from "./MenuItem.vue";
import { useTheme } from "@/composables/useTheme";
import { Rocket } from "lucide-vue-next";

export default {
  name: "NavBar",

  components: {
    MenuItem,
    Rocket,
  },
  setup() {
    const { isDark, toggleTheme } = useTheme();
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const username = computed(() => authStore.userName);

    return {
      isDark,
      toggleTheme,
      isAuthenticated,
      username,
    };
  },
};
</script>
