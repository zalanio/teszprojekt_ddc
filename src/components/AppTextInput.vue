<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="space-y-1">
        <label v-if="label" class="label">{{ label }}</label>
        <input :type="type"
               class="input w-full"
               :placeholder="placeholder"
               :value="modelValue"
               @input="emit('update:modelValue', $event.target.value)" />
    </div>
</template>
