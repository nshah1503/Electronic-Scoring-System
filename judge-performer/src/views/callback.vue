<!-- <template>
  <div>Loading...</div>
</template>

<script lang="ts">
import { inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Auth0Client } from '@auth0/auth0-spa-js';

export default {
  setup() {
    const auth0 = inject<Auth0Client>('auth0');
    const router = useRouter();

    onMounted(async () => {
      if (auth0) {
        try {
          console.log("Attempting to handle redirect callback...");
          const result = await auth0.handleRedirectCallback();
          console.log("Callback result:", result);
          const user = await auth0.getUser();
          console.log("User info:", user);
          router.push("/dashboard");
        } catch (error) {
          // console.error("Error handling Auth0 callback:", error);
          // router.push('/login');  // Redirect to login if there's an error
          const typedError = error as Error;  // Cast error to Error type
          console.error("Error handling Auth0 callback:", typedError);
          console.error("Error details:", (typedError as any).response?.data || typedError.message);
          router.push("/login");
        }
      } else {
        console.error("Auth0 client not initialized");
      }
    });
  },
};
</script> -->


<template>
  <div>Loading...</div> <!-- Show loading state while processing -->
</template>

<script>
import { onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";

export default {
  name: "Callback",
  setup() {
    const { handleRedirectCallback } = useAuth0();
    const router = useRouter();

    onMounted(async () => {
      try {
        await handleRedirectCallback(); // Handles the Auth0 redirect
        router.push("/dashboard"); // Redirect to the dashboard after successful login
      } catch (error) {
        console.error("Error handling Auth0 callback:", error);
        router.push("/"); // Redirect to login page on error
      }
    });
  },
};
</script>
