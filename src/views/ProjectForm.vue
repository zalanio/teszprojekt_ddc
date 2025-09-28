<script setup>
    import { reactive, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useProjectStorage } from '../composables/useProjectStorage'
    import { useValidation } from '../composables/useValidation'
    import { useNotify } from '../composables/useNotify'
    import AppTextInput from '../components/AppTextInput.vue'

    const route = useRoute()
    const router = useRouter()
    const { add, update, projects } = useProjectStorage()
    const { validateProject } = useValidation()
    const notify = useNotify()

    const form = reactive({ id: null, name: '', description: '', startDate: '', budget: '' })

    watch(() => route.params.id, (id) => {
        const pid = Number(id)
        if (pid) {
            const p = projects.value.find(p => p.id === pid)
            if (p) Object.assign(form, p)
        } else {
            Object.assign(form, { id: null, name: '', description: '', startDate: '', budget: '' })
        }
    }, { immediate: true })

    function onSubmit() {
        const error = validateProject(form)
        if (error) {
            notify.error(error)
            return
        }
        if (form.id) {
            update(form.id, form)
            notify.success('Projekt frissítve')
        } else {
            add(form)
            notify.success('Projekt mentve')
        }
        router.push('/projects')
    }
</script>

<template>
    <form @submit.prevent="onSubmit" class="max-w-3xl mx-auto space-y-4 p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AppTextInput v-model="form.name"
                          label="Projekt neve *"
                          placeholder="Pl. Webshop redesign" />
            <AppTextInput v-model="form.startDate"
                          type="date"
                          label="Kezdési dátum" />
        </div>

        <div>
            <label class="label">Leírás</label>
            <textarea v-model="form.description"
                      class="input w-full"
                      placeholder="Rövid leírás..."></textarea>
        </div>

        <AppTextInput v-model.number="form.budget"
                      type="number"
                      label="Költségvetés (pozitív szám) *"
                      placeholder="pl. 500000" />

        <button type="submit" class="btn btn-primary w-full md:w-auto">
            {{ form.id ? 'Mentés' : 'Hozzáadás' }}
        </button>
    </form>
</template>
