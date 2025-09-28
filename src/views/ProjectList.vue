<script setup>
    import { useProjectStorage } from '../composables/useProjectStorage'
    import { useProjectFilters } from '../composables/useFilters'
    import { useNotify } from '../composables/useNotify'
    import ProjectTable from '../components/ProjectTable.vue'

    const { projects, remove } = useProjectStorage()
    const { query, filtered } = useProjectFilters(projects)
    const notify = useNotify()

    function onDelete(id) {
        if (confirm('Biztosan törlöd a projektet?')) {
            remove(id)
            notify.success('Projekt törölve')
        }
    }
</script>

<template>
    <div class="max-w-5xl mx-auto p-4">
        <div class="card overflow-x-auto">
            <div class="flex flex-col gap-2 mb-4">
                <h2 class="text-lg font-bold">Projektek listája</h2>
                <input class="input w-full" v-model="query" placeholder="Keresés név vagy leírás alapján...">
            </div>
            <ProjectTable :projects="filtered" :onDelete="onDelete" />
        </div>
    </div>
</template>
