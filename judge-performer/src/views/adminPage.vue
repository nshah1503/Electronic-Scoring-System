<template>
  <div class="admin-page">
    <h1>Admin Page</h1>
    <p>Manage Performers and Judges</p>

    <!-- Performers Section -->
    <div class="performers-section">
      <h2>Performers</h2>
      <div class="performer-item" v-for="performer in performers" :key="performer.performerId">
        <div class="performer-details">
          <span class="performer-name">{{ performer.name }}</span>
          <span class="performer-status">{{ performer.status }}</span>
        </div>
        <button 
          @click="updateStatus(performer)" 
          :disabled="performer.status !== 'not performed' || anyPerforming"
          class="performing-now-button"
        >
          Performing Now
        </button>
      </div>

      <!-- Add Performer Button -->
      <button @click="showAddPerformerForm = true" class="add-button">Add Performer</button>

      <!-- Add Performer Form -->
      <div v-if="showAddPerformerForm" class="add-performer-form">
        <h3>Add New Performer</h3>
        <input v-model="newPerformer.performerId" placeholder="Performer ID" />
        <input v-model="newPerformer.name" placeholder="Performer Name" />
        <input v-model="newPerformer.emailId" placeholder="Email ID" />
        <select v-model="newPerformer.status">
          <option value="not performed">Not Performed</option>
          <option value="performing">Performing</option>
          <option value="performed">Performed</option>
        </select>
        <div class="form-buttons">
          <button @click="addPerformer">Submit</button>
          <button @click="showAddPerformerForm = false">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Judges Section -->
    <div class="judges-section">
      <h2>Judges</h2>
      <div class="judge-item" v-for="judge in judges" :key="judge.judgeId">
        <span class="judge-name">{{ judge.name }}</span>
        <span class="judge-email">{{ judge.emailId }}</span>
        <button 
          @click="updateVotingJudge(judge.judgeId)" 
          :class="['voting-now-button', { active: votingJudgeId === judge.judgeId && !judge.hasVoted, disabled: judge.hasVoted }]"
          :disabled="judge.hasVoted"
        >
          Voting Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

interface Performer {
  performerId: string;
  name: string;
  emailId: string;
  status: string;
}

interface Judge {
  judgeId: string;
  name: string;
  emailId: string;
  hasVoted: boolean; // Track if judge has already voted
}

const performers = ref<Performer[]>([]);
const judges = ref<Judge[]>([]);
const votingJudgeId = ref<string | null>(null); // Track the active voting judge
const showAddPerformerForm = ref(false);
const newPerformer = ref({ performerId: '', name: '', emailId: '', status: 'not performed' });

async function fetchPerformers() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/performers');
    performers.value = response.data;
  } catch (error) {
    console.error("Failed to load performers:", error);
  }
}

async function fetchJudges() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/judges');
    judges.value = response.data.map(judge => ({ ...judge, hasVoted: false }));
  } catch (error) {
    console.error("Failed to load judges:", error);
  }
}

// Fetch the active voting judge
async function fetchVotingJudge() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/active-voting-judge');
    votingJudgeId.value = response.data.judgeId;
  } catch (error) {
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
async function updateStatus(performer: Performer) {
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
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }
}


async function updateVotingJudge(judgeId: string) {
  try {
    await axios.post('http://127.0.0.1:5000/admin/update-voting-judge', { judgeId });
    votingJudgeId.value = judgeId; // Update the local state to reflect the selected judge
    const judge = judges.value.find(j => j.judgeId === judgeId);
    if (judge) judge.hasVoted = true; // Mark this judge as having voted
  } catch (error) {
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
  } catch (error) {
    console.error("Failed to add performer:", error);
  }
}
</script>

<style scoped>
.admin-page {
  text-align: center;
}

.performers-section, .judges-section {
  margin-top: 20px;
  padding: 1em;
  background-color: #f4f6f8;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
}

.performers-section h2, .judges-section h2 {
  font-size: 1.5em;
  color: #0077cc;
}

.performer-item, .judge-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.performer-name, .judge-name {
  font-weight: bold;
}

.performer-status {
  font-size: 0.9em;
  color: #555;
  padding: 2px 8px;
  background-color: #eee;
  border-radius: 5px;
}

.performing-now-button, .add-button, .voting-now-button {
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.performing-now-button {
  background-color: #0077cc;
}

.voting-now-button.active {
  background-color: #28a745;
}

.voting-now-button.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.add-button {
  background-color: #0077cc;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-performer-form {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-performer-form input,
.add-performer-form select {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
}

.form-buttons {
  display: flex;
  gap: 10px;
}

.form-buttons button {
  padding: 8px 12px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-buttons button:hover {
  background-color: #005fa3;
}

.voting-now-button {
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.voting-now-button.active {
  background-color: #28a745; /* Green */
}

.voting-now-button.disabled {
  background-color: #cccccc; /* Gray */
  cursor: not-allowed;
}

.voting-now-button:not(.active):not(.disabled) {
  background-color: #0077cc; /* Blue */
}
</style>
