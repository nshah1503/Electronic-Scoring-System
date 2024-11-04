import { onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";
export default (await import('vue')).defineComponent({
    name: "Callback",
    setup() {
        const { handleRedirectCallback } = useAuth0();
        const router = useRouter();
        onMounted(async () => {
            try {
                await handleRedirectCallback(); // Handles the Auth0 redirect
                router.push("/dashboard"); // Redirect to the dashboard after successful login
            }
            catch (error) {
                console.error("Error handling Auth0 callback:", error);
                router.push("/"); // Redirect to login page on error
            }
        });
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
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
