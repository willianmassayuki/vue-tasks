<template>
  <div>
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-rocket-gray-900 dark:text-white">
          Minhas Tarefas
        </h1>
      </div>

      <TaskForm />

      <div class="bg-red-300 text-red-600 p-4 text-center font-bold rounded-lg">
        <p>Quando houver um erro, vai aparecer aqui</p>
      </div>

      <div class="text-center py-8">
        <p class="text-rocket-gray-600 dark:text-rocket-gray-400">
          Carregando tarefas...
        </p>
      </div>

      <div class="text-center py-8">
        <p class="text-rocket-gray-600 dark:text-rocket-gray-400">
          Nenhuma tarefa cadastrada ainda.
        </p>
      </div>

      <div>
        <p>Aqui serão exibidas as tarefas</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from "../components/tasks/TaskForm.vue";

export default {
  name: "TaskView",

  components: {
    TaskForm,
  },
};
</script>

<style></style>
