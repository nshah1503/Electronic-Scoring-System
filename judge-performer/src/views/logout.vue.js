import { inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default (await import('vue')).defineComponent({
    setup() {
        const auth0 = inject('auth0');
        const router = useRouter();
        onMounted(async () => {
            if (auth0) {
                try {
                    // Logout once and redirect directly to login page
                    await auth0.logout({ returnTo: window.location.origin });
                    router.push('/login'); // This should not re-trigger login
                }
                catch (error) {
                    console.error("Error during logout:", error);
                }
            }
            else {
                console.error("Auth0 client not initialized");
            }
        });
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
let __VLS_self;
