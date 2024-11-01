<template>
  <div class="login-card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "LoginCard"
});
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
}
</style>
