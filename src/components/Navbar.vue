<script setup>
const emit = defineEmits(['go-list','go-new'])
</script>

<template>
  <header class="bg-white border-b">
    <div class="max-w-4xl mx-auto p-4 flex items-center justify-between">
      <h1 class="text-xl font-bold">Projekt Nyilvántartó</h1>
      <nav class="flex gap-2">
        <button class="btn" @click="emit('go-list')">Projektek listája</button>
        <button class="btn btn-primary" @click="emit('go-new')">Új projekt hozzáadása</button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.bg-white{background:#fff}
.border-b{border-bottom:1px solid #eee}
.text-xl{font-size:1.25rem}
.font-bold{font-weight:700}
</style>
