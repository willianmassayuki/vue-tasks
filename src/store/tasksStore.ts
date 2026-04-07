import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { tasksService, type Task } from "../services/tasksService";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const editingTaskId = ref<number | null>(null);

  const pendindTasks = computed(() => {
    return tasks.value.filter((task) => !task.done);
  });

  const completedTasks = computed(() => {
    return tasks.value.filter((task) => task.done);
  });

  const toggleTask = async (id: number, done: boolean): Promise<Task> => {
    try {
      const updatedTask = await tasksService.update(id, { done });
      const index = tasks.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
      return updatedTask;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao atualizar tarefa";
      console.error("Erro ao atualizar tarefa:", err);
      throw err;
    }
  };

  const setEditingTask = (task: Task | null): void => {
    editingTaskId.value = null;

    if (task) {
      editingTaskId.value = task.id;
    }
  };

  const loadTasks = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;
      tasks.value = await tasksService.getAll();
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao carregar tarefas";
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      loading.value = false;
    }
  };

  const createTask = async (title: string): Promise<Task> => {
    loading.value = true;
    error.value = null;

    try {
      const newTask = await tasksService.create({
        title: title,
        done: false,
      });

      tasks.value.push(newTask);
      return newTask;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao criar a tarefa";
      console.error("Erro ao criar a tarefa:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateTask = async (
    id: number,
    title: string,
  ): Promise<Task | void> => {
    if (!title.trim()) {
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const updateTask = await tasksService.update(id, {
        title: title.trim(),
      });

      const index = tasks.value.findIndex((t) => t.id === id);

      if (index !== -1) {
        tasks.value[index] = updateTask;
      }

      return updateTask;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao atualizar a tarefa";
      console.error("Erro ao atualizar a tarefa:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    loading.value = true;
    try {
      await tasksService.delete(id);
      tasks.value = tasks.value.filter((t) => t.id !== id);
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      error.value =
        axiosError.response?.data?.message || "Erro ao deletar a tarefa";
      console.error("Erro ao deletar a tarefa:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    pendindTasks,
    completedTasks,
    toggleTask,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    editingTaskId,
    setEditingTask,
    error,
    loading,
    tasks,
  };
});
