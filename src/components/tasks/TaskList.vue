<template>
  <div>
    <h2>{{ title }}</h2>
    <div>
      <p>Itens da nossa lista {{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
