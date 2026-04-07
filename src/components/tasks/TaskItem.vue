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
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTasksStore } from "../../store/tasksStore";

export default {
  name: "TaskItem",
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

    return {
      handleToggleTask,
      isEditing,
      editingTask,
      editingTitle,
      cancelTaskEdit,
      saveTaskEdit,
    };
  },
};
</script>
