<template>
  <div>
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-rocket-gray-900 dark:text-white">
          Minhas Tarefas
        </h1>
      </div>

      <TaskForm @submit="handleCreateTask" :loading="tasksStore.loading" />

      <div
        v-if="tasksStore.error"
        class="bg-red-300 text-red-600 p-4 text-center font-bold rounded-lg"
      >
        <p>{{ tasksStore.error }}</p>
      </div>

      <div
        v-if="tasksStore.loading && tasksStore.tasks.length === 0"
        class="text-center py-8"
      >
        <p class="text-rocket-gray-600 dark:text-rocket-gray-400">
          Carregando tarefas...
        </p>
      </div>

      <div v-else-if="tasksStore.tasks.length === 0" class="text-center py-8">
        <p class="text-rocket-gray-600 dark:text-rocket-gray-400">
          Nenhuma tarefa cadastrada ainda.
        </p>
      </div>

      <div v-else>
        <TaskList title="Pendentes" :tasks="tasksStore.pendindTasks" />
        <TaskList title="Concluídas" :tasks="tasksStore.completedTasks" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import TaskForm from "../components/tasks/TaskForm.vue";
import { useTasksStore } from "../store/tasksStore";
import TaskList from "../components/tasks/TaskList.vue";

export default {
  name: "TaskView",

  components: {
    TaskForm,
    TaskList,
  },

  setup() {
    const tasksStore = useTasksStore();

    const handleCreateTask = async (title) => {
      try {
        await tasksStore.createTask(title);
      } catch (err) {
        console.error("Erro ao criar tarefa: ", err);
      }
    };

    // const handleToggleTask = async (id, done) => {
    //   try {
    //     await tasksStore.toggleTask(id, done);
    //   } catch (err) {
    //     console.error("Erro ao atualizar a  tarefa: ", err);
    //   }
    // };

    onMounted(() => {
      tasksStore.loadTasks();
    });

    return {
      tasksStore,
      handleCreateTask,
      // handleToggleTask,
    };
  },
};
</script>

<style></style>
