<template>
  <div class="login-container">
    <login-card>
      <h1>Judge Login</h1>
      <submit-button @click="login">Log in with Auth0</submit-button>
    </login-card>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue';
import { Auth0Client } from '@auth0/auth0-spa-js'; // Import the type
import loginCard from '@/components/loginCard.vue';
import submitButton from '@/components/submitButton.vue';

export default {
  components: {
    loginCard,
    submitButton,
  },
  setup() {
    const auth0 = inject<Auth0Client>('auth0'); // Use the correct type for auth0

    const login = async () => {
      if (auth0) {
        await auth0.loginWithRedirect(); // This should now be recognized by TypeScript
      } else {
        console.error("Auth0 client not initialized");
      }
    };

    return { login };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
