<script setup>
import { reactive, computed, watch, toRaw } from 'vue'
import { useProjectStorage } from '../composables/useProjectStorage'

const props = defineProps({
  initial: { type: Object, default: null } // ha nem null, szerkesztés
})
const emit = defineEmits(['cancel','saved','notify'])

const { add, update } = useProjectStorage()

const form = reactive({
  id: null,
  name: '',
  description: '',
  startDate: '',
  budget: '' // string inputból
})

// ha szerkesztünk, töltsük be
watch(() => props.initial, (val) => {
  if (val) {
    form.id = val.id
    form.name = val.name ?? ''
    form.description = val.description ?? ''
    form.startDate = val.startDate ?? ''
    form.budget = String(val.budget ?? '')
  } else {
    reset()
  }
}, { immediate: true })

function reset() {
  form.id = null
  form.name = ''
  form.description = ''
  form.startDate = ''
  form.budget = ''
}

const errors = computed(() => {
  const e = {}
  if (!form.name.trim()) e.name = 'A projekt neve kötelező.'
  const budgetNum = Number(form.budget)
  if (form.budget === '' || Number.isNaN(budgetNum) || budgetNum <= 0) {
    e.budget = 'A költségvetés pozitív szám legyen.'
  }
  return e
})

const isEdit = computed(() => form.id !== null)
const valid = computed(() => Object.keys(errors.value).length === 0)

function onSubmit() {
  if (!valid.value) {
    emit('notify', 'Kérlek javítsd a hibákat az űrlapon.', 'error')
    return
  }
  const payload = {
    name: form.name.trim(),
    description: form.description.trim(),
    startDate: form.startDate || '',
    budget: Number(form.budget)
  }
  if (isEdit.value) {
    update(form.id, payload)
    emit('saved', 'Projekt frissítve!')
  } else {
    add(payload)
    emit('saved', 'Projekt hozzáadva!')
    reset()
  }
}
</script>

<template>
    <div class="card">
        <h2 class="text-lg font-bold">{{ isEdit ? 'Projekt szerkesztése' : 'Új projekt hozzáadása' }}</h2>

        <div class="mt-4">
            <label class="label">Projekt neve *</label>
            <input class="input" v-model.trim="form.name" placeholder="Pl. Webshop redesign" />
            <p class="small" v-if="errors.name">{{ errors.name }}</p>
        </div>

        <div class="mt-2">
            <label class="label">Leírás</label>
            <textarea class="textarea" rows="4" v-model="form.description" placeholder="Rövid leírás..."></textarea>
        </div>

        <div class="mt-2">
            <label class="label">Kezdési dátum</label>
            <input class="date" type="date" v-model="form.startDate" />
        </div>

        <div class="mt-2">
            <label class="label">Költségvetés (pozitív szám) *</label>
            <input class="input" type="number" min="1" step="1" v-model="form.budget" placeholder="pl. 500000" />
            <p class="small" v-if="errors.budget">{{ errors.budget }}</p>
        </div>

        <div class="mt-4 flex gap-2">
            <button class="btn btn-primary" @click="onSubmit">{{ isEdit ? 'Mentés' : 'Hozzáadás' }}</button>
            <button class="btn" @click="$emit('cancel')">Mégse</button>
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
