<template>
  <div class="scoreform-page">
    <div class="scoreform-card">
      <h2>Rate Performer</h2>
      <p>Please rate each category from 1 to 5 stars</p>
      <form @submit.prevent="submitScore">
        <div v-for="category in categories" :key="category" class="category-group">
          <label :for="category" class="category-label">{{ category }}</label>
          <select v-model="scores[category]" class="category-select" required>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
          </select>
        </div>
        <button type="submit" class="submit-button">Submit Score</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "ScoreForm",
  setup() {
    const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
    const scores = ref<{ [key: string]: number }>({});

    const submitScore = () => {
      // Placeholder for score submission logic
      console.log("Submitted scores:", scores.value);
    };

    return { categories, scores, submitScore };
  }
});
</script>

<style scoped>
.scoreform-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
}

.scoreform-card {
  width: 100%;
  max-width: 500px;
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
  margin-bottom: 0.5em;
}

p {
  color: #666666;
  margin-bottom: 1.5em;
}

.category-group {
  margin-bottom: 1em;
  text-align: left;
}

.category-label {
  display: block;
  margin-bottom: 0.3em;
  color: #333333;
  font-weight: 500;
}

.category-select {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #dddddd;
  border-radius: 5px;
  background-color: #f8f9fb;
  outline: none;
  font-size: 1em;
  color: #333333;
  transition: border-color 0.3s;
}

.category-select:focus {
  border-color: #0077cc;
}

.submit-button {
  width: 100%;
  padding: 0.75em;
  background-color: #0077cc;
  color: #ffffff;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.submit-button:hover {
  background-color: #005fa3;
  transform: scale(1.05);
}
</style>
