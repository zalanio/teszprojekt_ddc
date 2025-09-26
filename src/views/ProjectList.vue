<script setup>
import { computed, ref } from 'vue'
import { useProjectStorage } from '../composables/useProjectStorage'

const emit = defineEmits(['edit','notify'])
const { projects, remove } = useProjectStorage()

const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return projects.value
  return projects.value.filter(p =>
    (p.name || '').toLowerCase().includes(q) ||
    (p.description || '').toLowerCase().includes(q)
  )
})

function onDelete(id) {
  if (confirm('Biztosan törlöd a projektet?')) {
    remove(id)
    emit('notify', 'Projekt törölve.', 'info')
  }
}
</script>

<template>
    <div class="card">
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold">Projektek listája</h2>
            <input class="input" v-model="query" placeholder="Keresés név vagy leírás alapján..." style="max-width: 280px;">
        </div>

        <div class="mt-4">
            <table class="table">
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
                    <tr v-if="filtered.length === 0">
                        <td colspan="5" class="small">Nincs megjeleníthető projekt.</td>
                    </tr>
                    <tr v-for="p in filtered" :key="p.id">
                        <td>{{ p.name }}</td>
                        <td class="small">{{ p.description }}</td>
                        <td>{{ p.startDate || '—' }}</td>
                        <td>{{ new Intl.NumberFormat('hu-HU').format(p.budget || 0) }} Ft</td>
                        <td>
                            <div class="flex gap-2">
                                <button class="btn" @click="$emit('edit', p)">Módosítás</button>
                                <button class="btn btn-danger" @click="onDelete(p.id)">Törlés</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .text-lg {
        font-size: 1.125rem
    }

    .font-bold {
        font-weight: 700
    }
</style>
