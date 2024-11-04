import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const performers = ref([]);
const judges = ref([]);
const votingJudgeId = ref(null); // Track the active voting judge
const showAddPerformerForm = ref(false);
const newPerformer = ref({ performerId: '', name: '', emailId: '', status: 'not performed' });
async function fetchPerformers() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/admin/performers');
        performers.value = response.data;
    }
    catch (error) {
        console.error("Failed to load performers:", error);
    }
}
async function fetchJudges() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/admin/judges');
        judges.value = response.data.map(judge => ({ ...judge, hasVoted: false }));
    }
    catch (error) {
        console.error("Failed to load judges:", error);
    }
}
// Fetch the active voting judge
async function fetchVotingJudge() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/admin/active-voting-judge');
        votingJudgeId.value = response.data.judgeId;
    }
    catch (error) {
        console.error("Failed to fetch active voting judge:", error);
    }
}
onMounted(() => {
    fetchPerformers();
    fetchJudges();
    fetchVotingJudge();
    setInterval(fetchPerformers, 10000);
});
const anyPerforming = computed(() => {
    return performers.value.some((performer) => performer.status === 'performing');
});
// Reset all judges' voting status when a new performer performs
async function updateStatus(performer) {
    if (performer.status === "not performed" && !anyPerforming.value) {
        performer.status = "performing";
        try {
            await axios.post('http://127.0.0.1:5000/admin/update-status', {
                performerId: performer.performerId,
                status: "performing",
            });
            performers.value = [...performers.value];
            // Reset voting status for all judges
            judges.value.forEach(judge => judge.hasVoted = false);
            votingJudgeId.value = null; // Reset active voting judge
            setTimeout(async () => {
                performer.status = "performed";
                await axios.post('http://127.0.0.1:5000/admin/update-status', {
                    performerId: performer.performerId,
                    status: "performed",
                });
                performers.value = [...performers.value];
            }, 20000);
        }
        catch (error) {
            console.error("Failed to update status:", error);
        }
    }
}
async function updateVotingJudge(judgeId) {
    try {
        await axios.post('http://127.0.0.1:5000/admin/update-voting-judge', { judgeId });
        votingJudgeId.value = judgeId; // Update the local state to reflect the selected judge
        const judge = judges.value.find(j => j.judgeId === judgeId);
        if (judge)
            judge.hasVoted = true; // Mark this judge as having voted
    }
    catch (error) {
        console.error("Failed to update voting judge:", error);
    }
}
async function addPerformer() {
    const { performerId, name, emailId, status } = newPerformer.value;
    if (!performerId || !name || !emailId) {
        alert("Please fill in all fields.");
        return;
    }
    try {
        const response = await axios.post('http://127.0.0.1:5000/admin/add-performer', {
            performerId,
            name,
            emailId,
            status,
        });
        performers.value.push(response.data);
        newPerformer.value = { performerId: '', name: '', emailId: '', status: 'not performed' };
        showAddPerformerForm.value = false;
    }
    catch (error) {
        console.error("Failed to add performer:", error);
    }
}
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
    __VLS_styleScopedClasses['performers-section'];
    __VLS_styleScopedClasses['judges-section'];
    __VLS_styleScopedClasses['performing-now-button'];
    __VLS_styleScopedClasses['voting-now-button'];
    __VLS_styleScopedClasses['voting-now-button'];
    __VLS_styleScopedClasses['add-button'];
    __VLS_styleScopedClasses['add-performer-form'];
    __VLS_styleScopedClasses['add-performer-form'];
    __VLS_styleScopedClasses['form-buttons'];
    __VLS_styleScopedClasses['form-buttons'];
    __VLS_styleScopedClasses['voting-now-button'];
    __VLS_styleScopedClasses['voting-now-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['voting-now-button'];
    __VLS_styleScopedClasses['disabled'];
    __VLS_styleScopedClasses['voting-now-button'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['disabled'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("admin-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("performers-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    for (const [performer] of __VLS_getVForSourceType((__VLS_ctx.performers))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("performer-item") }, key: ((performer.performerId)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("performer-details") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("performer-name") }, });
        (performer.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("performer-status") }, });
        (performer.status);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.updateStatus(performer);
                } }, disabled: ((performer.status !== 'not performed' || __VLS_ctx.anyPerforming)), ...{ class: ("performing-now-button") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.showAddPerformerForm = true;
            } }, ...{ class: ("add-button") }, });
    if (__VLS_ctx.showAddPerformerForm) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("add-performer-form") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Performer ID"), });
        (__VLS_ctx.newPerformer.performerId);
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Performer Name"), });
        (__VLS_ctx.newPerformer.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ placeholder: ("Email ID"), });
        (__VLS_ctx.newPerformer.emailId);
        __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ value: ((__VLS_ctx.newPerformer.status)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("not performed"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("performing"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("performed"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-buttons") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.addPerformer) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.showAddPerformerForm)))
                        return;
                    __VLS_ctx.showAddPerformerForm = false;
                } }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("judges-section") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    for (const [judge] of __VLS_getVForSourceType((__VLS_ctx.judges))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("judge-item") }, key: ((judge.judgeId)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("judge-name") }, });
        (judge.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("judge-email") }, });
        (judge.emailId);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.updateVotingJudge(judge.judgeId);
                } }, ...{ class: ((['voting-now-button', { active: __VLS_ctx.votingJudgeId === judge.judgeId && !judge.hasVoted, disabled: judge.hasVoted }])) }, disabled: ((judge.hasVoted)), });
    }
    __VLS_styleScopedClasses['admin-page'];
    __VLS_styleScopedClasses['performers-section'];
    __VLS_styleScopedClasses['performer-item'];
    __VLS_styleScopedClasses['performer-details'];
    __VLS_styleScopedClasses['performer-name'];
    __VLS_styleScopedClasses['performer-status'];
    __VLS_styleScopedClasses['performing-now-button'];
    __VLS_styleScopedClasses['add-button'];
    __VLS_styleScopedClasses['add-performer-form'];
    __VLS_styleScopedClasses['form-buttons'];
    __VLS_styleScopedClasses['judges-section'];
    __VLS_styleScopedClasses['judge-item'];
    __VLS_styleScopedClasses['judge-name'];
    __VLS_styleScopedClasses['judge-email'];
    __VLS_styleScopedClasses['active'];
    __VLS_styleScopedClasses['disabled'];
    __VLS_styleScopedClasses['voting-now-button'];
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
            performers: performers,
            judges: judges,
            votingJudgeId: votingJudgeId,
            showAddPerformerForm: showAddPerformerForm,
            newPerformer: newPerformer,
            anyPerforming: anyPerforming,
            updateStatus: updateStatus,
            updateVotingJudge: updateVotingJudge,
            addPerformer: addPerformer,
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
