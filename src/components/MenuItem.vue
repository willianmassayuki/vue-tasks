<template>
  <router-link :to="redirectTo" class="text-blue-600 hover:underline">{{
    title
  }}</router-link>
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
