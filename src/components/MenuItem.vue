<template>
  <router-link
    :to="redirectTo"
    class="text-emerald-500 hover:underline hover:text-emerald-600 transition-colors"
    >{{ title }}</router-link
  >
</template>

<script>
export default {
  name: "MenuItem",

  props: {
    redirectTo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
