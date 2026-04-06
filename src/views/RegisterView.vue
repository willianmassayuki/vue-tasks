<template>
  <div
    :class="[
      'min-h-screen flex items-center justify-center bg-rocket-gray-50 dark:bg-rocket-gray-900',
      'py-12 px-4 sm:px-6 lg:px-8',
    ]"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="flex justify-center items-center gap-2 mb-6">
          <Rocket class="w-8 h-8 text-rocket-purple-500" />
          <h1 class="text-3xl font-bold text-rocket-gray-900 dark:text-white">
            RocketTasks
          </h1>
        </div>
        <h2 class="text-2xl font-bold text-rocket-gray-900 dark:text-white">
          Crie sua conta
        </h2>
        <p class="mt-2 text-sm text-rocket-gray-600 dark:text-rocket-gray-400">
          Ou
          <router-link
            to="/login"
            :class="[
              'font-medium text-rocket-purple-500 hover:text-rocket-purple-900',
              'dark:text-rocket-purple-400 dark:hover:text-rocket-purple-300 transition-colors',
            ]"
          >
            faça login
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="username" class="sr-only"> Usuário </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              >
                <User class="h-5 w-5 text-rocket-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Digite o nome do seu usuário"
                :class="[
                  'relative block w-full pl-10 pr-3 py-3 border border-rocket-gray-300',
                  'dark:border-rocket-gray-700 placeholder-rocket-gray-500 dark:placeholder-rocket-gray-400',
                  'text-rocket-gray-900 dark:text-white rounded-lg bg-white dark:bg-rocket-gray-800',
                  'focus:outline-none focus:ring-rocket-purple-500 focus:border-rocket-purple-500  transition-colors',
                ]"
              />
            </div>
          </div>

          <div>
            <label for="password" class="sr-only"> Senha </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              >
                <Lock class="h-5 w-5 text-rocket-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Digite sua senha"
                :class="[
                  'relative block w-full pl-10 pr-3 py-3 border border-rocket-gray-300',
                  'dark:border-rocket-gray-700 placeholder-rocket-gray-500 dark:placeholder-rocket-gray-400',
                  'text-rocket-gray-900 dark:text-white rounded-lg bg-white dark:bg-rocket-gray-800',
                  'focus:outline-none focus:ring-rocket-purple-500 focus:border-rocket-purple-500  transition-colors',
                ]"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="togglePasswordVisibility"
              >
                <Eye
                  v-if="true"
                  class="h-5 w-5 text-rocket-gray-400 hover:text-rocket-gray-600 dark:hover:text-rocket-gray-300"
                />
                <EyeOff
                  v-else
                  class="h-5 w-5 text-rocket-gray-400 hover:text-rocket-gray-600 dark:hover:text-rocket-gray-300"
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :class="[
              'group relative w-full flex justify-center py-3 px-4 border',
              'border-transparent text-sm font-medium rounded-lg text-white',
              'bg-rocket-purple-500 hover:bg-rocket-purple-600 focus:outline-none',
              'focus:ring-2 focus:ring-offset-2 focus:ring-rocket-purple-500',
              'disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
            ]"
          >
            <UserPlus class="w-5 h-5 mr-2" />
            Criar conta
          </button>
        </div>
      </form>

      <div
        v-if="true"
        class="bg-red-300 text-red-600 p-4 text-center font-bold rounded-lg"
      >
        <p>{ authStore?.error }</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Eye,
  EyeOff,
  Lock,
  Rocket,
  LogIn,
  User,
  UserPlus,
} from "lucide-vue-next";

export default {
  components: {
    Eye,
    EyeOff,
    Lock,
    Rocket,
    LogIn,
    User,
    UserPlus,
  },
};
</script>

<style></style>
