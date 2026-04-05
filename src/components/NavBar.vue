<template>
  <header>
    <MenuItem redirectTo="/login" title="Login" />

    <MenuItem redirectTo="/register" title="Cadastre-se" />

    <MenuItem redirectTo="/tasks" title="Tarefas" />
  </header>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  name: "NavBar",

  components: {
    MenuItem,
  },
};
</script>
