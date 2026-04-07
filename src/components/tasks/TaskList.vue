<template>
  <div>
    <h2 class="text-xl font-semibold text-rocket-gray-900 dark:text-white mb-4">
      {{ title }}
    </h2>
    <div class="space-y-3 min-h-[100px]">
      <TaskItem
        v-for="item in tasks"
        :key="item.id"
        :task="item"
        @toggle="(id, done) => $emit('toggle', id, done)"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle"],
};
</script>
