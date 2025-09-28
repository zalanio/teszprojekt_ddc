<script setup>
    import { RouterLink } from 'vue-router'
    import { formatDate } from '../utils/formatDate'
    import { formatCurrency } from '../utils/formatCurrency'

    const props = defineProps({
        projects: { type: Array, required: true },
        onDelete: { type: Function, required: true }
    })
</script>

<template>
    <table class="table w-full min-w-[600px]">
        <thead>
            <tr>
                <th>Név</th>
                <th>Leírás</th>
                <th>Kezdési dátum</th>
                <th>Költségvetés</th>
                <th>Művelet</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="projects.length === 0">
                <td colspan="5" class="small">Nincs megjeleníthető projekt.</td>
            </tr>
            <tr v-for="p in projects" :key="p.id">
                <td>{{ p.name }}</td>
                <td class="small">{{ p.description }}</td>
                <td>{{ formatDate(p.startDate) }}</td>
                <td>{{ formatCurrency(p.budget) }}</td>
                <td class="flex flex-col gap-2">
                    <RouterLink class="btn w-full" :to="`/projects/${p.id}/edit`">Módosítás</RouterLink>
                    <button class="btn btn-danger w-full" @click="onDelete(p.id)">Törlés</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
