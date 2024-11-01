<template>
  <div id="app">
    <header>
      <h1>Electronic Scoring System</h1>
      <nav v-if="!isLoginPage">
        <RouterLink v-if="!isAuthenticated" to="/login">Login</RouterLink>
        <button v-if="isAuthenticated" @click="handleLogout">Logout</button> |
        <RouterLink to="/dashboard">Dashboard</RouterLink> |
        <RouterLink to="/results">Results</RouterLink> |
        <RouterLink to="/admin">Admin</RouterLink>
        <DarkModeToggle />
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import DarkModeToggle from './components/darkModeToggle.vue';
import { inject, ref, onMounted } from 'vue';
import { Auth0Client } from '@auth0/auth0-spa-js';

const route = useRoute();
const auth0 = inject<Auth0Client>('auth0');

// Reactive property to store whether the user is authenticated
const isAuthenticated = ref(false);

// Check authentication status on mount
onMounted(async () => {
  if (auth0) {
    isAuthenticated.value = await auth0.isAuthenticated();
  }
});

// Reactive property to check if current route is login page
const isLoginPage = ref(route.path === '/login');

// Logout handler
const handleLogout = async () => {
  await auth0?.logout({ returnTo: window.location.origin } as any);
  isAuthenticated.value = false;  // Update the reactive property after logout
};
</script>

<style scoped>
/* Basic styles */
#app {
  text-align: center;
}

header {
  padding: 1em;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a,
nav button {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
}

nav a:hover,
nav button:hover {
  text-decoration: underline;
}

main {
  padding: 2em;
  background-color: #f0f0f0;
  color: #333;
}

/* Dark mode styles */
body.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark-mode header {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

body.dark-mode nav a,
body.dark-mode nav button {
  color: #e0e0e0;
}

body.dark-mode main {
  background-color: #1e1e1e;
  color: #e0e0e0;
}
</style>