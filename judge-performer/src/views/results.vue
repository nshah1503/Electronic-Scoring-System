<template>
  <div class="results-page">
    <div class="results-card">
      <h2>Final Scores</h2>
      <table class="results-table">
        <thead>
          <tr>
            <th>Performer</th>
            <th>Judge</th>
            <th v-for="category in categories" :key="category">{{ category }}</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.performerId + '-' + result.judgeId">
            <td>{{ result.performerName }}</td>
            <td>{{ result.judgeName }}</td>
            <td v-for="score in result.scores" :key="score">{{ score }}</td>
            <td>{{ result.finalScore }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

interface Result {
  performerId: string;
  performerName: string;
  judgeId: string;
  judgeName: string;
  scores: number[];
  finalScore: number;
}

export default defineComponent({
  name: "Results",
  setup() {
    const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
    const results = ref<Result[]>([]);

    // Function to fetch results from the backend
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/scoreboard/final-scores');
        results.value = response.data;
      } catch (error) {
        console.error("Failed to load results:", error);
      }
    };

    // Polling interval for fetching updates
    let pollingInterval: NodeJS.Timeout;

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
</script>

<style scoped>
.results-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
}

.results-card {
  width: 100%;
  max-width: 800px;
  padding: 2em;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.results-table {
  width: 100%;
  border-collapse: collapse;
}

.results-table th, .results-table td {
  padding: 0.75em;
  border: 1px solid #ddd;
  text-align: center;
}

.results-table th {
  background-color: #0077cc;
  color: #ffffff;
}

.results-table tbody tr:nth-child(even) {
  background-color: #f8f9fb;
}

.results-table tbody tr:hover {
  background-color: #e0eafc;
}
</style>
 