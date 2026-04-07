import { computed } from 'vue';
<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="task.done"
        class="sr-only peer"
        @change="handleToggle"
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
    <div>
      <p>{{ task.title }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  emits: ["toggle"],

  setup(props, { emit }) {
    const handleToggle = () => {
      emit("toggle", props.task.id, !props.task.done);
    };

    return {
      handleToggle,
    };
  },
};
</script>
