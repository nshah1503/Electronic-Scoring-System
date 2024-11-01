<template>
  <button type="submit" class="submit-button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "SubmitButton"
});
</script>

<style scoped>
.submit-button {
  width: 100%;
  padding: 0.75em;
  background-color: #0077cc;
  color: #ffffff;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #005fa3;
}
</style>
