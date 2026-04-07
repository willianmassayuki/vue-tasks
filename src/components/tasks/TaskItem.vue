import { computed } from 'vue';
<template>
  <div>
    <label for="">
      <input type="checkbox" :checked="task.done" />
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
};
</script>
