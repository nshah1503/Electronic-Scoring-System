import { inject } from 'vue';
import loginCard from '@/components/loginCard.vue';
import submitButton from '@/components/submitButton.vue';
export default (await import('vue')).defineComponent({
    components: {
        loginCard,
        submitButton,
    },
    setup() {
        const auth0 = inject('auth0'); // Use the correct type for auth0
        const login = async () => {
            if (auth0) {
                await auth0.loginWithRedirect(); // This should now be recognized by TypeScript
            }
            else {
                console.error("Auth0 client not initialized");
            }
        };
        return { login };
    },
});
; /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            loginCard,
            submitButton,
        },
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("login-container") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.LoginCard;
    /** @type { [typeof __VLS_components.LoginCard, typeof __VLS_components.loginCard, typeof __VLS_components.LoginCard, typeof __VLS_components.loginCard, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.SubmitButton;
    /** @type { [typeof __VLS_components.SubmitButton, typeof __VLS_components.submitButton, typeof __VLS_components.SubmitButton, typeof __VLS_components.submitButton, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ 'onClick': {} }, }));
    const __VLS_8 = __VLS_7({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_12;
    const __VLS_13 = {
        onClick: (__VLS_ctx.login)
    };
    let __VLS_9;
    let __VLS_10;
    __VLS_nonNullable(__VLS_11.slots).default;
    var __VLS_11;
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    __VLS_styleScopedClasses['login-container'];
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
