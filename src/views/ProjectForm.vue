<script setup>
    import { reactive, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useProjectStorage } from '../composables/useProjectStorage'
    import { useValidation } from '../composables/useValidation'
    import { useNotify } from '../composables/useNotify'

    const route = useRoute()
    const router = useRouter()
    const { add, update, projects } = useProjectStorage()
    const { validateProject } = useValidation()
    const notify = useNotify()

    const form = reactive({
        id: null,
        name: '',
        description: '',
        startDate: '',
        budget: ''
    })

    // edit mód adatbetöltés – az id-t számmá konvertáljuk
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
            <div>
                <label class="label">Projekt neve *</label>
                <input v-model="form.name"
                       class="input w-full"
                       type="text"
                       placeholder="Pl. Webshop redesign" />
            </div>

            <div>
                <label class="label">Kezdési dátum</label>
                <input v-model="form.startDate"
                       class="input w-full"
                       type="date" />
            </div>
        </div>

        <div>
            <label class="label">Leírás</label>
            <textarea v-model="form.description"
                      class="input w-full"
                      placeholder="Rövid leírás..."></textarea>
        </div>

        <div>
            <label class="label">Költségvetés (pozitív szám) *</label>
            <input v-model.number="form.budget"
                   class="input w-full"
                   type="number"
                   placeholder="pl. 500000" />
        </div>

        <div>
            <button type="submit" class="btn btn-primary w-full md:w-auto">
                {{ form.id ? 'Mentés' : 'Hozzáadás' }}
            </button>
        </div>
    </form>
</template>

<style scoped>
    /* ha kell extra stílus */
</style>
