<template>
  <div class="input-group">
    <label :for="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="text-input"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TextInput",
  props: {
    label: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    modelValue: String,
  },
  emits: ['update:modelValue']
});
</script>

<style scoped>
.input-group {
  margin-bottom: 1.5em;
  text-align: left;
}

.text-input {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #dddddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.text-input:focus {
  border-color: #0077cc;
}
</style>
