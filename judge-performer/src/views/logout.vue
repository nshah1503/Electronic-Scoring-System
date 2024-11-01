<template>
  <div>Logging out...</div>
</template>

<script lang="ts">
import { inject, onMounted } from 'vue';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const auth0 = inject<Auth0Client>('auth0');
    const router = useRouter();

    onMounted(async () => {
      if (auth0) {
        try {
          // Logout once and redirect directly to login page
          await auth0.logout({ returnTo: window.location.origin } as any);
          router.push('/login'); // This should not re-trigger login
        } catch (error) {
          console.error("Error during logout:", error);
        }
      } else {
        console.error("Auth0 client not initialized");
      }
    });
  },
};
</script>
