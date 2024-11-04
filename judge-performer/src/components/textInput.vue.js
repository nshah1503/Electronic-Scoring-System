import { defineComponent } from 'vue';
export default defineComponent({
    name: "TextInput",
    props: {
        label: String,
        type: { type: String, default: 'text' },
        placeholder: String,
        modelValue: String,
    },
    emits: ['update:modelValue']
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
    __VLS_styleScopedClasses['text-input'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("input-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ((__VLS_ctx.label)), });
    (__VLS_ctx.label);
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (...[$event]) => {
                __VLS_ctx.$emit('update:modelValue', $event.target.value);
            } }, type: ((__VLS_ctx.type)), placeholder: ((__VLS_ctx.placeholder)), ...{ class: ("text-input") }, });
    (__VLS_ctx.modelValue);
    __VLS_styleScopedClasses['input-group'];
    __VLS_styleScopedClasses['text-input'];
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
