import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
export default defineComponent({
    name: "Dashboard",
    setup() {
        const route = useRoute();
        const judgeId = route.params.judgeId; // Get the judgeId from the route
        const performers = ref([]);
        const currentVotingJudge = ref(null);
        const timers = new Map();
        async function fetchPerformers() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/admin/performers');
                const performersData = response.data;
                for (const updatedPerformer of performersData) {
                    const existingPerformer = performers.value.find((p) => p.performerId === updatedPerformer.performerId);
                    // Check if the current judge has already submitted scores for this performer
                    const scoreResponse = await axios.get('http://127.0.0.1:5000/judge/check-score-exists', {
                        params: {
                            performerId: updatedPerformer.performerId,
                            judgeId: judgeId // Use dynamic judge ID here
                        }
                    });
                    const hasScored = scoreResponse.data.exists;
                    if (existingPerformer) {
                        existingPerformer.status = updatedPerformer.status;
                        existingPerformer.enableSubmit = !hasScored && updatedPerformer.status === 'performed';
                        existingPerformer.hasBeenScored = hasScored;
                        if (updatedPerformer.status === 'performed' && !existingPerformer.timerActive && !hasScored) {
                            activateTimer(existingPerformer);
                        }
                    }
                    else {
                        performers.value.push({
                            ...updatedPerformer,
                            status: updatedPerformer.status || "not performed",
                            timer: "05:00",
                            timerActive: false,
                            enableSubmit: !hasScored && updatedPerformer.status === 'performed',
                            hasBeenScored: hasScored,
                            scores: {
                                category1: "0",
                                category2: "0",
                                category3: "0",
                                category4: "0",
                                category5: "0",
                            },
                        });
                    }
                }
            }
            catch (error) {
                console.error("Failed to load performers:", error);
            }
        }
        async function fetchCurrentVotingJudge() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/admin/current-voting-judge');
                currentVotingJudge.value = response.data;
            }
            catch (error) {
                console.error("Failed to load current voting judge:", error);
            }
        }
        onMounted(() => {
            fetchPerformers();
            fetchCurrentVotingJudge();
            setInterval(fetchPerformers, 5000); // Poll every 5 seconds to update status in real-time
            setInterval(fetchCurrentVotingJudge, 5000);
        });
        function activateTimer(performer) {
            let minutes = 5;
            let seconds = 0;
            performer.timerActive = true;
            const countdown = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(countdown);
                        performer.timerActive = false;
                        performer.enableSubmit = false;
                    }
                    else {
                        minutes--;
                        seconds = 59;
                    }
                }
                else {
                    seconds--;
                }
                performer.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }, 1000);
            timers.set(performer.performerId, countdown);
        }
        function clearTimer(performer) {
            const timer = timers.get(performer.performerId);
            if (timer) {
                clearInterval(timer);
                timers.delete(performer.performerId);
            }
            performer.timerActive = false;
            performer.enableSubmit = false;
            performer.timer = "00:00";
        }
        const submitScores = async (performer) => {
            try {
                await axios.post('http://127.0.0.1:5000/judge/submit-score', {
                    performerId: performer.performerId,
                    judgeId: judgeId, // Use dynamic judge ID here
                    scores: performer.scores,
                });
                console.log(`Scores submitted for ${performer.name}`);
                // Stop the timer and move to Past Performances
                clearTimer(performer);
                performer.hasBeenScored = true;
                // Update voting status after submitting scores
                await axios.post('http://127.0.0.1:5000/admin/rotate-voting', {
                    currentJudgeId: judgeId
                });
                // Refresh voting judge after updating
                fetchCurrentVotingJudge();
            }
            catch (error) {
                console.error("Failed to submit scores:", error);
            }
        };
        const currentPerformer = computed(() => performers.value.find(performer => performer.status === 'performed' && !performer.hasBeenScored));
        const pastPerformers = computed(() => performers.value.filter(performer => (performer.status === 'performed' || performer.status === 'performed & scored') &&
            performer.hasBeenScored));
        watch(currentPerformer, (newPerformer) => {
            if (newPerformer && newPerformer.status === 'performed' && !newPerformer.timerActive) {
                activateTimer(newPerformer);
            }
        });
        return { performers, currentPerformer, pastPerformers, submitScores, currentVotingJudge };
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
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['current-performance-section'];
    __VLS_styleScopedClasses['past-performance-section'];
    __VLS_styleScopedClasses['status'];
    __VLS_styleScopedClasses['status'];
    __VLS_styleScopedClasses['status'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("dashboard-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("dashboard-card") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    if (__VLS_ctx.currentVotingJudge) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("voting-now-section") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("voting-now-text") }, });
        (__VLS_ctx.currentVotingJudge.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("current-performance-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("performer-list") }, });
    if (__VLS_ctx.currentPerformer) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((__VLS_ctx.currentPerformer.performerId)), ...{ class: ("performer-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("performer-details") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("performer-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.currentPerformer.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("status") }, ...{ class: ((__VLS_ctx.currentPerformer.status)) }, });
        (__VLS_ctx.currentPerformer.status);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("scoring") }, });
        for (const [score, category] of __VLS_getVForSourceType((__VLS_ctx.currentPerformer.scores))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("category") }, key: ((category)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
            (category);
            __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.currentPerformer.scores[category])), disabled: ((__VLS_ctx.judgeId !== __VLS_ctx.currentVotingJudge?.judgeId)), });
            for (const [n] of __VLS_getVForSourceType((5))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((n)), value: ((n)), });
                (n);
            }
        }
        if (__VLS_ctx.currentPerformer.status === 'performed') {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            if (__VLS_ctx.currentPerformer.timerActive) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("timer") }, });
                (__VLS_ctx.currentPerformer.timer);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.currentPerformer)))
                            return;
                        if (!((__VLS_ctx.currentPerformer.status === 'performed')))
                            return;
                        __VLS_ctx.submitScores(__VLS_ctx.currentPerformer);
                    } }, ...{ class: ("submit-button") }, disabled: ((!__VLS_ctx.currentPerformer.enableSubmit || __VLS_ctx.judgeId !== __VLS_ctx.currentVotingJudge?.judgeId)), });
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("past-performance-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("performer-list") }, });
    for (const [performer] of __VLS_getVForSourceType((__VLS_ctx.pastPerformers))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((performer.performerId)), ...{ class: ("performer-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("performer-details") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("performer-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (performer.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("status") }, ...{ class: (({
                    'performing': performer.status === 'performing',
                    'performed': performer.status === 'performed',
                    'performed-scored': performer.status === 'performed & scored'
                })) }, });
        (performer.status);
    }
    __VLS_styleScopedClasses['dashboard-page'];
    __VLS_styleScopedClasses['dashboard-card'];
    __VLS_styleScopedClasses['voting-now-section'];
    __VLS_styleScopedClasses['voting-now-text'];
    __VLS_styleScopedClasses['current-performance-section'];
    __VLS_styleScopedClasses['performer-list'];
    __VLS_styleScopedClasses['performer-item'];
    __VLS_styleScopedClasses['performer-details'];
    __VLS_styleScopedClasses['performer-info'];
    __VLS_styleScopedClasses['status'];
    __VLS_styleScopedClasses['scoring'];
    __VLS_styleScopedClasses['category'];
    __VLS_styleScopedClasses['timer'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['past-performance-section'];
    __VLS_styleScopedClasses['performer-list'];
    __VLS_styleScopedClasses['performer-item'];
    __VLS_styleScopedClasses['performer-details'];
    __VLS_styleScopedClasses['performer-info'];
    __VLS_styleScopedClasses['status'];
    __VLS_styleScopedClasses['performing'];
    __VLS_styleScopedClasses['performed'];
    __VLS_styleScopedClasses['performed-scored'];
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
