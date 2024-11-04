import { RouterLink, RouterView, useRoute } from 'vue-router';
import DarkModeToggle from './components/darkModeToggle.vue';
import { inject, ref, onMounted } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const auth0 = inject('auth0');
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
    await auth0?.logout({ returnTo: window.location.origin });
    isAuthenticated.value = false; // Update the reactive property after logout
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
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
    __VLS_styleScopedClasses['dark-mode'];
    __VLS_styleScopedClasses['dark-mode'];
    __VLS_styleScopedClasses['dark-mode'];
    __VLS_styleScopedClasses['dark-mode'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("app"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    if (!__VLS_ctx.isLoginPage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
        if (!__VLS_ctx.isAuthenticated) {
            const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
            /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/login"), }));
            const __VLS_2 = __VLS_1({ to: ("/login"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            __VLS_nonNullable(__VLS_5.slots).default;
            var __VLS_5;
        }
        if (__VLS_ctx.isAuthenticated) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleLogout) }, });
        }
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ to: ("/dashboard"), }));
        const __VLS_8 = __VLS_7({ to: ("/dashboard"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_nonNullable(__VLS_11.slots).default;
        var __VLS_11;
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/results"), }));
        const __VLS_14 = __VLS_13({ to: ("/results"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_nonNullable(__VLS_17.slots).default;
        var __VLS_17;
        const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ to: ("/admin"), }));
        const __VLS_20 = __VLS_19({ to: ("/admin"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        __VLS_nonNullable(__VLS_23.slots).default;
        var __VLS_23;
        // @ts-ignore
        [DarkModeToggle,];
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent(DarkModeToggle, new DarkModeToggle({}));
        const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
    const __VLS_29 = __VLS_resolvedLocalAndGlobalComponents.RouterView;
    /** @type { [typeof __VLS_components.RouterView, ] } */
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
    const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
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
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            RouterView: RouterView,
            DarkModeToggle: DarkModeToggle,
            isAuthenticated: isAuthenticated,
            isLoginPage: isLoginPage,
            handleLogout: handleLogout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
