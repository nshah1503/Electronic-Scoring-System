<!-- <template>
  <div class="admin-page">
    <h1>Admin Page</h1>
    <p>Manage Performers and Judges</p>

    <div class="performers-section">
      <h2>Performers</h2>
      <ul>
        <li v-for="performer in performers" :key="performer.performerId">
          {{ performer.name }} - Status: {{ performer.status }}
          <button 
            @click="updateStatus(performer)" 
            :disabled="performer.status !== 'not performed' || anyPerforming"
          >
            Performing now
          </button>
        </li>
      </ul>
    </div>

    <div class="judges-section">
      <h2>Judges</h2>
      <ul>
        <li v-for="judge in judges" :key="judge.judgeId">
          {{ judge.name }} - Email: {{ judge.emailId }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

interface Performer {
  performerId: string;
  name: string;
  status: string;
}

interface Judge {
  judgeId: string;
  name: string;
  emailId: string;
}

const performers = ref<Performer[]>([]);
const judges = ref<Judge[]>([]);

// Function to fetch performers from the backend
async function fetchPerformers() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/performers');
    performers.value = response.data;
    console.log("Fetched performers:", performers.value);  // Debugging: check fetched data
  } catch (error) {
    console.error("Failed to load performers:", error);
  }
}

// Fetch judges from the backend
async function fetchJudges() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/judges');
    judges.value = response.data;
  } catch (error) {
    console.error("Failed to load judges:", error);
  }
}

// Load performers and judges when component mounts
onMounted(() => {
  fetchPerformers();
  fetchJudges();
  setInterval(fetchPerformers, 10000);  // Poll every 10 seconds
});

// Computed property to check if any performer is currently performing
const anyPerforming = computed(() => {
  return performers.value.some((performer) => performer.status === 'performing');
});

// Function to update the status of a performer and force reactivity update
async function updateStatus(performer: Performer) {
  if (performer.status === "not performed" && !anyPerforming.value) {
    // Set local status to 'performing' for immediate UI update
    performer.status = "performing";

    try {
      // Update in the database
      await axios.post('http://127.0.0.1:5000/admin/update-status', {
        performerId: performer.performerId,
        status: "performing",
      });

      // Force a reactive update of the performers array
      performers.value = [...performers.value];

      // Set timeout to change status to 'performed' after 20 seconds
      setTimeout(async () => {
        performer.status = "performed";
        await axios.post('http://127.0.0.1:5000/admin/update-status', {
          performerId: performer.performerId,
          status: "performed",
        });
        
        // Update the performers array reactively
        performers.value = [...performers.value];
        console.log("Updated performers after timeout:", performers.value);
      }, 20000);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }
}
</script>


<style scoped>
.admin-page {
  text-align: center;
}

.performers-section, .judges-section {
  margin-top: 20px;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> -->

<template>
  <div class="admin-page">
    <h1>Admin Page</h1>
    <p>Manage Performers and Judges</p>

    <!-- Performers Section -->
    <div class="performers-section">
      <h2>Performers</h2>
      <ul>
        <li v-for="performer in performers" :key="performer.performerId">
          {{ performer.name }} - Status: {{ performer.status }}
          <button 
            @click="updateStatus(performer)" 
            :disabled="performer.status !== 'not performed' || anyPerforming"
          >
            Performing now
          </button>
        </li>
      </ul>

      <!-- Add Performer Button -->
      <button @click="showAddPerformerForm = true">Add Performer</button>

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
        <button @click="addPerformer">Submit</button>
        <button @click="showAddPerformerForm = false">Cancel</button>
      </div>
    </div>

    <!-- Judges Section -->
    <div class="judges-section">
      <h2>Judges</h2>
      <ul>
        <li v-for="judge in judges" :key="judge.judgeId">
          {{ judge.name }} - Email: {{ judge.emailId }}
        </li>
      </ul>
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
}

const performers = ref<Performer[]>([]);
const judges = ref<Judge[]>([]);

// State for showing add performer form and holding new performer data
const showAddPerformerForm = ref(false);
const newPerformer = ref({ performerId: '', name: '', emailId: '', status: 'not performed' });

// Fetch performers from the backend
async function fetchPerformers() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/performers');
    performers.value = response.data;
  } catch (error) {
    console.error("Failed to load performers:", error);
  }
}

// Fetch judges from the backend
async function fetchJudges() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/judges');
    judges.value = response.data;
  } catch (error) {
    console.error("Failed to load judges:", error);
  }
}

// Load performers and judges when component mounts
onMounted(() => {
  fetchPerformers();
  fetchJudges();
  setInterval(fetchPerformers, 10000);  // Poll every 10 seconds
});

// Computed property to check if any performer is currently performing
const anyPerforming = computed(() => {
  return performers.value.some((performer) => performer.status === 'performing');
});

// Function to update the status of a performer
async function updateStatus(performer: Performer) {
  if (performer.status === "not performed" && !anyPerforming.value) {
    performer.status = "performing";

    try {
      await axios.post('http://127.0.0.1:5000/admin/update-status', {
        performerId: performer.performerId,
        status: "performing",
      });
      performers.value = [...performers.value];

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

// Function to add a new performer
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

    // Add the new performer to the list and reset form
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
}

.add-performer-form input,
.add-performer-form select {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.add-performer-form button {
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #0077cc;
  color: white;
  cursor: pointer;
}

.add-performer-form button:hover {
  background-color: #005fa3;
}
</style>
