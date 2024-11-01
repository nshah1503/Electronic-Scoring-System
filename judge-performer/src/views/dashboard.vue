<template>
  <div class="dashboard-page">
    <div class="dashboard-card">
      <h2>Select a Performer</h2>
      <ul class="performer-list">
        <li v-for="performer in performers" :key="performer.performerId" class="performer-item">
          <div class="performer-details">
            <div class="performer-info">
              <span>{{ performer.name }}</span>
              <span class="status" :class="performer.status">{{ performer.status }}</span>
            </div>

            <!-- Category scoring section -->
            <div class="scoring">
              <div class="category" v-for="(score, category) in performer.scores" :key="category">
                <label>{{ category }}</label>
                <select v-model="performer.scores[category]">
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>

              <!-- Timer and submit button -->
              <div v-if="performer.status === 'performed'">
                <div v-if="performer.timerActive" class="timer">{{ performer.timer }}</div>
                <button class="submit-button" :disabled="!performer.enableSubmit" @click="submitScores(performer)">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Performer {
  performerId: string;
  name: string;
  status: string;
  scores: Record<string, string>;
  timer: string;
  timerActive: boolean;
  enableSubmit: boolean;
}

export default defineComponent({
  name: "Dashboard",
  setup() {
    const performers = ref<Performer[]>([]);
    const timers = new Map<string, NodeJS.Timeout>(); // Map to hold timer intervals for each performer
    
    async function fetchPerformers() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/admin/performers');
    const performersData = response.data;

    for (const updatedPerformer of performersData) {
      const existingPerformer = performers.value.find(
        (p) => p.performerId === updatedPerformer.performerId
      );

      // Check if the current judge has already submitted scores for this performer
      const scoreResponse = await axios.get(`http://127.0.0.1:5000/judge/check-score-exists`, {
        params: {
          performerId: updatedPerformer.performerId,
          judgeId: "judge1"  // Replace with dynamic judge ID if necessary
        }
      });

      const hasScored = scoreResponse.data.exists;

      if (existingPerformer) {
        // Update status only, keep other properties
        existingPerformer.status = updatedPerformer.status;
        existingPerformer.enableSubmit = !hasScored && updatedPerformer.status === 'performed';

        if (updatedPerformer.status === 'performed' && !existingPerformer.timerActive && !hasScored) {
          activateTimer(existingPerformer);
        }
      } else {
        // Initialize new performer with timer and scores
        performers.value.push({
          ...updatedPerformer,
          status: updatedPerformer.status || "not performed",
          timer: "05:00",
          timerActive: false,
          enableSubmit: !hasScored && updatedPerformer.status === 'performed',
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
  } catch (error) {
    console.error("Failed to load performers:", error);
  }
}

    onMounted(() => {
      fetchPerformers();
      setInterval(fetchPerformers, 5000); // Poll every 5 seconds to update status in real-time
    });

    // Timer activation function
    function activateTimer(performer: Performer) {
      let minutes = 5;
      let seconds = 0;
      performer.timerActive = true;

      const countdown = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countdown);
            performer.timerActive = false;
            performer.enableSubmit = false;
          } else {
            minutes--;
            seconds = 59;
          }
        } else {
          seconds--;
        }

        performer.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }, 1000);

      timers.set(performer.performerId, countdown); // Store the timer interval
    }

    // Clear timer for the specific performer upon submission
    function clearTimer(performer: Performer) {
      const timer = timers.get(performer.performerId);
      if (timer) {
        clearInterval(timer);
        timers.delete(performer.performerId);
      }
      performer.timerActive = false;
      performer.enableSubmit = false;
      performer.timer = "00:00"; // Reset timer display after submission
    }

    // Submit scores function
    const submitScores = async (performer: Performer) => {
      try {
        await axios.post('http://127.0.0.1:5000/judge/submit-score', {
          performerId: performer.performerId,
          judgeId: "judge1",  // Assuming judge1 is scoring
          scores: performer.scores,
        });
        console.log(`Scores submitted for ${performer.name}`);

        // Stop the timer and disable the submit button
        clearTimer(performer);
      } catch (error) {
        console.error("Failed to submit scores:", error);
      }
    };

    return { performers, submitScores };
  },
});
</script> -->

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Performer {
  performerId: string;
  name: string;
  status: string;
  scores: Record<string, string>;
  timer: string;
  timerActive: boolean;
  enableSubmit: boolean;
}

export default defineComponent({
  name: "Dashboard",
  setup() {
    const route = useRoute();
    const judgeId = route.params.judgeId as string;  // Get the judgeId from the route
    const performers = ref<Performer[]>([]);
    const timers = new Map<string, NodeJS.Timeout>(); // Map to hold timer intervals for each performer

    // Fetch performers from the backend
    async function fetchPerformers() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/admin/performers');
        const performersData = response.data;

        for (const updatedPerformer of performersData) {
          const existingPerformer = performers.value.find(
            (p) => p.performerId === updatedPerformer.performerId
          );

          // Check if the current judge has already submitted scores for this performer
          const scoreResponse = await axios.get(`http://127.0.0.1:5000/judge/check-score-exists`, {
            params: {
              performerId: updatedPerformer.performerId,
              judgeId: judgeId  // Use dynamic judge ID here
            }
          });

          const hasScored = scoreResponse.data.exists;

          if (existingPerformer) {
            // Update status only, keep other properties
            existingPerformer.status = updatedPerformer.status;
            existingPerformer.enableSubmit = !hasScored && updatedPerformer.status === 'performed';

            if (updatedPerformer.status === 'performed' && !existingPerformer.timerActive && !hasScored) {
              activateTimer(existingPerformer);
            }
          } else {
            // Initialize new performer with timer and scores
            performers.value.push({
              ...updatedPerformer,
              status: updatedPerformer.status || "not performed",
              timer: "05:00",
              timerActive: false,
              enableSubmit: !hasScored && updatedPerformer.status === 'performed',
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
      } catch (error) {
        console.error("Failed to load performers:", error);
      }
    }

    onMounted(() => {
      fetchPerformers();
      setInterval(fetchPerformers, 5000); // Poll every 5 seconds to update status in real-time
    });

    // Timer activation function
    function activateTimer(performer: Performer) {
      let minutes = 5;
      let seconds = 0;
      performer.timerActive = true;

      const countdown = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countdown);
            performer.timerActive = false;
            performer.enableSubmit = false;
          } else {
            minutes--;
            seconds = 59;
          }
        } else {
          seconds--;
        }

        performer.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }, 1000);

      timers.set(performer.performerId, countdown); // Store the timer interval
    }

    // Clear timer for the specific performer upon submission
    function clearTimer(performer: Performer) {
      const timer = timers.get(performer.performerId);
      if (timer) {
        clearInterval(timer);
        timers.delete(performer.performerId);
      }
      performer.timerActive = false;
      performer.enableSubmit = false;
      performer.timer = "00:00"; // Reset timer display after submission
    }

    // Submit scores function
    const submitScores = async (performer: Performer) => {
      try {
        await axios.post('http://127.0.0.1:5000/judge/submit-score', {
          performerId: performer.performerId,
          judgeId: judgeId,  // Use dynamic judge ID here
          scores: performer.scores,
        });
        console.log(`Scores submitted for ${performer.name}`);

        // Stop the timer and disable the submit button
        clearTimer(performer);
      } catch (error) {
        console.error("Failed to submit scores:", error);
      }
    };

    return { performers, submitScores };
  },
});
</script>

<style scoped>
.dashboard-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
}

.dashboard-card {
  width: 100%;
  max-width: 700px;
  padding: 2em;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8em;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1.5em;
}

.performer-list {
  list-style: none;
  padding: 0;
}

.performer-item {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1em;
  margin: 0.5em 0;
  background-color: #f8f9fb;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
}

.performer-info {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
}

.status {
  font-size: 0.8em;
  margin-left: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
}

.status.performing {
  background-color: #28a745;
}

.status.performed {
  background-color: #007bff;
}

.status.not\ performed {
  background-color: #ff9800;
}

.scoring {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-button {
  margin-top: 10px;
  padding: 0.5em 1em;
  background-color: #0077cc;
  color: #ffffff;
  font-size: 0.9em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.timer {
  font-size: 0.9em;
  color: #ff5722;
  font-weight: bold;
  margin-right: 10px;
}
</style>
