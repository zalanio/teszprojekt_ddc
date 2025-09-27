<script setup>
    import { reactive, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useProjectStorage } from '../composables/useProjectStorage'
    import { useToast } from 'vue-toastification'

    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    const { add, update, projects } = useProjectStorage()

    const form = reactive({
        id: null,
        name: '',
        description: '',
        startDate: '',
        budget: ''
    })

    // edit mód adatbetöltés
    watch(() => route.params.id, (id) => {
        if (id) {
            const p = projects.value.find(p => p.id == id)
            if (p) Object.assign(form, p)
        } else {
            Object.assign(form, { id: null, name: '', description: '', startDate: '', budget: '' })
        }
    }, { immediate: true })

    function onSubmit() {
        // validáció
        if (!form.name.trim()) {
            toast.error('A projekt neve kötelező')
            return
        }
        if (Number(form.budget) <= 0) {
            toast.error('A költségvetés pozitív szám legyen')
            return
        }

        // mentés
        if (form.id) {
            update(form.id, form)
            toast.success('Projekt frissítve')
        } else {
            add(form)
            toast.success('Projekt mentve')
        }

        router.push('/projects')
    }
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="mt-4">
            <label class="label">Projekt neve *</label>
            <input v-model="form.name"
                   class="input"
                   type="text"
                   placeholder="Pl. Webshop redesign">
        </div>

        <div class="mt-4">
            <label class="label">Leírás</label>
            <textarea v-model="form.description"
                      class="input"
                      placeholder="Rövid leírás..."></textarea>
        </div>

        <div class="mt-4">
            <label class="label">Kezdési dátum</label>
            <input v-model="form.startDate"
                   class="input"
                   type="date">
        </div>

        <div class="mt-4">
            <label class="label">Költségvetés (pozitív szám) *</label>
            <input v-model.number="form.budget"
                   class="input"
                   type="number"
                   placeholder="pl. 500000">
        </div>

        <button type="submit" class="btn btn-primary mt-4">
            {{ form.id ? 'Mentés' : 'Hozzáadás' }}
        </button>
    </form>
</template>
