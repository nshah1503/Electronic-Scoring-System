import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
export default defineComponent({
    name: "Results",
    setup() {
        const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
        const results = ref([]);
        // Function to fetch results from the backend
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/scoreboard/final-scores');
                results.value = response.data;
            }
            catch (error) {
                console.error("Failed to load results:", error);
            }
        };
        // Polling interval for fetching updates
        let pollingInterval;
        onMounted(() => {
            fetchResults(); // Initial fetch
            // Set interval to fetch updates every 5 seconds
            pollingInterval = setInterval(fetchResults, 5000);
        });
        onUnmounted(() => {
            clearInterval(pollingInterval); // Clear interval on component unmount
        });
        return { results, categories };
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
    __VLS_styleScopedClasses['results-table'];
    __VLS_styleScopedClasses['results-table'];
    __VLS_styleScopedClasses['results-table'];
    __VLS_styleScopedClasses['results-table'];
    __VLS_styleScopedClasses['results-table'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("results-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("results-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("results-table") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ key: ((category)), });
        (category);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [result] of __VLS_getVForSourceType((__VLS_ctx.results))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((result.performerId + '-' + result.judgeId)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (result.performerName);
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (result.judgeName);
        for (const [score] of __VLS_getVForSourceType((result.scores))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({ key: ((score)), });
            (score);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (result.finalScore);
    }
    __VLS_styleScopedClasses['results-page'];
    __VLS_styleScopedClasses['results-card'];
    __VLS_styleScopedClasses['results-table'];
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
