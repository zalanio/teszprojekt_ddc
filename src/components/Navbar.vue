<script setup>
    import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="bg-white border-b">
        <div class="max-w-4xl mx-auto p-4 flex items-center justify-between">
            <h1 class="text-xl font-bold">Projekt Nyilvántartó</h1>
            <nav class="flex gap-2">
                <RouterLink to="/projects" class="btn">Projektek listája</RouterLink>
                <RouterLink to="/projects/new" class="btn btn-primary">Új projekt hozzáadása</RouterLink>
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
