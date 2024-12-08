<template>
  <div class="dashboard-page">
    <div class="dashboard-card">
      <h2>Voting Dashboard</h2>

      <!-- Voting Now Section -->
      <div class="voting-now-section" v-if="currentVotingJudge">
        <p class="voting-now-text">{{ currentVotingJudge.name }} is voting now</p>
      </div>

      <!-- Current Performance Section -->
      <div class="current-performance-section">
        <h3>Currently Performing</h3>
        <ul class="performer-list">
          <li v-if="currentPerformer" :key="currentPerformer.performerId" class="performer-item">
            <div class="performer-details">
              <div class="performer-info">
                <span>{{ currentPerformer.name }}</span>
                <span class="status" :class="currentPerformer.status">{{ currentPerformer.status }}</span>
              </div>
              <div class="scoring">
                <div class="category" v-for="(score, category) in currentPerformer.scores" :key="category">
                  <label>{{ category }}</label>
                  <select v-model="currentPerformer.scores[category]" :disabled="judgeId !== currentVotingJudge?.judgeId">
                    <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>

                <!-- Timer and Submit Button -->
                <div v-if="currentPerformer.status === 'performed'">
                  <div v-if="currentPerformer.timerActive" class="timer">{{ currentPerformer.timer }}</div>
                  <button 
                    class="submit-button" 
                    :disabled="!currentPerformer.enableSubmit || judgeId !== currentVotingJudge?.judgeId" 
                    @click="submitScores(currentPerformer)">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Past Performances Section -->
      <div class="past-performance-section">
      <h3>Past Performances</h3>
      <ul class="performer-list">
        <li v-for="performer in pastPerformers" :key="performer.performerId" class="performer-item">
          <div class="performer-details">
            <div class="performer-info">
              <span>{{ performer.name }}</span>
              <span 
                class="status" 
                :class="{
                  'performing': performer.status === 'performing',
                  'performed': performer.status === 'performed',
                  'performed-scored': performer.status === 'performed & scored'
                }">
                {{ performer.status }}
              </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
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
  hasBeenScored: boolean;
}

interface Judge {
  judgeId: string;
  name: string;
  isVotingNow: boolean;
}

export default defineComponent({
  name: "Dashboard",
  setup() {
    const route = useRoute();
    const judgeId = route.params.judgeId as string;  // Get the judgeId from the route
    const performers = ref<Performer[]>([]);
    const currentVotingJudge = ref<Judge | null>(null);
    const timers = new Map<string, NodeJS.Timeout>();

    async function fetchPerformers() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/admin/performers');
        const performersData = response.data;

        for (const updatedPerformer of performersData) {
          const existingPerformer = performers.value.find(
            (p) => p.performerId === updatedPerformer.performerId
          );

          // Check if the current judge has already submitted scores for this performer
          const scoreResponse = await axios.get('http://127.0.0.1:5000/judge/check-score-exists', {
            params: {
              performerId: updatedPerformer.performerId,
              judgeId: judgeId  // Use dynamic judge ID here
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
          } else {
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
      } catch (error) {
        console.error("Failed to load performers:", error);
      }
    }

    async function fetchCurrentVotingJudge() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/admin/current-voting-judge');
        currentVotingJudge.value = response.data;
      } catch (error) {
        console.error("Failed to load current voting judge:", error);
      }
    }

    onMounted(() => {
      fetchPerformers();
      fetchCurrentVotingJudge();
      setInterval(fetchPerformers, 5000); // Poll every 5 seconds to update status in real-time
      setInterval(fetchCurrentVotingJudge, 5000); 
    });

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

      timers.set(performer.performerId, countdown);
    }

    function clearTimer(performer: Performer) {
      const timer = timers.get(performer.performerId);
      if (timer) {
        clearInterval(timer);
        timers.delete(performer.performerId);
      }
      performer.timerActive = false;
      performer.enableSubmit = false;
      performer.timer = "00:00";
    }

    const submitScores = async (performer: Performer) => {
      try {
        await axios.post('http://127.0.0.1:5000/judge/submit-score', {
          performerId: performer.performerId,
          judgeId: judgeId,  // Use dynamic judge ID here
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
      } catch (error) {
        console.error("Failed to submit scores:", error);
      }
    };

    const currentPerformer = computed(() => 
      performers.value.find(performer => performer.status === 'performed' && !performer.hasBeenScored)
    );
    const pastPerformers = computed(() => 
      performers.value.filter(
      performer => 
        (performer.status === 'performed' || performer.status === 'performed & scored') &&
        performer.hasBeenScored
  )
);

    watch(currentPerformer, (newPerformer) => {
      if (newPerformer && newPerformer.status === 'performed' && !newPerformer.timerActive) {
        activateTimer(newPerformer);
      }
    });

    return { performers, currentPerformer, pastPerformers, submitScores, currentVotingJudge };
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
  padding: 20px;
}

.dashboard-card {
  width: 100%;
  max-width: 800px;
  padding: 2em;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.voting-now-section {
  margin-bottom: 20px;
  font-size: 1.2em;
  color: #ff5722;
  font-weight: bold;
}

h2, h3 {
  font-size: 1.8em;
  font-weight: bold;
  color: #333333;
  margin-bottom: 1.5em;
}

.performer-list {
  list-style: none;
  padding: 0;
  margin: 0;
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

.scoring select:disabled {
  background-color: #f0f0f0;
  color: #a0a0a0;
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

.current-performance-section,
.past-performance-section {
  margin-top: 20px;
}

.current-performance-section h3,
.past-performance-section h3 {
  margin-top: 1em;
  font-size: 1.5em;
  color: #333333;
}


.performer-info .status {
  font-size: 0.8em;
  padding: 4px 10px;
  color: white;
  background-color: #0077cc; /* same color as the "Performing Now" button */
  border-radius: 5px;
  margin-left: 10px; /* spacing between name and status */
  display: inline-block;
  font-weight: bold;
}

.status.performing {
  background-color: #28a745;
  color: white;
}

.status.performed {
  background-color: #007bff;
  color: white;
}

.status.performed-scored {
  background-color: #007bff; /* Adjust this color as needed */
  color: white;
}
</style>
