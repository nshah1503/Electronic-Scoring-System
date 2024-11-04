import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: "ScoreForm",
    setup() {
        const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
        const scores = ref({});
        const submitScore = () => {
            // Placeholder for score submission logic
            console.log("Submitted scores:", scores.value);
        };
        return { categories, scores, submitScore };
    }
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
    __VLS_styleScopedClasses['category-select'];
    __VLS_styleScopedClasses['submit-button'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("scoreform-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("scoreform-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.submitScore) }, });
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((category)), ...{ class: ("category-group") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ((category)), ...{ class: ("category-label") }, });
        (category);
        __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.scores[category])), ...{ class: ("category-select") }, required: (true), });
        for (const [n] of __VLS_getVForSourceType((5))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((n)), value: ((n)), });
            (n);
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("submit-button") }, });
    __VLS_styleScopedClasses['scoreform-page'];
    __VLS_styleScopedClasses['scoreform-card'];
    __VLS_styleScopedClasses['category-group'];
    __VLS_styleScopedClasses['category-label'];
    __VLS_styleScopedClasses['category-select'];
    __VLS_styleScopedClasses['submit-button'];
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
