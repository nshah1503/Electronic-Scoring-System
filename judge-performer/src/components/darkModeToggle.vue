<template>
  <button @click="toggleDarkMode">
    {{ isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// State to track if dark mode is enabled
const isDarkMode = ref(false);

// Load the user's previous dark mode setting, if available
onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkMode.value);
});

// Function to toggle dark mode
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  localStorage.setItem('darkMode', isDarkMode.value.toString()); // Save preference
}
</script>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  color: inherit;
}
</style>
