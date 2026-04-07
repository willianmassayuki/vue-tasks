import { computed } from 'vue';
<template>
  <div
    :class="[
      'bg-white dark:bg-rocket-gray-800 p-4 rounded-lg border border-rocket-gray-200 dark:border-rocket-gray-700',
      'flex items-center gap-4 transition-all',
      task.done ? 'opacity-60' : '',
    ]"
  >
    <label class="relative inline-flex item-center cursor-pointer">
      <input
        type="checkbox"
        :checked="task.done"
        class="sr-only peer"
        @change="handleToggleTask"
      />
      <div
        :class="[
          'w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
          task.done
            ? 'bg-rocket-purple-500 border-rocket-purple-500'
            : 'bg-transparent border-rocket-gray-300 dark:border-rocket-gary-600',
          'peer-focus:ring-2 peer-focus:ring-rocket-purple-500 peer-focus:ring-offset-2',
        ]"
      >
        <svg
          v-if="task.done"
          class="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </label>
    <div class="flex-1">
      <input
        v-if="isEditing"
        v-model="editingTitle"
        @keyup.esc="cancelTaskEdit"
        @keyup.enter="saveTaskEdit"
        :class="[
          'w-full px-3 py-2 border border-rocket-gray-300 dark:border-rocket-gray-700',
          'rounded bg-white dark:bg-rocket-gray-800 text-rocket-gray-900 dark:text-white',
          'focus:outline-none focus:ring-rocket-purple-500 focus:border-rocket-purple-500',
        ]"
      />
      <p
        v-else
        @dblclick="editingTask"
        :class="[
          'cursor-pointer select-none',
          task.done
            ? 'line-through text-rocket-gray-500 dark:text-rocket-gray-300'
            : 'text-rocket-gray-900 dark:text-white',
        ]"
      >
        {{ task.title }}
      </p>
    </div>
    <div class="flex gap-2">
      <button
        v-if="!isEditing"
        @click="editingTask"
        :class="[
          'p-2 bg-rocket-gray-100 dark:bg-rocket-gray-700 text-rocket-purple-500 hover:bg-rocket-purple-400',
          'dark:hover:bg-rocket-purple-900/30 rounded transition-colors cursor-pointer',
        ]"
      >
        <Edit class="w-5 h-5" />
      </button>

      <button
        :class="[
          'p-2 bg-rocket-gray-100 dark:bg-rocket-gray-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30',
          'rounded transition-colors cursor-pointer',
        ]"
        @click="handleDeleteTask"
      >
        <Trash class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTasksStore } from "../../store/tasksStore";
import { Edit, Trash } from "lucide-vue-next";
import Swal from "sweetalert2";

export default {
  name: "TaskItem",
  components: {
    Edit,
    Trash,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const editingTitle = ref("");
    const tasksStore = useTasksStore();

    const editingTask = () => {
      editingTitle.value = props.task.title;
      tasksStore.setEditingTask(props.task);
    };

    const cancelTaskEdit = () => {
      editingTitle.value = "";
      tasksStore.setEditingTask(null);
    };

    const saveTaskEdit = async () => {
      try {
        if (!editingTitle.value.trim()) {
          cancelTaskEdit();
          return;
        }
        await tasksStore.updateTask(props.task.id, editingTitle.value);
      } catch (err) {
        console.error("Erro ao atualizar a tarefa: ", err);
      } finally {
        cancelTaskEdit();
      }
    };

    const isEditing = computed(
      () => tasksStore.editingTaskId === props.task.id,
    );

    const handleToggleTask = async () => {
      try {
        await tasksStore.toggleTask(props.task.id, !props.task.done);
      } catch (err) {
        console.error("Erro ao atualizar a  tarefa: ", err);
      }
    };

    const handleDeleteTask = async () => {
      try {
        const result = await Swal.fire({
          title: "Excluir Tarefa?",
          text: "Esta ação não pode ser desfeita.",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#8257e6",
          cancelButtonColor: "#737380",
          cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
          tasksStore.deleteTask(props.task.id);

          Swal.fire({
            title: "Excluir Tarefa",
            text: "A tarefa foi removida com sucesso!",
            icon: "success",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Excluir Tarefa",
          text: "Ocorreu um erro ao excluir a tarefa!",
          icon: "error",
        });
      }
    };

    return {
      handleToggleTask,
      isEditing,
      editingTask,
      editingTitle,
      cancelTaskEdit,
      saveTaskEdit,
      handleDeleteTask,
    };
  },
};
</script>
