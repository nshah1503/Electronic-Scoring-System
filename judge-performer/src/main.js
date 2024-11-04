import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { authConfig } from './authConfig/authConfig';
import { createAuth0Client } from '@auth0/auth0-spa-js';
let auth0Client;
const app = createApp(App);
async function initAuth0() {
    auth0Client = await createAuth0Client({
        domain: authConfig.domain,
        clientId: authConfig.clientId,
        authorizationParams: {
            redirect_uri: authConfig.redirectUri,
            scope: "openid profile email",
        },
        cacheLocation: 'localstorage',
        useRefreshTokens: true,
    });
    app.provide('auth0', auth0Client); // Make auth0Client available globally
}
initAuth0().then(() => {
    app.use(router);
    app.mount('#app');
});
